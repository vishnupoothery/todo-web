import { authentication } from '../config/firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const Login = () => {
    const { user, setUser } = useContext(UserContext);

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider).then((res) => {
            setUser(res.user);
        }).catch((err) => {
            console.log(err)
            return err
        });
    }

    return (
        <div>
            <button onClick={loginWithGoogle}>
                Login with Google
            </button>
        </div>


    );
};

export default Login;
