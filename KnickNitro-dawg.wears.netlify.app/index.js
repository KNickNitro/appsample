'use strict';

let products;
let state;
let buttonsDom = [];

async function getData() {
  try {
    const response = await fetch('products.json');
    const data = await response.json();
    products = data.items;
  } catch (err) {
    console.log(err);
  }
}

async function printJSON() {
  if (!products) {
    await getData();
  }
  if (!products) {
    throw new Error('could not get the products');
  }

  products = products.map(item => {
    const { title, price } = item.fields;
    const { id } = item.sys;
    const image = item.fields.image.fields.file.url;
    return { title, price, id, image };
  });
  products.sort(() => Math.random() - Math.random()).slice(0, -1);

  state = {
    querySet: products,
    page: 1,
    rows: 6,
    window: 5,
  };

  products = localStorage.setItem('products', JSON.stringify(products));
  buildTable();
  return products;
}

function pagination(querySet, page, rows) {
  let trimStart = (page - 1) * rows;
  let trimEnd = trimStart + rows;

  var trimmedData = querySet.slice(trimStart, trimEnd);
  var pages = Math.round(querySet.length / rows);

  return {
    querySet: trimmedData,
    pages: pages,
  };
}

function buildTable() {
  const table = document.querySelector('.nice');

  var data = pagination(state.querySet, state.page, state.rows);
  var myList = data.querySet;

  const product = myList
    .map(items => {
      let row = '';
      return (row += `
      <article class="product">
        <div class="img-container">
          <img
              src=${items.image}
              alt="product"
              class="product-img"
          />
          <a href="descriptionPage.html"> <button class="bag-btn" data-id="${
            items.id
          }">view product</button></a>

        </div>
        <div class="responsibles left">
          <h3>${items.title}</h3>
          <p>2 colors available</p>
          <ul class="radio">
            <input type="radio" name="in"/>
            <input type="radio" name="in"/>
          </ul>
        </div>
        <h4 class="right">${
          Number(items.price) ? '$' + items.price : items.price
        }</h4>
      </article>`);
    })

    .join('');
  table.innerHTML = product;
  viewItembtn();
}

function viewItembtn() {
  const buttons = [...document.querySelectorAll('.bag-btn')];

  buttonsDom = buttons;

  buttons.forEach(button => {
    let id = button.dataset.id;
    button.addEventListener('click', e => {
      let decsPage = getProduct(id);
      localStorage.setItem('EachProd', JSON.stringify(decsPage));
    });
  });
}

function getProduct(id) {
  let products = JSON.parse(localStorage.getItem('products'));
  return products.find(product => product.id === id);
}

document.addEventListener('DOMContentLoaded', () => {
  printJSON();
});

const cartItems = document.querySelector('.cart-items');
const item = localStorage.getItem('cartLength');
if (item !== null) {
  cartItems.innerHTML = item;
}
