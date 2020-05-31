import LoginForm from '../components/LoginFormComponent';
import Contact from '../components/ContactComponent';
import Detalle from '../components/Detalle'
import HomePage from "../components/HomePageComponent";
import RegisterForm from '../components/ToRegister';
import AddCards from "../components/AddCards";
import Profile from "../components/Profile";

const routes = [
    { path: '/login', name: 'Login', component: LoginForm },
    { path: '/home', name: 'Home', component: HomePage },
    { path: '/register', exact: true, name: 'Register', component: RegisterForm },
    { path: '/contact', exact: true, name: 'Contact', component: Contact },
    { path: '/detail', name: 'Detail', component: Detalle },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/property', name: 'Property', component: HomePage },
    { path: '/automobile', name: 'Automobile', component: HomePage },
    { path: '/farm', name: 'Farm', component: HomePage },
    { path: '/new', name: 'New', component: AddCards },
];

export default routes;
