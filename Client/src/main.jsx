import {createRoot} from 'react-dom/client'
import { AuthProvider } from './components/AuthProvider.jsx'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <AuthProvider>
        <App />
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
        {console.log("is in prod: ",process.env.NODE_ENV)}
        {console.log("server link: ",baseURL = process.env.NODE_ENV === 'production' ? 'https://oyveypay.onrender.com/api' : 'http://localhost:1312/api')}
        {console.log("end")}
      </AuthProvider>
    </BrowserRouter>
  
)
