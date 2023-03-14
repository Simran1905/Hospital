import React,{useState,useEffect}from 'react'
import Box from '@mui/material/Box';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import SideMenu from '../SideMenu';

const SearchRoomAndDoctor = () => {
  const[apiData,setApiData]=useState([]);
  const[result,setResult]=useState({});
  const [type,setType]=useState('');

  const handleChange=(e)=>{
    setType(e.target.value);
  }
  
  const Search=()=>{
    axios.get(`https://localhost:44360/api/AssignRoomAndDoctor/${type}`)
    .then((Data)=>{
     setResult(Data.data);
    })
    console.log(type);
  }
  console.log(result);
  useEffect(() => {
    axios.get('https://localhost:44360/api/AssignRoomAndDoctor')
    .then((Data)=>{
      setApiData(Data.data);
    })
   },[])

  return (
    <>
     <Box sx={{ display: 'flex' }}>
       <SideMenu/>
      
       <Box component="main" sx={{ flexGrow: 1, p: 3,m:10 }}>
       <h1>Search Room And Doctor Details</h1>
       <InputLabel id="demo-simple-select-standard-label">Patient Name</InputLabel>
       <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Patient_Name"
          value={type}
          onChange={handleChange}
          sx={{width:'200px', mb:2}}
        >
        {apiData.map((data,index)=>{
            return(
          <MenuItem key={data.Assignment_no} value={data.Assignment_no}>{data.Patient_Name}</MenuItem>
          )
          })}
        </Select>

      <IconButton type="button" onClick={Search} sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      
      <Divider/>
      {JSON.stringify(result) != '{}' && 
      
      <TableContainer component={Paper} elevation={12}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Assignment_no</TableCell>
            <TableCell align="center">Patient Name</TableCell>
            <TableCell align="center">Patient Condition</TableCell>
            <TableCell align="center">Patient Id</TableCell> 
            <TableCell align="center">Doctor Name</TableCell>
            <TableCell align="center">Doctor Id</TableCell>
            <TableCell align="center">Room Type</TableCell>
            <TableCell align="center">Room Id</TableCell>
            <TableCell align="center">Admission Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key={result.Assignment_no}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{fontWeight:'bold', fontSize:'16px'}}>
               {result.Assignment_no}
              </TableCell>
              <TableCell align="center" style={{fontWeight:'bold', fontSize:'16px'}} >{result.Patient_Name}</TableCell>
              <TableCell align="center" style={{fontWeight:'bold', fontSize:'16px'}} >{result.Patient_Condition}</TableCell>
              <TableCell align="center" style={{fontWeight:'bold', fontSize:'16px'}} >{result.Patient_Id}</TableCell>
              <TableCell align="center" style={{fontWeight:'bold', fontSize:'16px'}}>{result.Doctor_Name}</TableCell>
              <TableCell align="center" style={{fontWeight:'bold', fontSize:'16px'}}>{result.Doctor_Id}</TableCell>
              <TableCell align="center" style={{fontWeight:'bold', fontSize:'16px'}}>{result.Room_Type}</TableCell>
              <TableCell align="center" style={{fontWeight:'bold', fontSize:'16px'}}>{result.Room_Id}</TableCell>
              <TableCell align="center" style={{fontWeight:'bold', fontSize:'16px'}}>{result.Admission_Date}</TableCell>
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

export default SearchRoomAndDoctor