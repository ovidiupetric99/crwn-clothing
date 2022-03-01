import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: 'AIzaSyAxHCBA_VAY2I8eIA2E2m3pctZvxQIiQBs',
  authDomain: 'crwn-db-b829f.firebaseapp.com',
  projectId: 'crwn-db-b829f',
  storageBucket: 'crwn-db-b829f.appspot.com',
  messagingSenderId: '777605271014',
  appId: '1:777605271014:web:f4866c12c4dd4c95081a27',
  measurementId: 'G-X404F5V623',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc (`users/${userAuth.uid}`);

  const snapShot = await userRef.get ();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date ();

    try {
      await userRef.set ({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log ('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp (config);

export const auth = firebase.auth ();
export const firestore = firebase.firestore ();

const provider = new firebase.auth.GoogleAuthProvider ();
provider.setCustomParameters ({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup (provider);

export default firebase;
