import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';

const routes = {
    '/': HomePage,
    '/login': LoginPage,
    '/register': RegisterPage,
};

const Router = () => {
    onFrontLoad();
    onNavBarClick();
    onHistoryChange();
}

function onNavBarClick() {
    const navItems = document.querySelectorAll('.nav-link');
  
    navItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const uri = e.target?.dataset?.uri;
        const pageToRender = routes[uri];
        if(!pageToRender) throw Error(`The ${uri} ressource does not exist.`);
        pageToRender();
        window.history.pushState({}, '', uri);
      });
    });
}

function onHistoryChange() {
    window.addEventListener('popstate', () => {
        const uri = window.location.pathname;
        const pageToRender = routes[uri];
        if(!pageToRender) throw Error(`The ${uri} ressource does not exist.`);
        pageToRender();
    });
}

function onFrontLoad(){
    window.addEventListener('load', () => {
        const uri = window.location.pathname;
        const pageToRender = routes[uri];
        if(!pageToRender) throw Error(`The ${uri} ressource does not exist.`);
        pageToRender();
    });
}
export default Router;
  