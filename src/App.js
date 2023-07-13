import './App.css';
import {BrowserRouter , Routes ,Route} from 'react-router-dom'
import Home from './screens/Home';
import User from './screens/User';
import Login from './screens/Login';
import { ToastContainer } from 'react-toastify';
import Register from './screens/Register';
import EditUser from './screens/EditUser';
import ManagerUser from './screens/ManagerUser';
import ViewUser from './screens/ViewUser';
import ManagerRoom from './screens/ManagerRoom';
import EditRoom from './screens/EditRoom';
import ListRoom from './screens/ListRoom';
import AddRoom from './screens/AddRoom';
import ManagerAccount from './screens/ManagerAccount';
import ManagerNoti from './screens/ManagerNoti';
import BookingBed from './screens/BookingBed';
import Error from './screens/Error';



function App() {
  return (
    <div className='App'>
    <ToastContainer/>
    <BrowserRouter>   
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/user/:id' element={<User/>}/>  
     <Route path='/login' element={<Login/>}/> 
     <Route path='/register' element={<Register/>}/> 
     <Route path='/user/edit/:id' element={<EditUser/>}/>
     <Route path='/manageruser' element={<ManagerUser/>}/> 
     <Route path='/view/user/:id' element={<ViewUser/>}/> 
     <Route path='/managerroom' element={<ManagerRoom/>}/> 
     <Route path='/edit/room/:id' element={<EditRoom/>}/>
     <Route path='/listroom' element={<ListRoom/>}/>
     <Route path='/addroom' element={<AddRoom/>}/>
     <Route path='/account' element={<ManagerAccount/>}/>
     <Route path='/managernoti' element={<ManagerNoti/>}/>
     <Route path='/booking' element={<BookingBed/>}/>
     <Route path='/error' element={<Error/>}/>

     </Routes>   
    </BrowserRouter>
    </div>
   
  );
}

export default App;
