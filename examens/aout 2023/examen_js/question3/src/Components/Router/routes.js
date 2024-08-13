import HomePage from '../Pages/HomePage';
import CreateQuery from '../Pages/CreateQuery';
import GestionDemandes from '../Pages/GestionDemandes';

const routes = {
  '/': HomePage,
  '/queries/create': CreateQuery,
  '/queries' : GestionDemandes,

};

export default routes;
