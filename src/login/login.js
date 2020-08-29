import React, { useState } from "react";

const Login = (props) => {
  const signOut = () => {
    let auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut();
  };

  return (
    <>
      {window.gapi.auth2 &&
      window.gapi.auth2.getAuthInstance().isSignedIn.get() ? (
        <a href="#" onClick={signOut}>
          Sign out
        </a>
      ) : (
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
      )}
    </>
  );
};

export default Login;
