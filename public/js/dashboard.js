import {addProduct, getProducts} from "./products.js"

const openModal = document.querySelector(".openModalProduct")
const closeModal = document.querySelector(".closeBtn")
const modal = document.getElementById("modalNewProduct")
const addProductForm = document.getElementById("newProductForm")
// Funcion para abrir modal
openModal.addEventListener("click", ()=>{
    modal.showModal()
})

// Funcion para cerrar modal
closeModal.addEventListener("click", ()=>{
    modal.close()
})

addProductForm.addEventListener("submit", async(e)=>{
    
    e.preventDefault()
    console.log("hola")
    const img = document.getElementById("imageProduct").value
    const name = document.getElementById("nameProduct").value
    const category = document.getElementById("categoryProduct").value
    const price = document.getElementById("priceProduct").value
    const quantity = document.getElementById("quantityProduct").value
    const date = document.getElementById("dateProduct").value

    await addProduct(name, category, price, quantity, date, img )
    modal.close()
    addProductForm.reset()
})

getProducts()

