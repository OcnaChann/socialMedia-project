import {Link} from "react-router-dom";
import {auth} from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from 'firebase/auth';
export const Navbar = () => { 
  const [user] = useAuthState(auth);
  const logUserOut = async() => {
    await signOut(auth); 
  };
  return (
    <div className="navbar">
      <div className="nav-link">
        <Link to="/">Home</Link>
         {!user ? (
            <Link  to="/login">Login</Link> 
          ) : (
            <Link to='/createpost'>Create post</Link>
          )}  
       </div>
        <div className="nav-profile">
            {user && (
                <>
                <img src={user?.photoURL || ""} width="20" height="20" />
                <p>{user?.displayName}</p>
                <button className="nav-logout" onClick={logUserOut}>Logout</button>
               </>
            )}
        </div>
    </div>
    );
}