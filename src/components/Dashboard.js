import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { authentication } from '../config/firebase';

const Dashboard = () => {
    const {user,setUser} = useContext(UserContext);
    const logout = () => {
        authentication.signOut().then(function() {
            // Sign-out successful.
            console.log('Sign-out successful.');
            setUser(null)
          }).catch(function(error) {
            // An error happened.
            console.log(error)
          });
    }
  return <div>
      <h1>Welcome {user.displayName}</h1>
      <button onClick={logout}>logout</button>
  </div>;
};

export default Dashboard;
