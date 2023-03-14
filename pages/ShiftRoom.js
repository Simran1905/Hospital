import React, { useState, useEffect } from 'react'
import Sidenav from '../SideNav';
import Box from '@mui/material/Box';
import { TextField, MenuItem, InputLabel, Select } from '@mui/material';
import axios from 'axios';
import swal from 'sweetalert';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

const ShiftRoom = () => {
  const Navigate=useNavigate();
  const [pid, setPid] = useState(" ");
  const [click, setClick] = useState(false);
  const [result, setResult] = useState({});
  const [room, setRoom] = useState([]);
  const [type, setType] = useState(' ');
  const [id,setId]=useState(' ');

  useEffect(() => {
    axios.get('https://localhost:44360/api/Room/')
      .then((Data) => {
        setRoom(Data.data);
      })
  }, [])

  
  const handleChange=(e)=>{
    setId(e.target.value);
  }
  const value={...result,Room_Id:id,Room_Type:type};

  console.log(type,id,value);
  const Search = () => {
    const id = parseInt(pid);
    setClick(true);

    axios.get(`https://localhost:44360/api/RoomShift/${id}`)
      .then((Data) => {
        setResult(Data.data);
        setType(Data.data.Room_Type);
        setId(Data.data.Room_Id);
      }).catch(() => {
        setResult({});
      })
}
  const handleSubmit=(e)=>{
       e.preventDefault();
       axios.put(`https://localhost:44360/api/RoomShift/${result.Assignment_no}`,value).then(()=>{
        swal("Shifted!", "Room has been Shifted", "success").then(()=>{
          Navigate("/ViewRoom");
        })});     
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3, m: 10 }}>
          <h1>Shift Patient Room </h1>
          <TextField
            value={pid}
            id="outlined-basic"
            name="type"
            autoComplete='off'
            label="Enter Assignment No."
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={(e) => { setPid(e.target.value) }}
          />

          <IconButton type="button" onClick={Search} sx={{ mt: 1 }} aria-label="search">
            <SearchIcon />
          </IconButton>

          <Divider />
          {JSON.stringify(result) === '{}' && click && <h1>Result Not found</h1>}
          {JSON.stringify(result) !== '{}' && click && <Box component="main" sx={{ flexGrow: 1, p: 3, m: 4 }}>
            <form >
              <Stack spacing={2} sx={{ width: '50%' }}>

                <TextField
                  disabled
                  value={result.Patient_Name}
                  name="type"
                  autoComplete='off'
                  label="Patient Name"
                  variant="outlined"
                  id="outlined-disabled"
                />
                <TextField
                  disabled
                  value={result.Doctor_Name}
                  name="noOfRoom"
                  autoComplete='off'
                  label="Doctor Name"
                  variant="outlined"
                  id="outlined-disabled"
                />
                <TextField
                  disabled
                  value={result.Patient_Condition}
                  name="noOfRoom"
                  autoComplete='off'
                  label="Patient Condition"
                  variant="outlined"
                  id="outlined-disabled"
                />
                <InputLabel id="demo-simple-select-standard-label">Room Type</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Room Type"
                  value={id}
                  name={id.toString()}
                  onChange={handleChange}
                  sx={{ width: '200px', mb: 2 }}
                >
                  {room.map((data, index) => {
                    return (
                      <MenuItem key={data.Room_id} onClick={()=>setType(data.Room_Type)} value={data.Room_id}>{data.Room_Type}</MenuItem>
                    )
                  })}

                </Select>
                <Button type="submit" onClick={handleSubmit} variant="contained">Shift</Button>

              </Stack>
            </form>
          </Box>

          }


        </Box>
      </Box>
    </>
  )
}

export default ShiftRoom;