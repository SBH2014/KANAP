
// display products in cart page 

let products = [];
let cartItems = localStorage.getItem("product")
if (cartItems) {
  products = JSON.parse(cartItems);
}

let cart__items = document.getElementById("cart__items")
let totalQuantity = 0;
let totalPrice = 0;
for (let item of products) {
  totalQuantity += item.quantity
  totalPrice += parseInt(item.price)
  cart__items.innerHTML += `<article class="cart__item" data-id="${item.productId}" data-color="${item.color}">
  <div class="cart__item__img">
    <img src="${item.img}" alt="Photographie d'un canapé">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${item.name}</h2>
      <p>${item.color}</p>
      <p>${item.price} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`
}

// total quantity and price 

document.getElementById("totalQuantity").innerHTML = totalQuantity
document.getElementById("totalPrice").innerHTML = totalPrice

//  remove product from cart page 
document.querySelectorAll('.deleteItem').forEach(item => {
  item.addEventListener('click', event => {


    const dataId = item.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id")
    const dataColor = item.parentNode.parentNode.parentNode.parentNode.getAttribute("data-color")

    if (dataId && dataColor) {
      const newCart = products.filter(item => item.productId !== dataId || item.color !== dataColor);
      localStorage.setItem("product", JSON.stringify(newCart))
      location.reload()
    }
  })
})

// change quanntity in cart page 
const quantityClass = document.getElementsByClassName('itemQuantity')[0];
document.querySelectorAll('.itemQuantity').forEach(item => {

  item.addEventListener('change', event => {




    const inputSelector = quantityClass.closest('input')
    let btnQuantity = document.querySelectorAll('.itemQuantity')

    const dataQuantity = inputSelector.getAttribute("value")


    const newQuantity = btnQuantity.innerText = quantityClass.value

    if
      (
      parseInt(newQuantity) > parseInt(dataQuantity)) {

      newQuantity !== dataQuantity
      console.log(newQuantity !== dataQuantity);
    }
    else if (parseInt(newQuantity) < parseInt(dataQuantity)) {
      newQuantity !== dataQuantity;
    }


    let newCartP = item.quantity = newQuantity;

    console.log(newCartP);


  })
})

// add form to localstorage 
var buttonOrder = document.getElementById("order")
buttonOrder.addEventListener("click", (event) => {
  event.preventDefault();
  // get form values
  const formValues = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,

  }
  console.log(formValues)

  // add formValues to localstorage

  localStorage.setItem("formValues", JSON.stringify(formValues))

  const productsAndFormtoSend = {
    products,
    formValues

  }
  console.log(productsAndFormtoSend)

})

// get datalocalstorage 
const datalocalstorageForm = localStorage.getItem("formValues")
// convert to object js

const datalocalstorageFormObject = JSON.parse(datalocalstorageForm)
// function to fill form from localstorage
function fillInTheFormFromLocalStorage(input) {
  document.querySelector(`#${input}`).value = datalocalstorageFormObject[input];
   }
  fillInTheFormFromLocalStorage("firstName")
  fillInTheFormFromLocalStorage("lastName")
  fillInTheFormFromLocalStorage("address")
  fillInTheFormFromLocalStorage("city")
  fillInTheFormFromLocalStorage("email")














