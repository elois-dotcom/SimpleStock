import './App.css'
import Home from './pages/addProduct'
import Login from './pages/login'
import Navbar from './components/navbar'
import { BrowserRouter as Router,Routes,Route,useLocation } from 'react-router-dom';
import StockOut from './pages/stock-out';
import StockIn from './pages/stock-in';
import Forgot from './pages/forgot-password-page';
import {ToastContainer, toast} from 'react-toastify'
import Report from './pages/report';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/signup';


const AppWrapper=()=>{
  const location= useLocation();
  const hideNavbarPaths=['/','/forgot-password-page','/signup'];

return (

  <>
  {!hideNavbarPaths.includes(location.pathname)&&<Navbar/>}
  <Routes>
    <Route path='/forgot-password-page'element={<Forgot/>}/>
    <Route path='/signup'element={<Signup/>}/>
    
    <Route path='addProduct'element={<Home/>}/>
    <Route path='/'element={<Login/>}/>
    <Route path='/stock-in'element={<StockIn/>}/>
    <Route path='/stock-out'element={<StockOut/>}/>
    <Route path='/report'element={<Report/>}/>
  </Routes>
  <ToastContainer position='top-right' autoClose={4000} style={{width:'300px'}}/>
  </>
   );
};

function App() {
 return(
  <Router>
    <AppWrapper/>
  </Router>
 )
   
  

   
 
}

export default App

