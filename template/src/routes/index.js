import React, { useContext } from "react";
import AuthContext from "../components/auth/index";
import Login from "../components/auth/login";
import Home from '../layout/principal'

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Privado from "../layout/privado";

const PrivateRoute = ({ component: Component }) => {
  const { keycloak } = useContext(AuthContext);
  return (
    <AuthContext.Provider>
      <Route
        render={props => {
          //Se tiver autenticado abre o componente, caso contrário abre a tela de login.
          return (keycloak.authenticated ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { redirectTo: props.location },
                }}
              />
            )
          )
        }
        }
      />
    </AuthContext.Provider>
  )
};

const Routes = () => {
  return (<BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <Home/>} />
      <Route path="/login" component={props => <Login redirectTo="/app" {...props} />} />
      <PrivateRoute path="/private" component={() => <Privado/>} />
    </Switch>
  </BrowserRouter>)
};

export default Routes;