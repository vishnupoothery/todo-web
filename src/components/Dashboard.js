import { useAuth, UserContext } from '../context/UserContext';

const Dashboard = () => {
    const {user,logout} = useAuth();
  return <div>
      <h1>Welcome {user.displayName}</h1>
      <button onClick={logout}>logout</button>
  </div>;
};

export default Dashboard;
