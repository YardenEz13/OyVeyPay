import { createContext,useState,useEffect,useContext } from 'react';
import { useNavigate } from 'react-router';
import { me } from '../api/auth';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const[isPending,setIsPending]=useState(true);
    const[isLoggedIn,setIsLoggedIn]=useState(false);

    const navigate = useNavigate();

    const isTokenExpired = (decodedToken)=>{
        try{
            const currentTime = Math.floor(Date.now() / 1000);
            return decodedToken.exp < currentTime;
        }catch(error){
            console.error('Error decoding token:', error);
            return true;
        }
    };
    const checkAuth = async()=>{
        try{
           const data = await me();
           if(isTokenExpired(data)||!data){
            setIsLoggedIn(false)
            setUser(null);
            navigate('/auth');
           }
           
            setUser(data);
            setIsLoggedIn(true);
        }catch(error){
            setUser(null);
            console.error('Error checking authentication:', error);
            setIsLoggedIn(false);
        }
        finally{
            setIsPending(false);
        }
    }
    useEffect(()=>{
        checkAuth();
    },[]);
    return( <AuthContext.Provider value={{ user, setUser,isLoggedIn,isPending }}>
        {children}
    </AuthContext.Provider>);
};
export const useAuth = () => useContext(AuthContext);