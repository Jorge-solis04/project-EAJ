import { db } from "./firebase-config.js"

import {collection, addDoc, getDocs, updateDoc, deleteDoc, doc} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"

const products = collection(db, "Productos")

//Sirve para agregar productos a la base de datos
export const addProduct = async(name, category, price, quantity, expiryDate, imgUrl) =>{
    console.log(name, category,price,quantity,expiryDate,imgUrl)
    await addDoc(products, {
        name, category, price, quantity, expiryDate, imgUrl
    })
    
}

//Sirve para obtener todos los productos de la base de datos en JSON
export const getProducts = async () =>{
    const allProducts = await getDocs(products)

    let arrayProducts = []

    allProducts.forEach((doc) => {
        arrayProducts.push({ id: doc.id, ...doc.data() })
    })

    console.log("Base de datos:",arrayProducts)
    return arrayProducts
}

//Sirve para eliminar productos
export const deleteProducts = async(id) =>{
    const productsForDelete = doc(db, "Productos", id )
    await deleteDoc(productsForDelete)
}
//Sirve para actualizar productos
export const updateProduct = async (id, newData) => {
    console.log(newData)
    const product = doc (db, "Productos", id)
    await updateDoc(product, newData)
} 