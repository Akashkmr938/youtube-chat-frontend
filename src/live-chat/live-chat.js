import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ScrollToBottom from "react-scroll-to-bottom";

const useStyles = makeStyles((theme) => ({
  time: {
    color: "#999",
    float: "right",
  },
  imgLeft: {
    float: " left",
    maxWidth: "20px",
    marginRight: "20px",
    borderRadius: "50%",
  },
  container: {
    border: "5px solid #dedede",
    borderRadius: "20px",
    padding: "10px",
    borderColor: "#ccc",
    backgroundColor: "#ddd",
    display: "flow-root",
    margin: "5px 10px",
  },
  mainContainer: {
    borderRadius: "10px",
    margin: "0 auto",
    height: "600px",
    width: "40%",
    textAlign: "left",
    backgroundColor: "dimgrey",
  },
  btnUnsubscribe: {
    backgroundColor: "firebrick",
    margin: "20px",
  },
}));

const LiveChat = (props) => {
  const classes = useStyles();
  return (
    <div>
      <h1>Live Chat</h1>
      <ScrollToBottom className={classes.mainContainer}>
        {props.chatMessages.map((message) => {
          return (
            <div className={classes.container} key={message.etag}>
              <img
                src={message.authorDetails.profileImageUrl}
                alt="Avatar"
                className={classes.imgLeft}
              />
              <span>
                {message.authorDetails.displayName} :{" "}
                {message.snippet.displayMessage}
              </span>
              <span className={classes.time}>
                {new Date(message.snippet.publishedAt).toLocaleTimeString()}
              </span>
            </div>
          );
        })}
      </ScrollToBottom>
      <div>
        <Button
          className={classes.btnUnsubscribe}
          variant="contained"
          color="primary"
          onClick={props.unsubscribeChat}
        >
          Unsubscribe
        </Button>
      </div>
    </div>
  );
};

export default LiveChat;
