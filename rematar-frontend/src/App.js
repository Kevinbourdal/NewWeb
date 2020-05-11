import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginFormComponent';
import Contact from './components/ContactComponent';
import Head from './components/Head';
import FooterPage from './components/Footer';
import PrincipalPage from './components/PrincipalPage'
import SimpleMap from './components/SimpleMap'
import CardGallery from "./components/CardGalleryComponent";
import { itemslist } from './data/items_terrenos';


class App extends Component {
    render() {
        return (
            <div className={"bg-light"}>
                <Head />
                  <BrowserRouter>
                    <Switch>
                        <Route exact path={"/"}>
                            <Redirect to={{pathname: '/home'}}/>
                        </Route>
                        <Route exact path="/login">
                           <LoginForm />
                        </Route>
                        <Route exact path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/remates">
                            <PrincipalPage />
                            <SimpleMap />
                        </Route>
                        <Route exact path={"/home"}>
                            <CardGallery itemslist={itemslist}/>
                        </Route>
                        <Route exact path={"/land"}>
                            <CardGallery itemslist={itemslist}/>
                        </Route>
                   </Switch>
               </BrowserRouter>
                <FooterPage/>
            </div>

        );
    }
}

export default App;
