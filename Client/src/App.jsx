import { Route, Routes } from 'react-router';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {  Dashboard, Navbar, useAuth,AuthForm ,Expenses, Loading,Incomes} from './components';
import './styles/App.css'
 function App() {
    const {isLoggedIn, user, isPending} = useAuth()

    if(isPending){
      return ( <Loading/>)
    }

    
    return (
        <>
        {isLoggedIn? <Navbar/>:null}
        <Routes>
            <Route path="/auth" element={<AuthForm/>}/>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/expenses" element={<Expenses/>}/>
           {<Route path="/incomes" element={<Incomes/>}/> }
        </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
         
        </>
      )
}
export default App