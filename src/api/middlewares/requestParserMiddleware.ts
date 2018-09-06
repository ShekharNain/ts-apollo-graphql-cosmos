import { Application } from "express"; 
import * as bodyParser from "body-parser";

export const setupAppMiddleware = (app: Application) => {
    // it will format the query params, so that it will be accessible inside req.params
    // extended will apply extras rules from qs library
    app.use(bodyParser.urlencoded({ extended: true }));
 
    // parse application/json & put inside req.body
    app.use(bodyParser.json());
}   