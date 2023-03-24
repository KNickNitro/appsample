const showCreate = document.getElementById('createAcc');
const createAccount = document.getElementById('create');
const head = document.querySelector('.changehead');
const btn = document.querySelector('.submit');
const frgtbtn = document.querySelector('.forgot');
const bck = document.querySelector('.back');

createAccount.addEventListener('click', e => {
  createAccount.classList.add('hide');
  showCreate.classList.remove('hide');
  head.innerHTML = 'Create Account';
  btn.value = 'Create';
  frgtbtn.classList.add('hide');
  bck.classList.remove('hide');
});
