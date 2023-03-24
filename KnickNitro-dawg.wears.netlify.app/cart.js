let cart = [];

const cartContent = document.querySelector('.cart-content');
const cartTotal = document.querySelector('.cart-total');
const backBtn = document.querySelector('.back');

const clearCartBtn = document.querySelector('.clear-cart');

backBtn.addEventListener('click', () => {
  history.go(-1);
});

function setcartvalues() {
  let tempTotal = 0;
  let itemsTotal = 0;
  cart.map(item => {
    tempTotal += item.price * item.amount;
    itemsTotal += item.amount;
  });
  localStorage.setItem('cartTotal', JSON.stringify(tempTotal));
  localStorage.setItem('cartLength', JSON.stringify(itemsTotal));
  cartTotal.innerHTML = tempTotal;
}

function addcartItem(item) {
  const div = document.createElement('div');
  div.classList.add('bigcart');
  div.innerHTML = `
            <div class="cart-item">
                <img
                src=${item.image}
                alt="product"
                />
                <div>
                <h4>${item.title}</h4>
                <h5>Black / 36</h5>
                </div>
                <div>
                <p class="price">$${item.price}</p>
                <div class="remove-item" data-id=${item.id}>remove</div>
                </div>
            </div>
            <div class="pagination cart-footer">
                <button class="decrease" data-id=${item.id}>-</button>
                <button data-id="1" class="active">${item.amount}</button>
                <button class="increase" data-id=${item.id}>+</button>
            </div>
            <div class="cartborder"></div>`;
  cartContent.appendChild(div);
}
cart = JSON.parse(localStorage.getItem('cart'));

// console.log(cart);
const total = Number(localStorage.getItem('cartTotal'));
if (total !== null) {
  cartTotal.innerHTML = parseFloat(total.toFixed(2));
}

if (cart.length > 0) {
  clearCartBtn.classList.remove('none');
}

cart.forEach(item => {
  addcartItem(item);
});

clearCartBtn.addEventListener('click', () => {
  let cartItems = cart.map(item => item.id);
  console.log(cartItems);

  cartItems.forEach(id => {
    removeItem(id);
    setcartvalues();
  });

  clearCartBtn.classList.add('none');
  cartContent.innerHTML = '';
});

// cart items logic
cartContent.addEventListener('click', e => {
  // remove single item
  if (e.target.classList.contains('remove-item')) {
    let removeItem = e.target;
    let id = removeItem.dataset.id;
    let eachChild = removeItem.parentElement.parentElement.parentElement;
    cartContent.removeChild(eachChild);

    cart.forEach(singleItem => {
      if (singleItem.id == id) {
        const index = cart.findIndex(
          singleItemIndex => singleItemIndex.id === id
        );
        cart.splice(index, 1);
        console.log(cart);
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartLength', JSON.stringify(cart.length));
    setcartvalues();

    if (cart.length == 0) {
      clearCartBtn.classList.add('none');
    }
  } else if (e.target.classList.contains('increase')) {
    let addAmount = e.target;
    let id = addAmount.dataset.id;
    let tempItem = cart.find(item => item.id === id);
    tempItem.amount = tempItem.amount + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    setcartvalues();
    addAmount.previousElementSibling.innerHTML = tempItem.amount;
  } else if (e.target.classList.contains('decrease')) {
    let lowerAmount = e.target;
    let id = lowerAmount.dataset.id;
    let tempItem = cart.find(item => item.id === id);
    tempItem.amount = tempItem.amount - 1;

    if (tempItem.amount > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
      setcartvalues();
      lowerAmount.nextElementSibling.innerText = tempItem.amount;
    } else {
      let eachChild = lowerAmount.parentElement.parentElement;
      console.log(eachChild);
      cartContent.removeChild(eachChild);
      removeItem(id);
      setcartvalues();
    }
  }
});

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cartLength', JSON.stringify(cart.length));
}
