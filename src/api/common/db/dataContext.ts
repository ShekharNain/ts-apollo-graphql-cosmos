import { Service, Inject } from "typedi";
// import * as Gremlin from "gremlin";
import { User } from "../models/user.model";

var Gremlin = require('gremlin');

@Service()
export class DataContext {
    private _gremlinClient;

    constructor(@Inject("COSMOSDB_CONFIG"){ endpoint, authKey, databaseID, collectionID }) {
        this._gremlinClient = Gremlin.createClient(
            443, 
            endpoint, 
            { 
                "session": false, 
                "ssl": true, 
                "user": `/dbs/${databaseID}/colls/${collectionID}`,
                "password": authKey
            }
        );
    }

    async addUser(user: User) {
        const gremlinClient = await this._gremlinClient;
        console.log('Running Add User1'); 
        gremlinClient.execute(`g.addV('User')
            .property('id', '${user.username}')
            .property('firstName', '${user.firstName}')
            .property('lastName', '${user.lastName}')
            .property('age', ${user.age})`, { }, (err, results) => {
            if (err) console.error(err);
            console.log("Result: %s\n", JSON.stringify(results));
        });
    }

    async getUserById(username: string): Promise<User> {
        const gremlinClient = await this._gremlinClient;
        console.log(`Running get user ${username}`);
        return new Promise<User>((resolve, reject) => {
            gremlinClient.execute(`g.V().has('id', id)`, { id: username }, (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log("Result: %s\n", JSON.stringify(results));
                    if(results.length >= 1)
                        resolve(this.getUserFromResult(results[0]));
                    else reject(new Error(`No user found with id: ` + username)) 
                }
            });
        })
    }

    async getAllUsers(): Promise<User[]> {
        const gremlinClient = await this._gremlinClient;
        console.log(`Running get all users`); 
        return new Promise<User[]>((resolve, reject) => {
            gremlinClient.execute(`g.V().has('label', label)`, { label: 'User' }, (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log("Result: %s\n", JSON.stringify(results));
                    
                    const array: User[] = [];

                    for (let i=0; i<results.length; i++) {
                        array.push(this.getUserFromResult(results[i]));
                    }
                    
                    resolve(array);
                }
            });
        })
    }

    private getUserFromResult(result): User {
        const props = this.getPropertiesObject(result.properties, false);
        props["username"] = result.id;
        return props as User;
    } 

    getPropertiesObject(propsResults : {}, projection : boolean) : object {
        const propObjects : object = {};
        let keys : string[] = Object.keys(propsResults);
        
        for(let j=0; j< keys.length;j++) {
          const key : string = keys[j];  
          const valueArray = propsResults[key];
          
          if(valueArray.length==1) {
            let keyValue;
            if (projection) {
              keyValue = valueArray[0];
            } else {
              keyValue = valueArray[0].value;
            }
            propObjects[key] = keyValue;
          } else if(valueArray.length >1) {
            let resultArray = [];
            let i:number;
            for (i=0;i<valueArray.length;i++) {
              if (!projection) {
                resultArray.push(valueArray[i].value);
              } else {
                resultArray.push(valueArray[i]);
              }
             
            }
            propObjects[key] = resultArray;
          }
        }
        return propObjects;
      }
}