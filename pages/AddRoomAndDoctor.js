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
import SideMenu from "../SideMenu";

const AddRoomAndDoctor = () => {
  const Navigate=useNavigate();
  const [pid, setPid] = useState(" ");
  const [result, setResult] = useState({});
  const [room, setRoom] = useState([]);
  const [Rid, setRid] = useState(" ");
  const [doctor, setDoctor] = useState([]);
  const [Did, setDid] = useState(" ");
  const [roomType,setroomType]=useState(" ");
  const [doctorName,setdoctorName]=useState(" ");

  
  const handleChange=(e)=>{
    setRid(e.target.value);
  }
  const handleChange2=(e)=>{
    setDid(e.target.value);
  }
  

  //Room Data
  useEffect(() => {
    axios.get("https://localhost:44360/api/Room").then((Data) => {
      setRoom(Data.data);
    });
  }, []);

  //Doctor Data
  useEffect(() => {
    axios.get("https://localhost:44360/api/Doctor").then((Data) => {
      setDoctor(Data.data);
    });
  }, []);


  const Search = () => {
    const id = parseInt(pid);

    axios
      .get(`https://localhost:44360/api/PatientWebAPI/${id}`)
      .then((Data) => {
        setResult(Data.data);
        
      })
      .catch(() => {
        setResult({});
      });
  };
  
  const {Patient_Id,Patient_Condition,Patient_Name} = result;
 
  const submit=(e)=>{
    e.preventDefault();
    const value={
      "Room_Id":Rid,
      "Patient_Id":Patient_Id,
      "Doctor_Name":doctorName,
      "Patient_Condition":Patient_Condition,
      "Doctor_Id":Did,
      "Patient_Name":Patient_Name,
      "Room_Type":roomType
    }

    axios.post('https://localhost:44360/api/AssignRoomAndDoctor',value).then(()=>{
      swal("Assign!", "Room And Doctor has been assigned", "success").then(function () {
        Navigate("/ViewAssignment");
      }); 
    
      }).catch(() => {
        swal("Sorry!", "No Room Available", "Error");
      })
   
    
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <Box component="main" sx={{ flexGrow: 1, p: 3, m: 10 }}>
          <h1>Assign Room Details</h1>
          <TextField
            value={pid}
            id="outlined-basic"
            name="type"
            autoComplete="off"
            label="Enter Patient Id."
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={(e) => {
              setPid(e.target.value);
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
          {JSON.stringify(result) === "{}" && <h1>Result Not found</h1>}
          {JSON.stringify(result) !== "{}" && (
            <Box component="main" sx={{ flexGrow: 1, p: 3, m: 4 }}>
              <form>
                <Stack spacing={2} sx={{ width: "50%" }}>
                  <TextField
                    disabled
                    value={result.Patient_Name}
                    name="type"
                    autoComplete="off"
                    label="Patient Name"
                    variant="outlined"
                    id="outlined-disabled"
                  />
                  <TextField
                    disabled
                    value={result.Patient_Condition}
                    name="noOfRoom"
                    autoComplete="off"
                    label="Patient Condition"
                    variant="outlined"
                    id="outlined-disabled"
                  />
                  <TextField
                    disabled
                    value={result.Patient_Condition}
                    name="noOfRoom"
                    autoComplete="off"
                    label="Patient Condition"
                    variant="outlined"
                    id="outlined-disabled"
                  />
                  <InputLabel id="demo-simple-select-standard-label">
                    Room Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Room Type"
                    value={Rid}
                    onChange={handleChange}
                    sx={{ width: "100%", mb: 2 }}
                  >
                    {room.map((data, index) => {
                      return (
                        <MenuItem key={data.Room_id} onClick={()=>{setroomType(data.Room_Type)}} value={data.Room_id}>
                          {data.Room_Type}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <InputLabel id="demo-simple-select-standard-label">
                    Doctor Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Room Type"
                    value={Did}
                    onChange={handleChange2}
                    sx={{ width: "100%", mb: 2 }}
                  >
                    {doctor.map((data, index) => {
                      return (
                        <MenuItem key={data.Doctor_Id} onClick={()=>{setdoctorName(data.Doctor_Name)}} value={data.Doctor_Id}>
                            Dr.{data.Doctor_Name}________Spec in:{data.Speciliazation}    
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Button type="submit" onClick={submit} variant="contained" >ADD</Button>
                </Stack>
                
              </form>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AddRoomAndDoctor;
