import React, { useState, useEffect} from 'react';

export function Navigation() {
   const [isAuth, setIsAuth] = useState(false);
   useEffect(() => {
     if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);
     return ( 
      <div>
        <nav style={{backgroundColor: "dark", color: "white"}}>
          <a href="/">JWT Authentification</a>            
          <div> 
          {isAuth ? <a href="/">Home</a> : null}
          </div>
          <div>
          {isAuth ? <a href="/logout">Logout</a> :  
                    <a href="/login">Login</a>}
          </div>
        </nav>
       </div>
     );
}
