import React, { createContext, useState } from 'react';
import * as Keycloak from 'keycloak-js'

const AuthContext = createContext({});

export const keycloak = Keycloak('/keycloak.json');

keycloak
    .init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
    });

export const AuthProvider = ({ children }) => {

    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    
    let values = {
        keycloak,
        authenticated,
        user,
        token
    }

    const setAuth = () => {
        setAuthenticated(true);
        setUser(keycloak.tokenParsed);
        setToken(keycloak.token);
    }

    const cleanAuth = () => {
        setAuthenticated(false);
        setUser(null);
        setToken(null);
    }

    keycloak.onAuthSuccess = function () {
        console.log('Auth Success');
        setAuth();
    };

    keycloak.onAuthError = function (errorData) {
        console.log("Auth Error: " + JSON.stringify(errorData));
        cleanAuth();
    };

    keycloak.onAuthRefreshSuccess = function () {
        console.log('Auth Refresh Success');
        setAuth();
    };

    keycloak.onAuthRefreshError = function () {
        console.log('Auth Refresh Error');
        cleanAuth()
    };

    keycloak.onAuthLogout = function () {
        console.log('Auth Logout');
       cleanAuth();
    };

    keycloak.onTokenExpired = function () {
        console.log('Access token expired.');
        keycloak.updateToken(5); // Se o tempo do token que for menor que 5 segundos, então será gerado um novo.
    };

    return <AuthContext.Provider value={values}>{children} </AuthContext.Provider>;
}

export default AuthContext;