import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const LiveChat = (props) => {
  return (
    <div>
      <p>Live Chat</p>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
        />
      </Container>
      {props.chatMessages.map((message, index) => {
        return (
          <li key={index}>
            {message.authorDetails.displayName}:{" "}
            {message.snippet.displayMessage}
          </li>
        );
      })}
      <button onClick={props.unsubscribeChat}>Unsubscribe</button>
    </div>
  );
};

export default LiveChat;
