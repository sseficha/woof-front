import { useEffect, useState } from 'react';
import './App.css';
import FriendForm from './FriendForm';
import FriendList from './FriendList';
import SendForm from './SendForm';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig)

function App({ signOut, user }) {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    setFriends([
      { 'name': 'Josh', 'email': 'josh@josh.com', 'phone': '1234567890' },
      { 'name': 'Bob', 'email': 'bob@bob.com', 'phone': '1345567890' }
    ])
  }, [])

  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
      <FriendForm />
      <FriendList friends={friends} />
      <SendForm friends={friends} />
    </>
  );
}

export default withAuthenticator(App);
