import React, { forwardRef, useImperativeHandle } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const MySnackbar = forwardRef((props, ref) => {
  const [state, setState] = React.useState({
    open: false,
  });

  useImperativeHandle(ref, () => ({
    handleClick(msg) {
      setState({
        ...state,
        open: true,
        message: msg,
      });
    },
  }));

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <div>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        autoHideDuration={4000}
        TransitionComponent={SlideTransition}
        message={state.message}
      />
    </div>
  );
});

export default MySnackbar;
