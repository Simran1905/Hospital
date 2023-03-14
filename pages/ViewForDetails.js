import React, { useEffect, useState } from 'react';
import {Box,Button} from '@mui/material'
import Paper from '@mui/material/Paper';
import SideBar from '../SideBar';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {Link} from 'react-router-dom';


const ViewForDetails= ({setPid,Pid})=>{
  const[apiData,setApiData]=useState([]);

  useEffect(()=>{
    axios.get('https://localhost:44360/api/values')
    .then((Data)=>{
     
      setApiData(Data.data);
      console.log(Data.data);
    })
  },[])
  
  const getData=()=>{
    axios.get('https://localhost:44360/api/values')
    .then((Data)=>{
      setApiData(Data.data);
    })
  }
const getId=(ID)=>{
  setPid(ID);
  console.log(Pid);
}
const Delete=(id)=>{
  axios.delete(`https://localhost:44360/api/values/${id}`)
  .then(()=>{
    getData();
  })
}
    return(
        <>
          <Box sx={{ display: 'flex'}}>
          <SideBar/>
            <Box component={Paper} sx={{ flexGrow: 1, p: 3, m: 10}}>
             <h1>List of Payment Details</h1><br/>
             <TableContainer component={Paper} elevation={12}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:'bold'}}>PaymentId</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>PatientBillId</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>PatientName</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Age</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Gender</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Address</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>ContactNumber</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>TotalAmount</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Status</TableCell>
          </TableRow>
        </TableHead>
         <TableBody>
                {apiData.map((data,index)=>{
          return(
            <TableRow key={data.id}
               sx={{'&:last-child td,&:last-child th':{border:0}}}
            >
              <TableCell component="th" scope='row'>
                {data.PaymentId}
              </TableCell>
              <TableCell align='center'>{data.Patient_Billid}</TableCell>
              <TableCell align='center'>{data.PatientName}</TableCell>
              <TableCell align="center">{data.Age}</TableCell>
              <TableCell align="center">{data.Gender}</TableCell>
              <TableCell align="center">{data.Address}</TableCell>
              <TableCell align="center">{data.ContactNumber}</TableCell>
              <TableCell align='center' sx={{fontWeight:'bold', fontSize:'18px'}}>₹{data.Total_Bill}</TableCell>
              <TableCell align="center" sx={{fontWeight:'bold'}}>{data.Status}</TableCell>
              <TableCell align="right">
                <Link to="/UpdatePayment" style={{textDecoration:'none'}}>
                  <Button variant='outlined' onClick={()=>getId(data.PaymentId)} color="success" startIcon={<BorderColorIcon/>} >Update</Button>
                </Link>
              </TableCell>
              <TableCell align="right">
                <Button varient="outlined" onClick={()=>Delete(data.PaymentId)} color="error" startIcon={<DeleteIcon/>}>Delete</Button>
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
    );
}

export default ViewForDetails;