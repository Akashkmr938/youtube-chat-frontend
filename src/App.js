import React, { useState, useEffect } from "react";
import Login from "./login/login";
import Input from "./input/input";
import LiveChat from "./live-chat/live-chat";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  app: {
    textAlign: "center",
    margin: "200px",
  },
  chatApp: {
    textAlign: "center",
  },
}));

const expression =
  "^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$";
const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);

const App = () => {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.on("chatMessages", (data) => {
      console.log("event caught");
      setChatMessages((prev) => [...prev, ...data]);
    });
  }, [socket]);

  const handleLoggedIn = (loggedIn) => {
    setLoggedIn(loggedIn);
  };

  const unsubscribeChat = () => {
    socket.emit("disconnect");
    setChatMessages([]);
  };

  const subscribeToYoutubeStream = (streamUrl, fields) => {
    var regex = new RegExp(expression);
    if (streamUrl === "" || !streamUrl.match(regex)) {
      console.log("Invalid URL");
    } else {
      const socket = socketIOClient(ENDPOINT);
      const keywords = fields.reduce((resultant, field) => {
        if (field.value) {
          resultant.push(field.value);
        }
        return resultant;
      }, []);

      socket.emit("streamDetails", {
        url: streamUrl.split("v=")[1].substring(0, streamUrl.length - 1),
        keywords: keywords,
        loginDetails: window.gapi.auth2
          .getAuthInstance()
          .currentUser.get()
          .getAuthResponse(),
      });
    }
  };

  const renderApp = () => {
    if (chatMessages.length) {
      return (
        <div className={classes.chatApp}>
          <LiveChat
            unsubscribeChat={unsubscribeChat}
            chatMessages={chatMessages}
          />
        </div>
      );
    } else {
      return (
        <div className={classes.app}>
          <Login handleLoggedIn={handleLoggedIn} />
          {loggedIn && (
            <Input subscribeToYoutubeStream={subscribeToYoutubeStream} />
          )}
        </div>
      );
    }
  };
  return renderApp();
};

export default App;
