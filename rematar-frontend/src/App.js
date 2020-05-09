import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginForm from './components/LoginFormComponent';
import Contact from './components/ContactComponent';
import Head from './components/Head';

class App extends Component {
    render() {
        return (
            <div>
                <Head />
                <BrowserRouter>
                    <Switch>
                        <Route path="/login">
                           <LoginForm />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                   </Switch>
               </BrowserRouter>
            </div>
        );
    }
}

export default App;
