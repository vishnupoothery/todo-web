import { SideMenu } from "./SideMenu";

const SideNav = ({closeNav,defList,userList,logout}) => {
    return <>
        <div id="mySidenav" className="sidenav shadow">
            <span className="closebtn" onClick={closeNav}>&times;</span>
            <div className="p-3 pt-0"><SideMenu defList={defList} userList={userList} logout={logout} /></div>
        </div>
    </>;
};

export default SideNav;
