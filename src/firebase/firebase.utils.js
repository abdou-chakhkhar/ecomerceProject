import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';



const config = {
  apiKey: "AIzaSyCMSnKEJREyHG6mPLOcgyz7WR-f3qzAkm8",
  authDomain: "ecommerceproject-68566.firebaseapp.com",
  projectId: "ecommerceproject-68566",
  storageBucket: "ecommerceproject-68566.appspot.com",
  messagingSenderId: "938543521745",
  appId: "1:938543521745:web:d209b761c835581e708af0",
  measurementId: "${config.measurementId}"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
