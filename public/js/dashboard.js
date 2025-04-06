import {addProduct, deleteProducts, getProducts} from "./products.js"
import { auth } from "./firebase-config.js"
import {onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const openModal = document.querySelector(".openModalProduct")
const closeModal = document.querySelector(".closeBtn")
const modal = document.getElementById("modalNewProduct")
const addProductForm = document.getElementById("newProductForm")
const modalItemInfo = document.getElementById("modalItemInfo")

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
         <button class="btnDetails" item-name="${item.name}" item-id="${item.id}"  item-category="${item.category}" item-expiryDate="${item.expiryDate}" item-price="${item.price}" item-quantity="${item.quantity}" item-imgUrl="${item.imgUrl}" >More Details</button>
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

    document.querySelectorAll(".btnDetails").forEach((btn) =>{
        btn.addEventListener("click", (e) =>{
            const id = e.target.getAttribute('item-id')
            const name = e.target.getAttribute("item-name")
            const category = e.target.getAttribute("item-category")
            const expiryDate = e.target.getAttribute("item-expiryDate")
            const price = e.target.getAttribute("item-price")
            const quantity = e.target.getAttribute("item-quantity")
            const img = e.target.getAttribute("item-imgUrl")
            
            const modalItem = document.createElement("dialog")
            modalItem.classList.add("modalItem")
            modalItem.innerHTML= ""

            modalItem.innerHTML=
            `
                <div>
                <h2> Details </h2>

                <div>
                    <img src= "${img}">
                </div>

                <h3> Product name: ${name} </h3>
                <h4> Product id: ${id} </h4>
                <h4> Category: ${category} </h4>
                <h4> Expiry Date: ${expiryDate} </h4>
                <h4> Price: $${price} </h4>
                <h4> Quantity: ${quantity} </h4>
                </div>
                
                <button class="closeItem" id="closeItem"> Discard </button>
                <button class="closeItem" id="closeItem"> Edit </button>
            `
            modalItemInfo.appendChild(modalItem)

            modalItem.showModal()

            modalItem.querySelector(".closeItem").addEventListener("click", ()=>{
                modalItem.close()
                modalItem.remove();
            })
            
        })
    })
} 
