import { auth } from "./firebase-config.js"
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"

export const login = async (email,password) =>{
    return signInWithEmailAndPassword(auth, email, password)
}

export const register = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email,password)
}

export const logout = async() =>{
    return signOut(auth)
}