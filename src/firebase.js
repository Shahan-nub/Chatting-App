import firebase from "firebase/app";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGvvplOq1kyRbcWq8ldeRPlCe_xYIoYOc",
  authDomain: "dc-clone-ed737.firebaseapp.com",
  projectId: "dc-clone-ed737",
  storageBucket: "dc-clone-ed737.appspot.com",
  messagingSenderId: "408141116508",
  appId: "1:408141116508:web:173bbc47d54aef4db9e299",
  measurementId: "G-NBLQ941QX2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const collectionRef = collection(db, "channels");

// getDocs(collectionRef)
//   .then((snapshot) => {
//     let books=[];
//     snapshot.docs.forEach((doc) => {
//       books.push({...doc.data(),id: doc.id})
//     })
//     console.log(books)
//   })
//   .catch((err) => console.log("couldn't get db",err.message))

export { auth, provider, collectionRef, storage };
export default db;
