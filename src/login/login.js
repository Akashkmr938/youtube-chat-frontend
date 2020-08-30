import React, { useEffect, useState } from "react";

const Login = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    props.handleLoggedIn(loggedIn);
  }, [loggedIn]);

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
          <button onClick={onSignOutClick}>Google Logout</button>
        ) : (
          <button onClick={onSignInClick}>Google Login</button>
        )}
      </>
    );
  };

  return <div>{renderAuthButton()}</div>;
};

export default Login;
