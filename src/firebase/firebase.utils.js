import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDFsreQqO8EsvfSE-pz05tbq4FTdp-uoC8",
    authDomain: "king-db-aa96d.firebaseapp.com",
    databaseURL: "https://king-db-aa96d.firebaseio.com",
    projectId: "king-db-aa96d",
    storageBucket: "",
    messagingSenderId: "917275029025",
    appId: "1:917275029025:web:2f6382d393554c2e"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exits) {
       const { displayName, email }  = userAuth;
       const createdAt = new Date();

       try {
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
        })
       } catch (error) {
        console.log('error creating user', error.message );
       }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
