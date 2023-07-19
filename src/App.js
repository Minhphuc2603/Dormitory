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
import ResidentHistory from './screens/ResidentHistory';
import ManagerResident from './screens/ManagerResident';
import ViewNoti from './screens/ViewNoti';
import AddNoti from './screens/AddNoti';
import EditNoti from './screens/EditNoti';
import Payment from './screens/Payment';
import ManagerPayment from './screens/ManagerPayment';
import PaymentHistory from './screens/PaymentHistory';



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
     <Route path='/*' element={<Error/>}/>
     <Route path='/resident' element={<ResidentHistory/>}/>
     <Route path='/manager/resident' element={<ManagerResident/>}/>
     <Route path='/viewnoti' element={<ViewNoti/>}/>
     <Route path='/add/noti' element={<AddNoti/>}/>
     <Route path='/edit/noti/:id' element={<EditNoti/>}/>
     <Route path='/payment' element={<Payment/>}/>
     <Route path='/paymenthistory' element={<PaymentHistory/>}/>
     <Route path='/managerpayment' element={<ManagerPayment/>}/>
     


     </Routes>   
    </BrowserRouter>
    </div>
   
  );
}

export default App;
