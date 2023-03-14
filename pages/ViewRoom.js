import React,{useEffect,useState} from 'react'
import Sidenav from '../SideNav';
import {Button} from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';
import axios from 'axios';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { ContactSupportOutlined } from '@mui/icons-material';


const ViewRoom = ({setId,id}) => {
  const[apiData,setApiData]=useState([]);

  useEffect(() => {
    axios.get('https://localhost:44360/api/Room')
    .then((Data)=>{
      setApiData(Data.data);
      console.log(Data.data);
    })
   },[])

   const getData=()=>{
    axios.get('https://localhost:44360/api/Room')
    .then((Data)=>{
      console.log(Data.data);
      setApiData(Data.data);
    })
   }

   const getId=(ID)=>{
    setId(ID);
    console.log(id);
   }
   const Delete=(Id)=>{
    axios.delete(`https://localhost:44360/api/Room/${Id}`)
    .then(()=>{
      getData();
    })
   }

  return (
   <>
    <Box sx={{ display: 'flex' }}>
      <Sidenav/>
     
      <Box component="main" sx={{ flexGrow: 1, p: 3,m:10 }}>
      <h1>Room Lists</h1>
      <TableContainer component={Paper} elevation={12}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:'bold'}}>Room ID</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Room Types</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Number of Rooms</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Room Rates per days</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}></TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {apiData.map((data,index)=>{
            return(
            <TableRow key={data.Room_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               {data.Room_id}
              </TableCell>
              <TableCell align="center" >{data.Room_Type}</TableCell>
              <TableCell align="center">{data.No_Of_Rooms}</TableCell>
              <TableCell align="center" sx={{fontWeight:'bold', fontSize:'14px'}}>₹{data.Rates_Per_Day}</TableCell>
              <TableCell align="right" >
                <Button variant="contained" onClick={()=>Delete(data.Room_id)} color="error" startIcon={<DeleteIcon />}>Delete</Button>
              </TableCell>
            </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
    </Box>
   </>
  )
}

export default ViewRoom