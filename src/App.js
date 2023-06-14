import './App.css';

import {BrowserRouter , Routes ,Route} from 'react-router-dom'
import Home from './screens/Home';
import Post from './screens/Post';

function App() {
  return (
    <BrowserRouter>   
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/post' element={<Post/>}/>  
     </Routes>   
    </BrowserRouter>
   
  );
}

export default App;
