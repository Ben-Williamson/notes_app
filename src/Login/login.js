import { GoogleLogin } from "react-google-login";
import env from "react-dotenv";
import React, {useContext} from 'react';
import {Context} from '../store';
import "./login.css";

// const refreshTokenSetup = (res) => {
//   let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

//   const refreshToken = async () => {
//     const newAuthRes = await res.reloadAuthResponse();
//     refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
//     console.log("newAuthRes:", newAuthRes);

//     console.log("new auth token", newAuthRes.id_token);
//   }

//   setTimeout(refreshToken, refreshTiming);
// }

function Login() {
    const [state, dispatch] = useContext(Context);


  const handleLogin = async googleData => {
    dispatch({type: 'SET_LOGIN', payload: true});

    var res = await fetch("https://fauna-notes-api.herokuapp.com/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    var data = await res.json()
    console.log(data);
    console.log(data.user.data.name.first);

    dispatch({type: 'SET_KEY', payload: data.key});

    res = await fetch("https://fauna-notes-api.herokuapp.com/note/user/" + data.key, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    data = await res.json()

    console.log(data);

  }

  return (
    <div>
      <GoogleLogin
        clientId={`${env.CLIENT_ID}`}
        buttonText="Login"
        onSuccess={handleLogin}
        // onFailure={handleLogin}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}

        render={renderProps => (
            <button className="login" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</button>
          )}
      />
    </div>
  )
}


export default Login;