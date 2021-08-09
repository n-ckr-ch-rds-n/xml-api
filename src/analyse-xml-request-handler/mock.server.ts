import express, {Express} from "express";
import fs from "fs";
import path from "path";
import {mockServerConfig} from "./mock.server.config";

const {port, invalidPostDataPath, validPostDataPath} = mockServerConfig;
export const app = express();

app.get(`/${validPostDataPath}`, async (req, res) => {
    res.set("Content-Type", "text/xml");
    const xml = fs.readFileSync(path.join(__dirname, validPostDataPath));
    res.send(xml);
})

app.get(`/${invalidPostDataPath}`, async (req, res) => {
    res.set("Content-Type", "text/xml");
    const xml = fs.readFileSync(path.join(__dirname, invalidPostDataPath));
    res.send(xml);
})

// export const mockServer: Express = app;
