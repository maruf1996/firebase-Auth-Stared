import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useContext, useEffect } from "react";
import { UserContext } from "../components/Layout/Main";

const useFirebase=()=>{
    const [user,setUser]=useContext(UserContext);

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const signInGoogle=()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const currentUser = result.user;
            setUser(currentUser)
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });


    }
        useEffect(()=>{onAuthStateChanged(auth, (user) => {
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/auth.user
                  const uid = user.uid;
                  setUser(user)
                  // ...
                } else {
                  // User is signed out
                  // ...
                }
              });}
        ,[])


    return {signInGoogle}
}

export default useFirebase;