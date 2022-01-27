import { useAuth,} from '../context/UserContext';

const Login = () => {
    const { login } = useAuth();
    return (
        <div>
            <button onClick={login}>
                Login with Google
            </button>
        </div>


    );
};

export default Login;
