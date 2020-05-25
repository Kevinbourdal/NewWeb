import React from 'react';
import { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginFormComponent';
import Contact from './components/ContactComponent';
import Head from './components/Head';
import FooterPage from './components/Footer';
import PrincipalPage from './components/PrincipalPage'
import CardGallery from "./components/CardGalleryComponent";
import HomePage from "./components/HomePageComponent";
import { Row, Col } from 'reactstrap';
import ToRegister from './components/ToRegister';
import AddCards from "./components/AddCards";
import Profile from "./components/Profile";


import { itemslist } from './data/items_terrenos';

const useStateWithLocalStorage = localStorageKey => {
    const [value, setValue] = useState(
        localStorage.getItem(localStorageKey) || 'false'
    );

    useEffect(() => {
        localStorage.setItem(localStorageKey, value);
    }, [value]);

    return [value, setValue];
};

const App = () => {
    const [login, setLogin] = useStateWithLocalStorage(
        'login'
    );
    const [name, setName] = useStateWithLocalStorage(
        'name'
    );

    const onChange = event => {
        setLogin(login==='false' ? 'true':'false');
        setName('charly');

    }
    return (
        <div style={{backgroundColor:'#e0e0e0 '}}   >
            <Head login={login} name={name} onChange={onChange}/>
              <BrowserRouter>
                <Switch>
                    <Route exact path={"/"}>
                        <Redirect to={{pathname: "/home"}}/>
                    </Route>
                    <Route exact path={"/Profile"}>
                        <Redirect to={{pathname: "/Profile"}}/>
                        <Profile />
                    </Route>
                    <Route exact path="/login">
                       <LoginForm login={login} onChange={onChange}/>
                    </Route>
                    <Route exact path="/logout">
                        <Redirect to={{pathname: "/home"}}/>
                    </Route>
                    <Route exact path="/registrarse">
                        <ToRegister />
                    </Route>
                    <Route exact path="/remates">
                      <HomePage items={itemslist[0]} itemslist={itemslist} />
                    </Route>
                    <Route exact path="/contact">
                        <Contact />
                        </Route>
                    <Route exact path={"/home"}>
                        <HomePage items={itemslist[0]} itemslist={itemslist} />
                    </Route>
                    <Route exact path={"/Lots"}>
                        <PrincipalPage />
                        <div className="container text-center">
                            <Col>
                                <Row>
                                    <CardGallery itemslist={itemslist}/>
                                </Row>
                            </Col>
                        </div>

                    </Route>
                    <Route exact path="/contact">
                        <Contact />
                    </Route>
                    <Route exact path="/new">
                        <AddCards />
                    </Route>
               </Switch>
           </BrowserRouter>
           <FooterPage/>
        </div>

    );
}

export default App;



/*  <div className="container">
                    <div id="map"></div>
                    <script>
                        {{SCRIPT}}
                    </script>
                </div>


<CardGallery itemslist={itemslist}/>
 */
