import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Request, Response } from "express";
import * as dotenv from "dotenv";

import { Routes } from "./src/routes";
import { intialize_db } from "./db_initialize";

dotenv.config();
createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        route.middleware,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // start express server
    app.listen(process.env.PORT || 3001);

    // intialize_db(connection);

    console.log("Express server has started on port 3001.");
  })
  .catch((error) => console.log(error));
