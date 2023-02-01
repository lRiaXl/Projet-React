import auth from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';
import BaseFile from './BaseFile';

const App = () => {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();



  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      // User is signed in.
      setUser(user);
      // console.log("User signed in or not =>  ", user?.uid)
    } else {
      // No user is signed in.
      SignInAnonymously();
      console.log("User signed in or not =>  ", user)
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  if (initializing) return null;





  return (
    <BaseFile />
  )
}
const SignInAnonymously = () => {
  auth()
    .signInAnonymously()
    .then((data) => {
      console.log('User signed in anonymously==>  ', data);
    })
    .catch(error => {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }

      console.error(error);
    });
}
export default App