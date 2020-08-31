import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  urlText: {
    width: "100%",
    margin: "20px 0px 20px 0px",
  },
  removeButton: {
    margin: "10px 10px 0px 10px",
  },
  subscribeButton: {
    "&:hover": {
      backgroundColor: "brown",
    },
    backgroundColor: "brown",
    marginTop: "20px",
  },
}));

const Input = (props) => {
  const classes = useStyles();
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
    props.subscribeToYoutubeStream(streamUrl, fields);
  };

  return (
    <div className={classes.root}>
      <TextField
        className={classes.urlText}
        id="outlined-basic"
        label="Youtube stream URL"
        variant="outlined"
        type="text"
        value={streamUrl}
        onChange={(event) => setStreamUrl(event.target.value)}
      />
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAdd}
          endIcon={<AddIcon></AddIcon>}
        >
          Keywords
        </Button>
        <div>
          {fields.map((field, idx) => {
            return (
              <Fragment key={`${field}-${idx}`}>
                <TextField
                  id="standard-basic"
                  label={`keyword ${idx + 1}`}
                  value={field.value || ""}
                  onChange={(e) => handleChange(idx, e)}
                />
                <IconButton
                  className={classes.removeButton}
                  aria-label="remove keyword"
                  onClick={() => handleRemove(idx)}
                >
                  <DeleteIcon />
                </IconButton>
              </Fragment>
            );
          })}
        </div>
      </div>

      <Button
        className={classes.subscribeButton}
        variant="contained"
        color="primary"
        onClick={subscribeToYoutubeStream}
      >
        Subscribe
      </Button>
    </div>
  );
};

export default Input;
