// Configuração do Firebase para o PosiChat — MODELO LIMPO
// O ficheiro original com as tuas credenciais NÃO foi copiado para esta versão limpa.
// Para voltar à versão com backend real, copia o teu src/firebase.js original para aqui,
// por cima deste ficheiro. Não partilhes esse ficheiro original publicamente.
import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp,
    doc,
    updateDoc,
    arrayUnion
} from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "COLOCA_AQUI_A_TUA_API_KEY",
    authDomain: "COLOCA_AQUI_O_TEU_AUTH_DOMAIN",
    projectId: "COLOCA_AQUI_O_TEU_PROJECT_ID",
    storageBucket: "COLOCA_AQUI_O_TEU_STORAGE_BUCKET",
    messagingSenderId: "COLOCA_AQUI_O_TEU_MESSAGING_SENDER_ID",
    appId: "COLOCA_AQUI_O_TEU_APP_ID"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export {
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    onAuthStateChanged,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp,
    doc,
    updateDoc,
    arrayUnion
};
