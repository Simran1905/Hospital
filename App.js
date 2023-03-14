import React from 'react';
import ViewRoom from './pages/ViewRoom';
import SearchRoom from './pages/SearchRoom';
import UpdateRoom from './pages/UpdateRoom';
import ShiftRoom from './pages/ShiftRoom';
import AddRoom from './pages/AddRoom';
import MainPage from './pages/MainPage'
import MainMenu from './pages/MainMenu'
import Doctor from './pages/Doctor/Doctor';
import ViewPatients from './pages/Patient/ViewPatient';
import Login from './pages/login';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import {useState} from 'react';
import GenerateBill from './pages/Bill/GenerateBill';
import GeneratePayment from './pages/GeneratePayment';
import ViewForDetails from './pages/ViewForDetails';
import UpdatePayment from './pages/UpdatePayment';
import SearchForDetails from './pages/SearchForDetails';
import ViewRoomAndDoctor from './pages/ViewRoomAndDoctor';
import AddRoomAndDoctor from './pages/AddRoomAndDoctor';
import SearchRoomAndDoctor from './pages/SearchRoomAndDoctor';
import Report from './pages/Report/Report'
import ViewBill from './pages/Bill/ViewBill';
import Bill from './pages/Bill';
import Payout from './pages/Payout';




const App = () => {
  const [id, setId] = useState(null);
  const[Pid,setPid]=useState(null);
  const[Aid,setAid]=useState(null);
  const [data,setData]=useState(null);
  const [billId,setBillId]=useState(null);

   

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/ViewRoom" exact element={<ViewRoom setId={setId} id={id} />}></Route>
          <Route path="/AddRoom" exact element={<AddRoom/>}></Route>
          <Route path="/Login" exact element={<Login/>}></Route>

          <Route path="/ViewAssignment" exact element={<ViewRoomAndDoctor setId={setAid} id={Aid} />}></Route>
          <Route path="/AddRoomAndDoctor" exact element={<AddRoomAndDoctor/>}></Route>
          <Route path="/SearchRoomAndDoctor" exact element={<SearchRoomAndDoctor/>}></Route>
         
          <Route path="/Doctor" exact element={<Doctor/>}></Route>
          <Route path="/report" exact element={<Report/>}></Route>

          <Route path='/ViewPatient' exact element={<ViewPatients />}></Route>
          <Route path='/ViewBill' exact element={<ViewBill billId={billId} setBillId={setBillId}/>}></Route>
          <Route path='/Bill' exact element={<Bill Data={data} setData={setData}/>}></Route>
       

         
          <Route path="/GenerateBill" exact element={<GenerateBill Details={data} setData={setData}/>}></Route>
          <Route path="/" exact element={<MainPage/>}></Route>
          <Route path="/dashboard" exact element={<MainMenu/>}></Route>
          <Route path="/SearchRoom" exact element={<SearchRoom/>}></Route>
          <Route path="/ShiftRoom" exact element={<ShiftRoom/>}></Route>
          <Route path="/Payout" exact element={<Payout billId={billId} />}></Route>

          {/* <Route path="/" exact element={<ViewForDetails setPid={setPid} Pid={Pid}/>}></Route> */}
          <Route path='/GeneratePayment' exact element={<GeneratePayment billId={billId}/>}></Route>
          <Route path="/Payout" exact element={<Payout billId={billId} />}></Route>
          <Route path="/ViewForDetails" exact element={<ViewForDetails  setPid={setPid} Pid={Pid}/>}></Route>
          <Route path="/UpdatePayment" exact element={<UpdatePayment setPid={setPid} Pid={Pid}/>}></Route>
          <Route path="/SearchForDetails" exact element={<SearchForDetails/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App