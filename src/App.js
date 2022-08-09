
import './App.css';
import { AdminLogin } from './Conponents/AdminLogin';
import { NavBar } from './Conponents/NavBar';
import { Routes,Route} from 'react-router-dom';

import Login from './Conponents/LoginForm';
import { TimeSheet } from './Conponents/TimeSheet';
import EmployeeLogin from './Conponents/EmployeLogin';
import { Admin_DashBoard } from './Conponents/Admin_DashBoard';
import { Add_employee } from './Conponents/Add_employee';
import { Delete_employee } from './Conponents/Delete_employee';
import { ViewTimeSheet } from './Conponents/ViewTimeSheet';
import { Home } from './Conponents/Home';

function App() {
  return (
    <div className="App">
<NavBar/>
      
<Routes>
  <Route path='/AdminLogin' element={<Login/>}/>
  <Route path='' element={<Home/>}/>
  <Route path='/AdminDashBoard' element={<Admin_DashBoard/>}/>
  <Route path='/employeelogin' element={<EmployeeLogin/>}/>
  <Route path='/employeetimesheet' element={<TimeSheet/>}/>
  <Route path='/Viewtimesheet' element={<ViewTimeSheet/>}/>
  <Route path='/addemployee' element={<Add_employee/>}/>
  <Route path='/Allemployee' element={<Delete_employee/>}/>
</Routes>
    </div>
  );
}

export default App;
