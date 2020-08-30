import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./login/login";
import Input from "./input/input";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("chatMessages", (data) => {
      console.log(data);
    });
  }, []);

  const handleLoggedIn = (loggedIn) => {
    setLoggedIn(loggedIn);
  };
  return (
    <div className="App">
      <Login handleLoggedIn={handleLoggedIn} />
      {loggedIn && <Input />}
    </div>
  );
};

export default App;
