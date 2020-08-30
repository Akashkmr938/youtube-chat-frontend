import React, { useState, useEffect } from "react";
import Login from "./login/login";
import Input from "./input/input";
import LiveChat from "./live-chat/live-chat";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  App: {
    textAlign: "center",
    margin: "200px",
  },
}));

const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);

const App = () => {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.on("chatMessages", (data) => {
      setChatMessages((prev) => [...prev, ...data]);
    });
    return () => socket.disconnect();
  }, []);

  const handleLoggedIn = (loggedIn) => {
    setLoggedIn(loggedIn);
  };

  const unsubscribeChat = () => {
    socket.disconnect();
    socket.emit("disconnect");
    setChatMessages([]);
  };

  const renderApp = () => {
    if (chatMessages.length) {
      return (
        <LiveChat
          unsubscribeChat={unsubscribeChat}
          chatMessages={chatMessages}
        />
      );
    } else {
      return (
        <>
          <Login handleLoggedIn={handleLoggedIn} />
          {loggedIn && <Input />}
        </>
      );
    }
  };
  return <div className={classes.App}>{renderApp()}</div>;
};

export default App;
