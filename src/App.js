import { useState, useMemo } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { UserContext } from './context/UserContext';


function App() {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App">
      <UserContext.Provider value={providerValue}>
        {console.log(user)}
        {!user ? <Login /> : <Dashboard/>}
      </UserContext.Provider>
    </div>
  );
}

export default App;
