import React, { useState, useRef } from "react";
import Login from "./login/login";
import Input from "./input/input";
import LiveChat from "./live-chat/live-chat";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import MySnackbar from "./snackbar/snackbar";

const useStyles = makeStyles(() => ({
  app: {
    textAlign: "center",
    margin: "200px",
  },
  chatApp: {
    textAlign: "center",
  },
}));

const expression = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/;
const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);

const App = () => {
  const snackbar = useRef();
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const handleLoggedIn = (loggedIn) => {
    setLoggedIn(loggedIn);
  };

  const unsubscribeChat = () => {
    socket.emit("closeConnection");
    setChatMessages([]);
  };

  const subscribeToYoutubeStream = (streamUrl, fields) => {
    var regex = new RegExp(expression);
    if (streamUrl === "" || !regex.test(streamUrl)) {
      snackbar.current.handleClick("Invalid URL");
    } else {
      const keywords = fields.reduce((resultant, field) => {
        if (field.value) {
          resultant.push(field.value);
        }
        return resultant;
      }, []);

      socket.emit("streamDetails", {
        url: streamUrl.split("v=")[1].substring(0, streamUrl.length - 1),
        keywords: Array.from(new Set(keywords)),
        loginDetails: window.gapi.auth2
          .getAuthInstance()
          .currentUser.get()
          .getAuthResponse(),
      });
      socket.on("chatMessages", (data) => {
        console.log("event caught");
        setChatMessages((prev) => [...prev, ...data]);
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
  return (
    <>
      {renderApp()}
      <MySnackbar ref={snackbar} />
    </>
  );
};

export default App;
