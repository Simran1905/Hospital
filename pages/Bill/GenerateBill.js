import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { InputAdornment, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Side from "../../Side";

const GenerateBill = ({setData,Details}) => {
  const Navigate=useNavigate();
  const [Ano,setAno]=useState('');
  const [result, setResult] = useState({});
  const [medicine,setMedicine]=useState('');
  const [date,setDate]=useState('');
  const [Bill,setBill]=useState({})
  
  const Search=()=>{
    axios.get(`https://localhost:44360/api/AssignRoomAndDoctor/${Ano}`)
    .then((Data)=>{
     setResult(Data.data);
    })
    console.log(result);
  }

  //const [Room_Id,Patient_Id,Admission_Date,Assignment_no,Doctor_Name,Doctor_Id,Patient_Name,Room_Type]={...result};
 
  const Submit=(e)=>{
    e.preventDefault();
    const values={
      "Rid":result.Room_Id,
      "Pid":result.Patient_Id,
      "Admission_Date":result.Admission_Date,
      "Aid":result.Assignment_no,
      "Doctor_Name":result.Doctor_Name,
      "Did":result.Doctor_Id,
      "Patient_Name":result.Patient_Name,
      "Room_Type":result.Room_Type,
      "Bill_Date":date,
      "Medicine_Bill":medicine,
      "Status":"Pending"
    };
    axios.post('https://localhost:44360/api/Bill',values).then(()=>{
        console.log(values.Bill_Date);
        Navigate("/ViewBill");
      });
      axios.get(`https://localhost:44360/api/Bill/${values.Aid}`).then((Data)=>{
        
        setBill(Data.data);
        console.log(Bill);
      });
  }


 
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Side />
        <Box component="main" sx={{ flexGrow: 1, p: 3, m: 10 }}>
          <h1>Generate Bill</h1>
          <TextField
            value={Ano}
            id="outlined-basic"
            name="type"
            autoComplete="off"
            label="Assignment_No."
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={(e) => {
              setAno(e.target.value);
            }}
          />

          <IconButton
            type="button"
            onClick={Search}
            sx={{ mt: 1 }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>

          <Divider />
          {JSON.stringify(result) != '{}'  &&
          
          <form onSubmit={Submit}>
          <Stack spacing={2} sx={{ width: '50%', mt:'20px'}}>
            
            <TextField 
             hiddenLabel 
             id="filled-hidden-label-normal"
             variant="filled"
              value={result.Patient_Name}
              label="Patient Name" 
              />
            <TextField 
             hiddenLabel 
             id="filled-hidden-label-normal"
             variant="filled"
              value={result.Doctor_Name} 
              label="Doctor Name" 
              />
             <TextField 
              value={result.Room_Type} 
              label="Room Type" 
              hiddenLabel 
              id="filled-hidden-label-normal"
              variant="filled" 
              />
               <TextField 
              value={result.Admission_Date} 
              label="Admission Date" 
              hiddenLabel 
              id="filled-hidden-label-normal"
              variant="filled"
              />
            <TextField 
              value={medicine} 
              label="Medicine Bill" 
              variant="outlined" 
              onChange={(e)=>setMedicine(e.target.value)}
              />
              <TextField 
              value={date} 
              label="Bill Date" 
              variant="outlined" 
              onChange={(e)=>setDate(e.target.value)}
              />
            <Button type="submit" variant="contained">Generate Bill</Button>
           
          </Stack>
          </form>}
         
          
        </Box>
      </Box>
    </>
  );
};

export default GenerateBill;
