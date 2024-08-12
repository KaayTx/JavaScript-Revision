// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import { getAuthenticatedUser, isAuthentificated, isAdmin } from '../../utils/auths';

const Navbar = () => {
  renderNavbar();
};

function renderNavbar() {
  const authenticatedUser = getAuthenticatedUser();

  const anonymousUserNavbar = `
    <nav class="navbar navbar-expand-lg navbar-light bg-danger">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">e-Pizzeria</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" data-uri="/">Home</a>
            </li>
            <li id="loginItem" class="nav-item">
              <a class="nav-link" href="#" data-uri="/login">Login</a>
            </li>
            <li id="registerItem" class="nav-item">
              <a class="nav-link" href="#" data-uri="/register">Register</a>
            </li>            
          </ul>
        </div>
      </div>
    </nav>
  `;

  // Construire dynamiquement la partie de la navbar pour l'utilisateur authentifié
  let authenticatedUserNavbar = `
    <nav class="navbar navbar-expand-lg navbar-light bg-danger">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">e-Pizzeria</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" data-uri="/">Home</a>
            </li> `;

  // Ajouter le lien "Add a pizza" si l'utilisateur est administrateur
  if (isAdmin()) {
    authenticatedUserNavbar += `
            <li class="nav-item">
              <a class="nav-link" href="#" data-uri="/add-pizza">Add a pizza</a>
            </li> `;
  }

  authenticatedUserNavbar += `
            <li class="nav-item">
              <a class="nav-link" href="#" data-uri="/logout">Logout</a>
            </li>    
            <li class="nav-item">
              <a class="nav-link disabled" href="#">${authenticatedUser?.username}</a>
            </li>           
          </ul>
        </div>
      </div>
    </nav>
  `;

  const navbar = document.querySelector('#navbarWrapper');

  navbar.innerHTML = isAuthentificated() ? authenticatedUserNavbar : anonymousUserNavbar;
}

export default Navbar;
