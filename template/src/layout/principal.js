import React from 'react';
import { keycloak } from '../components/auth';

const home = () => {
    return <>
      <h1>Hello World</h1>
      <h1><button onClick={() => { keycloak.login() }}>login</button></h1>
      <h1><button onClick={() => { keycloak.logout() }}>logout</button></h1>
    </>
  }

export default home;