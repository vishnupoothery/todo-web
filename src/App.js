import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { useAuth } from './context/UserContext';


function App() {
  const {user} = useAuth()
  console.log(user);
  return (
      <div className="App">
        {!user ? <Login /> : <Dashboard/>}
    </div>
  );
}

export default App;
