import React from 'react';
import { keycloak } from '../components/auth';
import { Link } from "react-router-dom";

const privado = () => {
    return <>
      <h1>Área protegida</h1>
      <Link to="/">Home</Link> 
      <h1><button onClick={() => { keycloak.logout() }}>logout</button></h1>
    </>
  }

export default privado;