import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;
// const user = require()

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


// const users = {
//     users_list: [
//       {
//         id: "xyz789",
//         name: "Charlie",
//         job: "Janitor"
//       },
//       {
//         id: "abc123",
//         name: "Mac",
//         job: "Bouncer"
//       },
//       {
//         id: "ppp222",
//         name: "Mac",
//         job: "Professor"
//       },
//       {
//         id: "yat999",
//         name: "Dee",
//         job: "Aspring actress"
//       },
//       {
//         id: "zap555",
//         name: "Dennis",
//         job: "Bartender"
//       }
//     ]
//   };


// const findUserByName = (name) => {
//     return users["users_list"].filter(
//         (user) => user["name"] === name
//     );
// };

app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        userServices.getUsers(name)
          .then((result => 
            {res.status(200).send(result);}))
          .catch((error) => {res.status(500).send(error);})
    }
})

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    if (id != undefined) {
      userServices.findUserById(id)
        .then((result) => 
          {res.status(200).send(result);})
        .catch((error) => {res.status(500).send(error)})
    }
})

const generateRandomId = () => Math.floor(Math.random()*7817);

const addUser = (user) => {

  let randomId = generateRandomId().toString();
  user["id"] = randomId;
  users["users_list"].push(user);
  return user;
};


app.post("/users", (req, res) => {
    const userToAdd = req.body;
    let result = addUser(userToAdd);
    res.status(201).send(result);
});

const deleteUserById = (id) => {
    users["users_list"] = users["users_list"]
        .filter((user) => user["id"] !== id);
};

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    deleteUserById(id);
    res.status(204).send();
});


app.delete("/users", (req, res) => {
    const deleteUser = req.body;
    let nameArray = findUserByName(deleteUser["name"]);
    nameArray = nameArray.filter( (user) => user["job"] === deleteUser["job"]);
    for (let i = 0; i < nameArray.length; i++) 
    {
        deleteUserById(nameArray[i].id);
    }
    res.status(204).send();
})
