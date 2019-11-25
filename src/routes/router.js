
import Clients from '../views/clients/clients'

var ThemeRoutes = [
  {
    navlabel: true,
    name: 'Administrativo',
    icon: 'mdi mdi-dots-horizontal'
  },
  {
    path: '/clients',
    name: 'Clientes',
    icon: 'icon-people',
    component: Clients
  },
  {
    path: '/',
    pathTo: '/authentication/login',
    name: 'Dashboard',
    redirect: true
  }
]
export default ThemeRoutes
