import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginFormComponent';
import Contact from './components/ContactComponent';
import Head from './components/Head';
import FooterPage from './components/Footer';
import PrincipalPage from './components/PrincipalPage'
import HomePage from "./components/HomePageComponent";
import { Row, Col } from 'reactstrap';
import { itemslist } from './data/items_terrenos';


class App extends Component {
    render() {
        return (
            <div className={"bg-light"}>
                <Head />
                  <BrowserRouter>
                    <Switch>
                        <Route exact path={"/"}>
                            <Redirect to={{pathname: "/home"}}/>
                        </Route>
                        <Route exact path="/login">
                           <LoginForm />
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
                                    <Row className="text-primary">
                                        <h1><b><a href="/home" >Otros Terrenos</a></b></h1>
                                    </Row>
                                    <Row>
                                        <HomePage items={itemslist[0]} itemslist={itemslist}/>
                                    </Row>
                                </Col>
                            </div>

                        </Route>
                        <Route exact path="/contact">
                            <Contact />
                        </Route>
                   </Switch>
               </BrowserRouter>
                   <FooterPage/>
            </div>

        );
    }
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