import React from "react";
import { Link} from "react-router-dom";
import AuthContext from "../components/auth/index";


const home = () => {
    return (
      <AuthContext.Consumer>
        {({keycloak}) => (
          <>
            <h1>Home</h1>
            <p>{keycloak.authenticated && 'Olá, ' + keycloak.tokenParsed?.name}</p>
            <Link to="/private">Acessar área protegida</Link>
            {keycloak.authenticated === false && <h1><button onClick={() => { keycloak && keycloak.login() }}>login</button></h1>}
            {keycloak.authenticated === true && <h1><button onClick={() => { keycloak && keycloak.logout() }}>logout</button></h1>}
          </>
        )}
      </AuthContext.Consumer>
      );
  }
export default home;