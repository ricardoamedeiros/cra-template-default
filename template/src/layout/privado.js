import React from 'react';
import { keycloak } from '../components/auth';

const privado = () => {
    return <>
      <h1>Olá {keycloak.tokenParsed.name}</h1>
      <h1><button onClick={() => { keycloak.logout() }}>logout</button></h1>
    </>
  }

export default privado;