import {addProduct, deleteProducts, getProducts} from "./products.js"
import { auth } from "./firebase-config.js"
import {onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const openModal = document.querySelector(".openModalProduct")
const closeModal = document.querySelector(".closeBtn")
const modal = document.getElementById("modalNewProduct")
const addProductForm = document.getElementById("newProductForm")

onAuthStateChanged(auth, (user)=>{
    if (!user){
        window.location.href = "index.html"
    } else{
        loadProducts()
    }
}) 

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
    loadProducts()
})

const loadProducts = async() =>{
    productsTableBody.innerHTML = ""
    const products =  await getProducts()

    products.forEach((item) =>{
        const row = document.createElement("tr")
        row.classList.add("rowProducts")
        row.innerHTML= 
        `
         <td> ${item.name} </td>
         <td> ${item.price} </td>
         <td> ${item.quantity} </td>
         <td> ${item.expiryDate} </td>
         <button class="btnDetails" item-id="${item.id}">More Details</button>
         <button class="btnDelete" item-id="${item.id}">Delete </button>
        `
        productsTableBody.appendChild(row)
    })

    document.querySelectorAll(".btnDelete").forEach((btn) =>{
        btn.addEventListener('click', async(e) =>{
            const id = e.target.getAttribute('item-id')
            if(confirm('wanna delete?')){
                await deleteProducts(id)
                loadProducts()
            }
        })
    })
} 



