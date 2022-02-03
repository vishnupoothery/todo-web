import { useAuth } from "../context/UserContext";
import 'bootstrap/dist/css/bootstrap.css';
import {RiLogoutCircleRLine} from 'react-icons/ri';

export const SideMenu = ({ defList, userList,logout }) => {
    const { user } = useAuth();
    return <div>
        <div className="mt-3">
            <img src={user.photoURL} style={{ borderRadius: "50%", height: "30px", width: "30px" }} alt="avatar" className="avatar d-inline align-middle" />
            <h4 className="d-inline align-middle p-3">{user.displayName}</h4>
            <RiLogoutCircleRLine style={{height: "25px", width: "25px", color:"red", cursor:"pointer"}} onClick={logout} />
        </div>
        <hr />
        {defList.map(list => <p key={list.id}>{list.value}</p>)}
        <hr></hr>
        <h4>Lists</h4>
        {userList.map(list => <p key={list.id}>{list.value}</p>)}
        <div className="fixed-bottom">hello</div>
    </div>;
};
