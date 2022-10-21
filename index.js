import { menuArray } from "./data.js";

let orderArray = [];
let total = 0;

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    handleAddToCart(e);
    console.log(orderArray);
    updateTotal();
  }
  if (e.target.classList.contains("remove-btn")) {
    handleDeleteItem(e);
    updateTotal();
  }

  if (e.target.classList.contains("close-btn")) {
    document.getElementById("payment-modal").classList.toggle("hide");
  }

  if (e.target.classList.contains("payment-btn")) {
    if (total > 0) {
      document.getElementById("payment-modal").classList.toggle("hide");
    } else {
      alert("Please add items to your cart");
    }
  }
});

const updateTotal = () => {
  total = 0;

  orderArray.forEach((item) => {
    total += item.price;
  });

  document.getElementById("total-price-amount").innerText = `£${total}`;
  document.getElementById("payment-amount").innerText = `£${total}`;
};

const handleDeleteItem = (e) => {
  e.target.parentElement.remove();

  console.log(orderArray);

  const index = orderArray.findIndex(
    (item) => item.id.toString() === e.target.parentElement.dataset.id
  );

  orderArray.splice(index, 1);

  render();
};

const handleAddToCart = (e) => {
  const newObject = {
    itemName: e.target.parentElement.dataset.itemname,
    price: parseInt(e.target.parentElement.dataset.price),
    id: Math.floor(Math.random() * 100000 + 1),
  };

  orderArray.push(newObject);
  console.log(orderArray);
  buildOrderStatus(orderArray);
};

const buildOrderStatus = (orderArray) => {
  let orderStatus = ``;
  orderArray.forEach((item) => {
    orderStatus += `
    <div class="order-item" data-id=${item.id}>
            <h2 class="order-title">${item.itemName}</h2>
            <p class="order-price">£${item.price}</p>
            <a class="remove-btn" id="remove-btn">Remove</a>
    
    </div>
        `;
  });

  let orderSummary = document.getElementById("order-summary");
  orderSummary.innerHTML = orderStatus;

  document.getElementById("total-price-amount").innerHTML = `£${total}`;
};

const getMenuItems = () => {
  let menuItem = ``;
  menuArray.forEach((item) => {
    menuItem += `
    <div class="menu-item" data-price=${item.price} data-itemName=${item.name}>
        <img src="./images/${item.name}.png" class="menu-item-img" alt="" />
        <div class="menu-item-text">
            <h2 class="menu-item-title">${item.name}</h2>
            <p class="menu-item-desc">${item.ingredients.join(", ")}</p>
            <p class="menu-item-desc">£ ${item.price}
        </div>
        <i class="fa fa-circle-plus fa-2xl add-to-cart"></i>
    </div>
        `;
  });
  return menuItem;
};

const render = () => {
  let menuSection = document.getElementById("menu-section");
  let orderSummary = document.getElementById("order-summary");
  //   console.log(getMenuItems());
  menuSection.innerHTML = getMenuItems();
};

render();
