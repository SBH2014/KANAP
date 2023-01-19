
// display products in cart page 
let products = getBasketFromLocalStorage()
let cart__items = elementById("cart__items")

const fetchProductData = async (productId) => {
  const result= fetch("http://localhost:3000/api/products/" + productId)
    return (await result).json()
}

// remove product from basket and update products in localstorage
displayProducts()
  .then(() => {
    //  remove product from cart page 
    let deletButton = document.querySelectorAll('.deleteItem');
    deletButton.forEach(item => {
      item.addEventListener('click', event => {
        removeProductFromBasket(item);
      })
    })
    // change quantity in cart page 
    let quantityClass = document.getElementsByClassName('itemQuantity')[0];
    document.querySelectorAll('.itemQuantity').forEach(item => {
      item.addEventListener('input', (event) => {
        changeQuantiityInBasket(item)

      })
    })
  });



// display product in cart page 
async function displayProducts() {
  if (products && products.length != 0) {
    for (let item of products) {
      let product = await forceUpdateQuantityAndPrice(item);
      cart__items.innerHTML += makeNewArticle(item, product)
    }

  }
  else {
    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";
    document.querySelector("h1").innerHTML =
      "Vous n'avez pas encore d'article dans votre panier !";
  }

}

async function forceUpdateQuantityAndPrice(item) {
  let product;
  product = await fetchProductData(item.productId);
  calculateTotalPrice(product, item);
  calculateTotalQuantity(item);
  return product;
}

// create html elements in the DOM 
function makeNewArticle(item, product) {
  return `<article class="cart__item" data-id="${item.productId}" data-color="${item.color}">
  <div class="cart__item__img">
    <img src="${product.imageUrl}" alt="Photographie d'un canapé">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${product.name}</h2>
      <p>${item.color}</p>
      <p>${product.price} €</p>
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
let totalQuantity = 0;
let totalPrice = 0;
function calculateTotalQuantity(item) {
  totalQuantity += parseInt(item.quantity);
  elementById("totalQuantity").innerHTML = totalQuantity
}

function calculateTotalPrice(data, item) {
  // obliger de le faire ici parce que le calcul se fait dans une fonction asynchrone.
  totalPrice += (parseInt(data.price) * parseInt(item.quantity))
  elementById("totalPrice").innerHTML = totalPrice
}

// function to delet products from basket 
function removeProductFromBasket(item) {
  let dataId = getDataIdOfArticle(item);
  let dataColor = getDataColorOfArticle(item);
  if (dataId && dataColor) {
    const newCart = products.filter(item => item.productId !== dataId || item.color !== dataColor);
    saveUpdatedBasketIntoLocalStorage(newCart);
    location.reload();
  }
}


//listen to the change in quantity
async function changeQuantiityInBasket(item) {
  let dataId = getDataIdOfArticle(item);
  let dataColor = getDataColorOfArticle(item);
  for (let product of products) {
    if (dataId === product.productId && dataColor === product.color) {
      product.quantity = event.target.value
      if (product.quantity > 100) {
        product.quantity = 100;
        location.reload()
      }
      if (product.quantity == 0) {
        product.quantity = 1;
        location.reload()
      }

    }
  }
  saveUpdatedBasketIntoLocalStorage(products)
  totalQuantity = 0;
  totalPrice = 0;
  for (let item of products) {
    let product = await forceUpdateQuantityAndPrice(item);
  }


}
function getDataColorOfArticle(item) {
  return item.closest('article').getAttribute("data-color");
}

function getDataIdOfArticle(item) {
  return item.closest('article').getAttribute("data-id");
}


//-----------------------------------------Form---------------------------------------------------//
// add form to localstorage 
var buttonOrder = elementById("order")
buttonOrder.addEventListener("click", (event) => {
  event.preventDefault();
  // get form values
  const formValues = getFormeValues()
  // add formValues to localstorage
  const productsAndFormtoSend = {
    products,
    formValues
  }
  // verification and validation of the form
  // verification of the firstName
  const prenom = formValues.firstName
  const nom = formValues.lastName
  const ville = formValues.city
  const adresse = formValues.address
  // regEx of the firstName,lastName and City
  let regExPrenomNomVille = (value) => {
    return new RegExp("/^[A-Za-z]{3,20}$/").test(value)
  }
  // regEx of the address
  let regExaddress = (value) => {
    return /^[a-zA-Z0-9À-ÿ\s,.'-]{3,}$/.test(value)
  }
  // regEx of the email
  let regExEmail = (value) => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
  }
  // validation of the form
  if (fisrNameControl() && lastNameControl() && cityControl() && addressControl() && emailControl()) {
    localStorage.setItem("formValues", JSON.stringify(formValues))
  }
  else {
    alert("Veuillez bien remplir le formulaire")
  };
  //function  FormeValues
  function fisrNameControl() {
    let prenom = formValues.firstName

    if (regExPrenomNomVille(prenom)) {
      return true
    }
    else {
      elementById("firstNameErrorMsg").innerHTML = 'Merci de saisir un prénom valide'
      return false
    }

  };
  function lastNameControl() {
    const nom = formValues.lastName
    if (regExPrenomNomVille(nom)) {
      return true
    }
    else {
      elementById("lastNameErrorMsg").innerHTML = 'Merci de saisir un nom valide'
      return false
    }

  };
  function cityControl() {
    const city = formValues.city
    if (regExPrenomNomVille(ville)) {
      return true
    }
    else {
      elementById("cityErrorMsg").innerHTML = 'Merci de saisir une ville valide'
      return false
    }

  };
  function addressControl() {
    const theAddress = formValues.address
    if (regExaddress(theAddress)) {
      return true
    }
    else {
      alert("adresse : n'est pas valide ");
      elementById("addressErrorMsg").innerHTML = 'Merci de saisir une adresse valide'
      return false
    }

  };
  function emailControl() {
    const email = formValues.email
    if (regExEmail(email)) {
      return true
    }
    else {
      alert("Email : n'est pas valide ");
      elementById("emailErrorMsg").innerHTML = 'Merci de saisir une adresse mail valide'
      return false
    }

  };

})

// get datalocalstorage 
const datalocalstorageForm = localStorage.getItem("formValues")
// convert to object js
const datalocalstorageFormObject = JSON.parse(datalocalstorageForm)
function getFormeValues() {
  return {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };
}

// function to fill form from localstorage
function fillInTheFormFromLocalStorage(input) {
  document.querySelector(`#${input}`).value = datalocalstorageFormObject[input];
}
fillInTheFormFromLocalStorage("firstName")
fillInTheFormFromLocalStorage("lastName")
fillInTheFormFromLocalStorage("address")
fillInTheFormFromLocalStorage("city")
fillInTheFormFromLocalStorage("email");

//-----------------------------------------endForm---------------------------------------------------//

