import './App.css';
import {BrowserRouter , Routes ,Route} from 'react-router-dom'
import Home from './screens/Home';
import User from './screens/User';
import Login from './screens/Login';
import { ToastContainer } from 'react-toastify';
import Register from './screens/Register';
import EditUser from './screens/EditUser';
import ManagerUser from './screens/ManagerUser';



function App() {
  return (
    <div className='App'>
    <ToastContainer/>
    <BrowserRouter>   
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/user' element={<User/>}/>  
     <Route path='/login' element={<Login/>}/> 
     <Route path='/register' element={<Register/>}/> 
     <Route path='/user/edit' element={<EditUser/>}/>
     <Route path='/manageruser' element={<ManagerUser/>}/> 

     </Routes>   
    </BrowserRouter>
    </div>
   
  );
}

export default App;
