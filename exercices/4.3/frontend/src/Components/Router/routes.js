import HomePage from '../Pages/HomePage';
import AddMoviePage from '../Pages/AddMoviePage';
import ViewMoviePage from '../Pages/ViewMoviePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import Logout from '../Logout/Logout';

const routes = {
  '/': HomePage,
  '/add': AddMoviePage,
  '/view': ViewMoviePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
};

export default routes;
