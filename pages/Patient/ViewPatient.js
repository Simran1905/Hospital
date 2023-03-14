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
import PatientNav from '../../PatientNavigate';

const ViewPatients = ({setId,id}) => {
  const[apiData,setApiData]=useState([]);

  useEffect(() => {
    axios.get('https://localhost:44360/api/PatientWebAPI')
    .then((Data)=>{
     
      setApiData(Data.data);
      console.log(Data.data)
    })
   },[])

   const getData=()=>{
    axios.get('https://localhost:44360/api/PatientWebAPI')
    .then((Data)=>{
     console.log(Data )
      setApiData(Data.data);
    })
   }

   const getId=(ID)=>{
    setId(ID);
    console.log(id);
   }
   const Delete=(id)=>{
    axios.delete(`https://localhost:44360/api/PatientWebAPI/${id}`)
    .then(()=>{
      getData();
    })
   }

  return (
   <>
    <Box sx={{ display: 'flex' }}>
      <PatientNav/>
     
      <Box component="main" sx={{ flexGrow: 1, p: 3,m:10 }}>
      <h1>Details of Patient</h1>
      <TableContainer component={Paper} elevation={12}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:'bold'}}>Patient_Id</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Patient_Name</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Gender</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Age</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Patient_Address</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Contact_No</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Guardian_Name</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Emergency_contact_no</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Nature_Of_Disease</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Patient_Condition</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Doctor_Name</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Room_Type</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
        {apiData.map((data,index)=>{
            return(
            <TableRow key={data.Patient_Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               {data.Patient_Id}
              </TableCell>
              <TableCell align="center" >{data.Patient_Name}</TableCell>
              <TableCell align="center" >{data.Gender}</TableCell>
              <TableCell align="center" >{data.Age}</TableCell>
              <TableCell align="center">{data.Patient_Address}</TableCell>
              <TableCell align="center">{data.Contact_No}</TableCell>
              <TableCell align="center">{data.Guardian_Name}</TableCell>
              <TableCell align="center">{data.Emergency_contact_no}</TableCell>
              <TableCell align="center">{data.Nature_Of_Disease}</TableCell>
              <TableCell align="center">{data.Patient_Condition}</TableCell>
              <TableCell align="center">{data.Doctor_Name}</TableCell>
              <TableCell align="center">{data.Room_Type}</TableCell>
              
              
              <TableCell align="right" >
                <Button variant="contained" onClick={()=>Delete(data.Patient_Id)} color="error" startIcon={<DeleteIcon />}>Delete</Button>
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

export default ViewPatients