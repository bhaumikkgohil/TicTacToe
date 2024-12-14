import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA6PyJGd6ZFh0ZGl6hw0uIGVZ4tocB1vic",
    authDomain: "tic-tac-toe-eed48.firebaseapp.com",
    projectId: "tic-tac-toe-eed48",
    storageBucket: "tic-tac-toe-eed48.firebasestorage.app",
    messagingSenderId: "132272811978",
    appId: "1:132272811978:web:90356c34c17ff49ea76933"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
