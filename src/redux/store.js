import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/** Custom Reducers */
import buscarUsuarioReducer from '../reducers/buscarUsuarioReducer';

// Configurar firestore.
const firebaseConfig = {
  apiKey: "AIzaSyBGIcYiAtojhEzVujDr94qJ6fqVyIfg8sE",
  authDomain: "biblioteca-react-redux.firebaseapp.com",
  databaseURL: "https://biblioteca-react-redux.firebaseio.com",
  projectId: "biblioteca-react-redux",
  storageBucket: "biblioteca-react-redux.appspot.com",
  messagingSenderId: "811467369544",
  appId: "1:811467369544:web:096eabac9a78c775"
};

// inicializar firebase
firebase.initializeApp(firebaseConfig);

// configuracion de react-redux-firebase 
const rrfConfig = {
    userProfile : 'users',
    useFirestoreForProfile: true
}
//Crear el enhacer reactReduxFirebase con compose de redux y firestore al crear el store (createStore)
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), //Instancia de firebase como primer argumento
  reduxFirestore(firebase) // <- Necesario si se usa firestore
)(createStore);

// Agregar firebase a reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- Necesario si se usa firestore
  usuario : buscarUsuarioReducer
});

// state inicial
const initialState = {};

// Create el store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;