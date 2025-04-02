const openModal = document.querySelector(".openModalProduct")
const closeModal = document.querySelector(".closeBtn")
const modal = document.getElementById("modalNewProduct")

openModal.addEventListener("click", ()=>{
    modal.showModal()
})

closeModal.addEventListener("click", ()=>{
    modal.close()
})