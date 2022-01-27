import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { useAuth } from './context/UserContext';


function App() {
  const {user} = useAuth()

  return (
      <div className="App">
        {console.log(user)}
        {!user ? <Login /> : <Dashboard/>}
    </div>
  );
}

export default App;
