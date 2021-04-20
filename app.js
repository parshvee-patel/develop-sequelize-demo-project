import express from "express";
import bodyparser from "body-parser"

//Local Import Files
import * as config from "./config";
import { routerV1 } from "./routes";

const app = express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use("/api/v1", routerV1);

// simple route
app.get("/", function(req, res) {
    res.send("Hello World!");
});

// set port, listen for requests
app.listen(config.PORT, () => {
    console.log("Staff app listening on" + " " + config.PORT);
});