import { useEffect, useState } from "react";
import "./App.css";
import FriendForm from "./FriendForm";
import FriendList from "./FriendList";
import SendForm from "./SendForm";
import { Amplify, Auth } from "aws-amplify";
import awsExports from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(awsExports);

function App({ signOut, user }) {
    const [friendsList, setFriendsList] = useState([]);
    const [idToken, setIdToken] = useState();

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BASE_URL}/get_friends/?username=${user.username}`,
            {
                method: "GET",
                headers: {
                    Authorization: idToken,
                },
            }
        )
            .then((response) => {
                if (response.ok) return response.json();
                return response.text().then((text) => {
                    throw new Error(text);
                });
            })
            .then((data) => {
                setFriendsList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        Auth.currentSession()
            .then((data) => {
                console.log(data);
                setIdToken(data.idToken.jwtToken);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
            <FriendForm
                username={user.username}
                setFriendsList={setFriendsList}
                friendsList={friendsList}
            />
            <FriendList friendsList={friendsList} />
            <SendForm friendsList={friendsList} />
        </>
    );
}

export default withAuthenticator(App);

//dev vs prod for api urls ->make global
//prod api how to handle auth
