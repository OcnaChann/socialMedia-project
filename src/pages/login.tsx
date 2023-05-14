import {auth, provider} from "../config/firebase";
import {signInWithPopup} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
export const Login =() => {
    const navigate = useNavigate();
    const signInWithGoogle = async() => {   
          const result = await signInWithPopup(auth, provider);
          console.log(result);
          navigate('/');
    };
    return (
    <div className="signin">
        <br></br>
         <p>Sign in:</p>
         <br></br>
         <button className="btn" onClick={signInWithGoogle}>Sign in with Google</button>
         <br></br>
     </div>
     );
};