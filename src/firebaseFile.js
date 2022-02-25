import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyCmqwHxTVcyXMkXqfXnyB8v8k-NkX7DNzc",
    authDomain: "slack-clone-368fe.firebaseapp.com",
    projectId: "slack-clone-368fe",
    storageBucket: "slack-clone-368fe.appspot.com",
    messagingSenderId: "82107884545",
    appId: "1:82107884545:web:1980f2e0a5eb3db20a0c00"
  };
  const app=initializeApp(firebaseConfig);

  const db=getFirestore(app)

  // const auth=firebase.auth();
  
  // const provider=new firebase.auth.GoogleAuthProvider();
  
  export {app ,  db} ;
  
