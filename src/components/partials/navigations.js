import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


export function Navigation() {
   const [isAuth, setIsAuth] = useState(false);
   useEffect(() => {
     if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);
    return (
        <div>
          <nav style={{ backgroundColor: 'dark', color: 'white' }}>
            <Link to="/">JWT Authentification</Link>
            <div>{isAuth ? <Link to="/">Home</Link> : null}</div>
            <div>
              {isAuth ? (
                <Link to="/logout">Logout</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
          </nav>
        </div>
      );
}
