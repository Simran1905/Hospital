import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import SideBar from '../SideBar';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import Select from '@mui/material/Select';

const  SearchForDetails=()=>
{
  const[apiData,setApiData]=useState([]);
  const[result,setResult]=useState({});
  const[PaymentId,setPaymentId]=useState('');

  const handleChange=(e)=>{
    setPaymentId(e.target.value);
  }

  const Search=()=>{
    axios.get(`https://localhost:44360/api/values/${PaymentId}`)
    .then((Data)=>{
      setResult(Data.data);
    })
    console.log(PaymentId);
  }
  console.log(result);
  useEffect(()=>{
    axios.get('https://localhost:44360/api/values')
    .then((Data)=>{
      setApiData(Data.data);
    })
  },[])
    return(
        <>
          <Box sx={{ display: 'flex'}}>
          <SideBar/>
            <Box component="main" sx={{ flexGrow: 1, p: 3, m: 10}}>
             <h1>Search For Payment Details</h1>
          
            <InputLabel id="demo-simple-select-standard-label">PaymentId</InputLabel>
            <Select 
                labelId="demo-simple-select-standared-label"
                id="demo-simple-select-standard"
                label="PaymentId"
                value={PaymentId}
                onChange={handleChange}
                sx={{width:'200px',mb:2}}
                >
                  {apiData.map((data,index)=>{
                    return(
                      <MenuItem key={data.PaymentId} value={data.PaymentId}>{data.PaymentId}</MenuItem>
                    )
                  })}
                </Select>

             <br/><Button variant="outlined"  onClick={Search} startIcon={<SearchIcon />}>
                  Search
            </Button>
             <br/>
             <Divider/>
             {JSON.stringify(result)!='{}' &&

              <TableContainer component={Paper} elevation={12}>
                <Table sx={{minwidth:650}} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                    <TableCell >PaymentId</TableCell>
                    <TableCell >PatientBillId</TableCell>
                      <TableCell align="center">PatientName</TableCell>
                      <TableCell align="center">Age</TableCell>
                      <TableCell align="center">Gender</TableCell>
                      <TableCell align="center">Address</TableCell>
                      <TableCell align="center">ContactNumber</TableCell>
                      <TableCell align="center">TotalBill</TableCell>
                      <TableCell align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={result.PaymentId}
                       sx={{'&:last-child td, &:last-child th':{border:0 }}}
                      >
                        <TableCell component="th" scope="row" style={{fontWeight:'bold',fontsize:'16px'}}>{result.PaymentId}</TableCell>
                        <TableCell align="center" style={{fontWeight:'bold',fontsize:'16px'}}>{result.Patient_Billid}</TableCell>
                        <TableCell align="center" style={{fontWeight:'bold',fontsize:'16px'}}>{result.PatientName}</TableCell>
                        <TableCell align="center" style={{fontWeight:'bold',fontsize:'16px'}}>{result.Age}</TableCell>
                        <TableCell align="center" style={{fontWeight:'bold',fontsize:'16px'}}>{result.Gender}</TableCell>
                        <TableCell align="center" style={{fontWeight:'bold',fontsize:'16px'}}>{result.Address}</TableCell>
                        <TableCell align="center" style={{fontWeight:'bold',fontsize:'16px'}}>{result.ContactNumber}</TableCell>
                        <TableCell align="center" style={{fontWeight:'bold',fontsize:'16px'}}>₹{result.Total_Bill}</TableCell>
                        <TableCell align="center" style={{fontWeight:'bold',fontsize:'16px'}}>{result.Status}</TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
             }

            </Box>
          </Box>
        </>
    )
}

export default SearchForDetails;