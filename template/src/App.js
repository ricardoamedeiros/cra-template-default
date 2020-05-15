import React from 'react';
import {useContext} from 'react';
import AuthContext from './AuthContext';

const App = () => {
  const context = useContext(AuthContext);
  return (<div>{context.isLoading ? 'true':'false'}
            <div>
              <button onClick={()=>context.setLoading(!context.isLoading)} >clicar</button>
            </div>
          </div>);
}

export default App;
