import React, { useState, useContext, createContext, useMemo } from 'react';

const appAuth = {
  auth: null,
  /**
   * signin
   */
  signin(auth, cb) {
    appAuth.auth = auth;
    setTimeout(cb, 100); // fake async
  },
  /**
   * signout
   */
  signout(cb) {
    appAuth.auth = null;
    setTimeout(cb, 100);
  },
};

export const AuthContext = createContext({});

/**
 *  Provider component that wraps your app and makes auth object available to any child component that calls useAuth().
 */
export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

/**
 *  Hook for child components to get the auth object and re-render when it changes.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 *  Provider hook that creates auth object and handles state
 */
const useProvideAuth = () => {
  const [auth, setAuth] = useState(null);

  /**
   *  signin
   */
  const signin = (auth, cb) => {
    return appAuth.signin(auth, () => {
      localStorage.setItem('authentication', JSON.stringify(auth));
      setAuth(auth);
      cb && cb();
    });
  };

  /**
   *  signout
   */
  const signout = (cb) => {
    return appAuth.signout(() => {
      localStorage.removeItem('authentication');
      setAuth(null);
      cb && cb();
    });
  };

  const localAuth = useMemo(() => {
    const local = JSON.parse(localStorage.getItem('authentication'));
    if (local && !auth) {
      signin(local, () => null);
    }
    return local;
  }, [auth]);

  return {
    auth: auth || localAuth,
    signin,
    signout,
  };
};
