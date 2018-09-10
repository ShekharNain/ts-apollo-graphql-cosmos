import {app} from './server';
import { Container } from "typedi";
import dbConfig from "./dbConfig";

Container.set({ id: "COSMOSDB_CONFIG", factory: () => dbConfig.cosmosdb });

app.listen(3000, () => {
	console.log('Server listening on port 3000')
})

