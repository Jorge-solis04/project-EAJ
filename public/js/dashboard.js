import {
  addProduct,
  deleteProducts,
  getProducts,
  updateProduct,
  filterByCategory,
  productsBySearch
} from "./products.js";
import { auth } from "./firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const openModal = document.querySelector(".openModalProduct");
const closeModal = document.querySelector(".closeBtn");
const modal = document.getElementById("modalNewProduct");
const addProductForm = document.getElementById("newProductForm");
const modalItemInfo = document.getElementById("modalItemInfo");
const btnFiltro = document.getElementById("filterProduct");
const menuCategorias = document.getElementById("menuCategorias");
const inputSearch = document.getElementById("inputSearch");
const btnSearch = document.getElementById("btnSearch");

const categorias = [
  "Todos",
  "Lácteos",
  "Bebidas",
  "Juguetes",
  "Farmacia",
  "Electrónica",
  "Abarrotes",
  "Limpieza",
  "Frutas y verduras",
  "Salchichonería",
];

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    loadProducts();
    overallInventory()
  }
});

// Funcion para abrir modal
openModal.addEventListener("click", () => {
  modal.showModal();
});

// Funcion para cerrar modal
closeModal.addEventListener("click", () => {
  modal.close();
});

addProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("hola");
  const img = document.getElementById("imageProduct").value;
  const name = document.getElementById("nameProduct").value;
  const category = document.getElementById("categoryProduct").value;
  const price = document.getElementById("priceProduct").value;
  const quantity = document.getElementById("quantityProduct").value;
  const date = document.getElementById("dateProduct").value;

  await addProduct(name, category, price, quantity, date, img);
  modal.close();
  addProductForm.reset();
  loadProducts();
  overallInventory()
});

btnSearch.addEventListener("click", () => {
  const text = inputSearch.value.trim().toLowerCase();
  productsBySearch(text);
});




export const loadProducts = async () => {
  productsTableBody.innerHTML = "";
  const products = await getProducts();

  products.forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add("rowProducts");
    row.innerHTML = `
         <td> ${item.name} </td>
         <td> $${item.price} </td>
         <td> ${item.quantity} </td>
         <td> ${item.expiryDate} </td>
         <button class="btnDetails" item-name="${item.name}" item-id="${item.id}"  item-category="${item.category}" item-expiryDate="${item.expiryDate}" item-price="${item.price}" item-quantity="${item.quantity}" item-imgUrl="${item.imgUrl}" >More Details</button>
         <button class="btnDelete" item-id="${item.id}">Delete </button>
        `;
    productsTableBody.appendChild(row);
  });

  document.querySelectorAll(".btnDelete").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.getAttribute("item-id");
      if (confirm("wanna delete?")) {
        await deleteProducts(id);
        loadProducts();
        overallInventory()
      }
    });
  });

  document.querySelectorAll(".btnDetails").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("item-id");
      const name = e.target.getAttribute("item-name");
      const category = e.target.getAttribute("item-category");
      const expiryDate = e.target.getAttribute("item-expiryDate");
      const price = e.target.getAttribute("item-price");
      const quantity = e.target.getAttribute("item-quantity");
      const img = e.target.getAttribute("item-imgUrl");

      const modalItem = document.createElement("dialog");
      modalItem.classList.add("modalItem");
      modalItem.innerHTML = "";

      modalItem.innerHTML = `
                
                <h2> Details </h2>

                <div class="editImage">
                    <img src= "${img}">
                </div>

                <div class="details" id="details">
                <h3> Product name: ${name} </h3>
                <h4> Product id: ${id} </h4>
                <h4> Category: ${category} </h4>
                <h4> Expiry Date: ${expiryDate} </h4>
                <h4> Price: $${price} </h4>
                <h4> Quantity: ${quantity} </h4>

                <div class="detailsButtons">
                  <button class="closeItem" id="closeItem"> Discard </button>
                  <button class="editItem" id="editItem"> Edit </button>
                </div>
                
                </div>

                <form id="formEditar" style="display: none;">
                <label>
                    Name:
                    <input type="text" id="inputNombre" value="${name}">
                </label>
                <label>
                    Category:
                    <input type="text" id="inputCategory" value="${category}">
                </label>
                <label>
                    Price:
                    <input type="text" id="inputPrice" value="${price}">

                </label>
                <label>
                    Image:
                    <input type="text" id="inputImg" value="${img}">
                </label>
                    ID:
                    <input type="text" id="idItemForChange" value=${id}> 
                

                <button class="edit-btn" type="submit">Save changes</button>

               
                <button id="closeEdit" class="closeEdit">Discard</button>

            </form>


            `;
      modalItemInfo.appendChild(modalItem);

      modalItem.showModal();

      const details = document.getElementById("details");
      const forms = document.getElementById("formEditar");

      modalItem.querySelector(".editItem").addEventListener("click", () => {
        details.style.display = "none";
        forms.style.display = "block";
      });

      modalItem.querySelector(".closeEdit").addEventListener("click", () => {
        modalItem.close();
        modalItem.remove();
      });

      formEditar.addEventListener("submit", async (e) => {
        e.preventDefault();

        const newId = document.getElementById("idItemForChange").value;
        const name = document.getElementById("inputNombre").value;
        const category = document.getElementById("inputCategory").value;
        const price = document.getElementById("inputPrice").value;
        const imgUrl = document.getElementById("inputImg").value;
        console.log(newId);

        await updateProduct(newId, { name, category, price, imgUrl });
        loadProducts();
        overallInventory()
        modalItem.close();
        modalItem.remove();
      });

      modalItem.querySelector(".closeItem").addEventListener("click", () => {
        modalItem.close();
        modalItem.remove();
      });
    });
  });
};

export const loadProductByFilter = (productos) => {
  productsTableBody.innerHTML = ""; 

  if (productos.length === 0) {
    productsTableBody.innerHTML = "<p>No hay productos en esta categoría.</p>";
    return;
  }

  productos.forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add("rowProducts");
    row.innerHTML = `
         <td> ${item.name} </td>
         <td> $${item.price} </td>
         <td> ${item.quantity} </td>
         <td> ${item.expiryDate} </td>
         <button class="btnDetails" item-name="${item.name}" item-id="${item.id}"  item-category="${item.category}" item-expiryDate="${item.expiryDate}" item-price="${item.price}" item-quantity="${item.quantity}" item-imgUrl="${item.imgUrl}" >More Details</button>
         <button class="btnDelete" item-id="${item.id}">Delete </button>
        `;
    productsTableBody.appendChild(row);
  });
};



const mostrarMenuCategorias = async () => {
  menuCategorias.innerHTML = "";

  categorias.forEach((cat) => {
    const btnCat = document.createElement("button");
    btnCat.textContent = cat;

    btnCat.addEventListener("click", () => {
      if (cat === "Todos") {
        loadProducts(); // Muestra todos
      } else {
        filterByCategory(cat);

      }

      menuCategorias.classList.add("oculto"); // Cierra el menú
    });

    menuCategorias.appendChild(btnCat);
  });

  menuCategorias.classList.toggle("oculto");
};

btnFiltro.addEventListener("click", mostrarMenuCategorias);





// Cerrar el menú si haces clic fuera de él
document.addEventListener("click", (e) => {
  if (!menuCategorias.contains(e.target) && e.target !== btnFiltro) {
    menuCategorias.classList.add("oculto");
  }
});

const overallInventory = async () =>{
  const categories = document.getElementById("categoriesProducts")
  const totalProducts = document.getElementById("totalProductsNumber")
  const total = document.getElementById("totalValue")

  const allProducts = await getProducts()
  let totalValue = 0 
  

  allProducts.forEach((e) => {
      totalValue += Number(e.price)
  })

  let totalProductsNumber = allProducts.length
  console.log("......",totalProductsNumber)

  totalProducts.innerText = `${totalProductsNumber}`
  total.innerText = `$${totalValue}`

  console.log(totalValue)
}

