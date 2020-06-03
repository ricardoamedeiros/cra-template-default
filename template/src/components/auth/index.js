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

    let values = {
        keycloak
    }

    keycloak.onAuthSuccess = function () {
        console.log('Auth Success');
    };

    keycloak.onAuthError = function (errorData) {
        console.log("Auth Error: " + JSON.stringify(errorData));
        localStorage.clear();
    };

    keycloak.onAuthRefreshSuccess = function () {
        console.log('Auth Refresh Success');
    };

    keycloak.onAuthRefreshError = function () {
        console.log('Auth Refresh Error');
        localStorage.clear();
    };

    keycloak.onAuthLogout = function () {
        console.log('Auth Logout');
    };

    keycloak.onTokenExpired = function () {
        console.log('Access token expired.');
        keycloak.updateToken(5); // Se o tempo do token que for menor que 5 segundos, então será gerado um novo.
    };

    return <AuthContext.Provider value={values}>{children} </AuthContext.Provider>;
}

export default AuthContext;