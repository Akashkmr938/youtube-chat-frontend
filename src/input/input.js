import React, { useState } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

const expression =
  "^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$";

const Input = () => {
  const [fields, setFields] = useState([{ value: null }]);
  const [streamUrl, setStreamUrl] = useState("");

  const handleChange = (index, event) => {
    const values = [...fields];
    values[index].value = event.target.value;
    setFields(values);
  };

  const handleAdd = () => {
    if (fields.length < 10) {
      const values = [...fields];
      values.push({ value: null });
      setFields(values);
    }
  };

  const handleRemove = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const subscribeToYoutubeStream = () => {
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

  return (
    <div>
      <input
        type="text"
        value={streamUrl}
        onChange={(event) => setStreamUrl(event.target.value)}
        placeholder="Enter Youtube stream URL"
      />
      <div>
        <button type="button" onClick={handleAdd}>
          Keywords
        </button>
        {fields.map((field, idx) => {
          return (
            <div key={`${field}-${idx}`}>
              <input
                type="text"
                placeholder="Enter text"
                value={field.value || ""}
                onChange={(e) => handleChange(idx, e)}
              />
              <button type="button" onClick={() => handleRemove(idx)}>
                X
              </button>
            </div>
          );
        })}
      </div>

      <button onClick={subscribeToYoutubeStream}>Subscribe</button>
    </div>
  );
};

export default Input;
