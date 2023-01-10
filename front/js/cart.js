
let products = [];
if (localStorage.getItem("product")) {
  products = JSON.parse(localStorage.getItem("product"));
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

document.getElementById("totalQuantity").innerHTML = totalQuantity
document.getElementById("totalPrice").innerHTML = totalPrice

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
