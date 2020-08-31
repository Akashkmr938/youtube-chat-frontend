import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import logo from "../assets/img/google-icon.png";

const useStyles = makeStyles((theme) => ({
  img: {
    paddingRight: "10px",
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    props.handleLoggedIn(loggedIn);
  }, [props, loggedIn]);

  useEffect(() => {
    if (window.gapi) {
      window.gapi.load("client:auth2", () => {
        window.gapi.client
          .init({
            clientId:
              "245046245085-aqtiof6fnq42g2u1uooag9q9j028h9i4.apps.googleusercontent.com",
            scope: "email",
          })
          .then(() => {
            setLoggedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
            OAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(OAuthChange);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      const OAuthChange = () => {
        setLoggedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
      };
    }
  }, []);

  const onSignOutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const onSignInClick = () => {
    if (window.gapi) {
      window.gapi.auth2.getAuthInstance().signIn({ prompt: "select_account" });
    }
  };

  const renderAuthButton = () => {
    return (
      <>
        {loggedIn ? (
          <Button variant="contained" color="primary" onClick={onSignOutClick}>
            <img className={classes.img} src={logo} alt="google" />
            Google Logout
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={onSignInClick}>
            <img className={classes.img} src={logo} alt="google" />
            Google Login
          </Button>
        )}
      </>
    );
  };

  return <div>{renderAuthButton()}</div>;
};

export default Login;
