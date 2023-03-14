import React,{useState,useEffect}from 'react'
import Sidenav from '../SideNav';
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
import Add from './Add';

const AddRoom = () => {
  const[apiData,setApiData]=useState([]);
  const[result,setResult]=useState({});
  const [type,setType]=useState('');

  const handleChange=(e)=>{
    setType(e.target.value);
  }
  
  const Search=()=>{
    axios.get(`https://localhost:44360/api/Room/${type}`)
    .then((Data)=>{
     setResult(Data.data);
    })
    console.log(type);
  }
  console.log(result);
  useEffect(() => {
    axios.get('https://localhost:44360/api/Room')
    .then((Data)=>{
      setApiData(Data.data);
    })
   },[])

  return (
    <>
     <Box sx={{ display: 'flex' }}>
       <Sidenav/>
      
       <Box component="main" sx={{ flexGrow: 1, p: 3,m:10 }}>
       <h1>Add Room Details</h1>
       <InputLabel id="demo-simple-select-standard-label">Room Type</InputLabel>
       <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Room Type"
          value={type}
          onChange={handleChange}
          sx={{width:'200px', mb:2}}
        >
        {apiData.map((data,index)=>{
            return(
          <MenuItem key={data.Room_id} value={data.Room_id}>{data.Room_Type}</MenuItem>
          )
          })}
        </Select>

      <IconButton type="button" onClick={Search} sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      
      <Divider/>
      {JSON.stringify(result) != '{}' && 
      
      <Add id={type}/>
      
      }
       </Box>
    
     </Box>
    </>
   )
}

export default AddRoom