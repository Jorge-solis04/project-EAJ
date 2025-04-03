import { db } from "./firebase-config.js"

import {collection, addDoc, getDocs, updateDoc, deleteDoc, doc} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"

const products = collection(db, "Productos")

export const addProduct = async(name, category, price, quantity, expiryDate, imgUrl) =>{
    console.log(name, category,price,quantity,expiryDate,imgUrl)
    await addDoc(products, {
        name, category, price, quantity, expiryDate, imgUrl
    })
    
}

export const getProducts = async () =>{
    const allProducts = await getDocs(products)

    let arrayProducts = []
    allProducts.forEach((doc) => {
        arrayProducts.push({ id: doc.id, ...doc.data() })
    })

    console.log(arrayProducts)
    return arrayProducts
}