import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext([{}, () => {}]);
const UserConsumer = UserContext.Consumer;
const useUser = () => React.useContext(UserContext);

const UserProvider = props => {
  const [state, setState] = useState({ loading: true });
  console.log(state);
  useEffect(() => {
    fetch('/auth/user')
      .then(res => res.json())
      .then(res => {
        res.loading = false;
        setState(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [state.update]);

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { useUser, UserContext, UserConsumer, UserProvider };
