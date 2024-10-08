import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';
import Navbar from '../Navbar/Navbar';

import { setAuthenticatedUser } from '../../utils/auths';

const RegisterPage = () => {
  clearPage();
  renderPageTitle('Register');
  renderRegisterForm();
};

function renderRegisterForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const username = document.createElement('input');
  username.type = 'text';
  username.id = 'username';
  username.placeholder = 'username';
  username.required = true;
  username.className = 'form-control mb-3';
  const password = document.createElement('input');
  password.type = 'password';
  password.id = 'password';
  password.required = true;
  password.placeholder = 'password';
  password.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.value = 'Register';
  submit.type = 'submit';
  submit.className = 'btn btn-danger';
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submit);
  main.appendChild(form);

  form.addEventListener('submit', registerUser);

}

async function registerUser(event) {
  event.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch('/api/auths/register', options);
  if (!response.ok) throw new Error(response.statusText);

  const authenticatedUser = await response.json();
  console.log (authenticatedUser);

  setAuthenticatedUser(authenticatedUser);
  Navbar();
  Navigate('/');
}

export default RegisterPage;
