import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import notifyReducer from "./reducers/notifyReducer";

const firebaseConfig = {
  apiKey: "AIzaSyA3kWMQv4jlwPcKIzyTInupN7fcZ0M_QKM",
  authDomain: "react-client-manager.firebaseapp.com",
  databaseURL: "https://react-client-manager.firebaseio.com",
  projectId: "react-client-manager",
  storageBucket: "react-client-manager.appspot.com",
  messagingSenderId: "688019789691"
};

// React-Redux-Firebase Config
const rrfConfig = {
  userProfile: "users",
  userFirestoreForProfile: true
};

// Init Firebase Instance
firebase.initializeApp(firebaseConfig);

// Init Firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer
});

// Create store with reducers and initial state
const InitialState = {};
const store = createStoreWithFirebase(
  rootReducer,
  InitialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
