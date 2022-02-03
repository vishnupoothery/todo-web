import { useAuth } from "../context/UserContext";

const SideNav = ({closeNav}) => {
    const { user} = useAuth();
    return <>
        <div id="mySidenav" className="sidenav">
            <span className="closebtn" onClick={closeNav}>&times;</span>
            <p style={{color:"white"}}>{user.displayName}</p>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
        </div>
    </>;
};

export default SideNav;
