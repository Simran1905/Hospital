import React,{useEffect,useState} from 'react'
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
import Side from '../../Side';
import ReceiptIcon from '@mui/icons-material/Receipt';

const ViewBill = ({billId,setBillId}) => {
  const[apiData,setApiData]=useState([]);

  useEffect(() => {
    axios.get('https://localhost:44360/api/Bill')
    .then((Data)=>{
     console.log(Data)
      setApiData(Data.data);
    })
   },[])

   const getData=()=>{
    axios.get('https://localhost:44360/api/Bill')
    .then((Data)=>{
     console.log(Data )
      setApiData(Data.data);
    })
   }

   
   const Delete=(id)=>{
    axios.delete(`https://localhost:44360/api/Bill/${id}`)
    .then(()=>{
      getData();
    })
   }

  return (
   <>
    <Box sx={{ display: 'flex' }}>
      <Side/>
     
      <Box component="main" sx={{ flexGrow: 1, p: 3,m:10 }}>
      <h1>Details of Bills</h1>
      <TableContainer component={Paper} elevation={12}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell style={{fontWeight:'bold'}}>Bill_ID</TableCell>
          <TableCell align="right" style={{fontWeight:'bold'}}>Bill Date</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Patient_Name</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Doctor_Name</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Room_Bill</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Medicine_Bill</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Doctor_Bill</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Total_bill</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {apiData.map((data,index)=>{
            return(
            <TableRow key={data.Bill_Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
  
              
              <TableCell align="center" >{data.Bill_Id}</TableCell>
              <TableCell align="center" >{data.Bill_Date}</TableCell>
              <TableCell align="center" >{data.Patient_Name}</TableCell>
              <TableCell align="center">{data.Doctor_Name}</TableCell>
              <TableCell align="center">{data.Room_Bill}</TableCell>
              <TableCell align="center">{data.Medicine_Bill}</TableCell>
              <TableCell align="center">{data.Doctor_Bill}</TableCell>
              <TableCell align="center">{data.Total_Bill}</TableCell>
              <TableCell align="center">{data.Status}</TableCell>
              <Link to="/Payout">
              <TableCell align="right" >
                <Button variant="contained"  color="success" onClick={()=>setBillId(data.Bill_Id)} startIcon={<ReceiptIcon/>}>Pay</Button>
              </TableCell>
              </Link>

              <TableCell align="right" >
                <Button variant="contained" onClick={()=>Delete(data.Bill_Id)} color="error" startIcon={<DeleteIcon />}>Delete</Button>
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

export default ViewBill