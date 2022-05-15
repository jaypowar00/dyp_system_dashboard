import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router';
import Login from './components/Login';
import Home from './components/Home';

class App extends PureComponent {

    componentDidMount() {
        const pathname = document.location.pathname;
        if(pathname !== "/" && pathname !== "/login")
            document.location.pathname = "/";
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path="/" component={() => <Home/>} ></Route>
                    <Route exact path="/login" component={() => <Login/> } ></Route>
                </Switch>
            </React.Fragment>
        )
    }
}

export default App;