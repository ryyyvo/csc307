import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    userServices.getUsers(name, job)
      .then((result => {res.status(200).send(result);}))
      .catch((error) => {res.status(500).send(error);})
})

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    if (id != undefined) {
      userServices.findUserById(id)
        .then((result) => 
          {res.status(200).send(result);})
        .catch((error) => {res.status(500).send(error);})
    }
})

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userServices.addUser(userToAdd)
      .then((newUser) => 
        {const user = {...userToAdd, _id: newUser._id};
        res.status(201).send(user);})
      .catch((error) => 
        {res.status(500).send(error);})
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    userServices.deleteUserById(id)
      .then((result) => 
        {res.status(204).send();})
      .catch((error) => {
        res.status(500).send(error);})
});