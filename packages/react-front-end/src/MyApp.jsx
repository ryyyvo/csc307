// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";



function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    })
    setCharacters(updated);
  }

  // uses postUser to send data to backend, and updates frontend list if POST is a success
  function updateList(person) 
  {
    postUser(person)
                  .then(() => setCharacters([...characters, person]))
                  .catch((error) => { console.log(error); }
              )
  }

  function fetchUsers() { 
    const promise = fetch("http://localhost:8000/users");
    return promise;
}

// fetches the initial users list from the backend
  useEffect(() => {
    fetchUsers()
              .then((res) => res.json())
              .then((json) => setCharacters(json["users_list"]))
              .catch((error) => { console.log(error); });
  }, [] );

  // POSTS the entry to the backend 
  function postUser(person) 
  {
    const promise = fetch("http://localhost:8000/users", 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
      }
    );

      return promise;
  }

  return (
    <div className="container">
      <Table 
      characterData={characters} 
      removeCharacter={removeOneCharacter}/>
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;