import React, { useState } from "react";

var expression =
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
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  };

  const handleRemove = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const subscribeToYoutubeStream = () => {
    console.log("Called");
    var regex = new RegExp(expression);
    if (streamUrl === "" || !streamUrl.match(regex)) {
      console.log("Invalid URL");
    } else {
      console.log("URL: ", streamUrl);
      fields.forEach((field) => {
        console.log(field.value);
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
