import firebase from "firebase";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAkLwiUpbF1k0IjECPhRAXCuwDJ1BIWJAo",
    authDomain: "tcc-react-9a14e.firebaseapp.com",
    projectId: "tcc-react-9a14e",
    storageBucket: "tcc-react-9a14e.appspot.com",
    messagingSenderId: "375636045661",
    appId: "1:375636045661:web:76917a094df7f2a31702b4",
    measurementId: "G-G8THE239Z8"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
//
// const database = firebase.firestore()

firebase.initializeApp(firebaseConfig);
export default firebase