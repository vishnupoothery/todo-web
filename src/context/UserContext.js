import { createContext, useContext, useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { authentication } from '../config/firebase';

export const UserContext = createContext({
    user: null,
    login: () => Promise,
    logout: () => Promise,
});

export const useAuth = () => useContext(UserContext)

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authentication, user => {
            setUser(user);
        })
        return () => unsubscribe();
    }, [])

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider).then((res) => {
            console.log('loggedin');
        }).catch((err) => {
            console.log(err)
        });
    }

    const login = () => {
        return loginWithGoogle();
    }

    const logout = () => {
        authentication.signOut().then(() => {
            console.log('logout')
        }).catch((err) => {
            console.log(err)
        })
    }


    const value = {
        user,
        login,
        logout,
    }

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
};


export default UserContextProvider;