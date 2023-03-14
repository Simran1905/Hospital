// import React,{useEffect} from 'react';
// import {Box,TextField,Button} from '@mui/material'
// import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
// import SideBar from '../SideBar';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import swal from 'sweetalert';
// import { useFormik } from 'formik';
// import * as yup from 'yup';


// const validationSchema=yup.object({
//   Patient_Billid:yup.number().required("Patient_Billid is required"),
//   PatientName:yup.string().required("PatientName is required").matches(/^[A-Z?!\sa-z]+$/,"Invalid Type"),
//   Age:yup.number().min(1,"Minimum is 1").max(100,"Maximum is 100").required("Enter Between 1-100"),
//   Gender:yup.string().required("Gender is required"),
//   Address:yup.string().required("Address is required"),
//   ContactNumber:yup.number().required("ContactNumber is required"),
//   status:yup.string().required("Status is required")
// })

// const  GeneratePayment=()=> {
//   const Navigate=useNavigate();
//   const formik=useFormik({
//     initialValues:{
//       Patient_Billid:"",
//       PatientName:"",
//       Age:"",
//       Gender:"",
//       Address:"",
//       ContactNumber:"",
//       status:""
//   },
//   onSubmit:(values)=>{
//     console.log(JSON.stringify(values));
//     axios.post('https://localhost:44360/api/values',values).then(()=>{
//       swal("Added!","Details have been added", "success").then(function(){
//         Navigate("/ViewForDetails");
//       });
//     })
//   },
//   validationSchema:validationSchema

//   })  

//     return (
//       <>
//      <Box sx={{ display: 'flex'}}>
//      <SideBar/>
//         <Box component={Paper} sx={{ flexGrow: 1, p: 3, m: 10}}>
//         <h1>Generate Payment</h1><br/> 
//         <form onSubmit={formik.handleSubmit}>
//           <Stack spacing={2} sx={{ width: '50%' }}>
//         <h2>Patient's Details</h2>

//         <TextField
//         value={formik.values.Patient_Billid}
//         onChange={formik.handleChange}
//         id="outlined-basic"
//         name="Patient_Billid"
//         autoComplete='off'
//         label="PatientBillId"
//         varient="outlined"
//         error={formik.touched.Patient_Billid && Boolean(formik.errors.Patient_Billid)}
//         helperText={formik.touched.Patient_Billid && formik.errors.Patient_Billid}
//         onBlur={formik.handleBlur}
//         />
//         <TextField
//         value={formik.values.PatientName}
//         onChange={formik.handleChange}
//         id="outlined-basic"
//         name="PatientName"
//         autoComplete='off'
//         label="PatientName"
//         varient="outlined"
//         error={formik.touched.PatientName && Boolean(formik.errors.PatientName)}
//         helperText={formik.touched.PatientName && formik.errors.PatientName}
//         onBlur={formik.handleBlur}
//         />
//         <TextField
//         value={formik.values.Age}
//         onChange={formik.handleChange}
//         id="outlined-basic"
//         name="Age"
//         autoComplete='off'
//         label="Age"
//         varient="outlined"
//         error={formik.touched.Age && Boolean(formik.errors.Age)}
//         helperText={formik.touched.Age && formik.errors.Age}
//         onBlur={formik.handleBlur}
//         />
//         <TextField
//         value={formik.values.Gender}
//         onChange={formik.handleChange}
//         id="outlined-basic"
//         name="Gender"
//         autoComplete='off'
//         label="Gender"
//         varient="outlined"
//         error={formik.touched.Gender && Boolean(formik.errors.Gender)}
//         helperText={formik.touched.Gender && formik.errors.Gender}
//         onBlur={formik.handleBlur}
//         />
//       <TextField
//         value={formik.values.Address}
//         onChange={formik.handleChange}
//         id="outlined-basic"
//         name="Address"
//         autoComplete='off'
//         label="Address"
//         varient="outlined"
//         error={formik.touched.Address && Boolean(formik.errors.Address)}
//         helperText={formik.touched.Address && formik.errors.Address}
//         onBlur={formik.handleBlur}
//         />
//         <TextField
//         value={formik.values.ContactNumber}
//         onChange={formik.handleChange}
//         id="outlined-basic"
//         name="ContactNumber"
//         autoComplete='off'
//         label="ContactNumber"
//         varient="outlined"
//         error={formik.touched.ContactNumber && Boolean(formik.errors.ContactNumber)}
//         helperText={formik.touched.ContactNumber && formik.errors.ContactNumber}
//         onBlur={formik.handleBlur}
//         />

//         <TextField
//         value={formik.values.Status}
//         onChange={formik.handleChange}
//         id="outlined-basic"
//         name="status"
//         autoComplete='off'
//         label="status"
//         varient="outlined"
//         error={formik.touched.status && Boolean(formik.errors.status)}
//         helperText={formik.touched.status && formik.errors.status}
//         onBlur={formik.handleBlur}
//         />
//         <Button type="Submit" variant='contained'>Add</Button>
//     </Stack> 
//     </form>
//         </Box>
//      </Box>

//       </>
//     );
//   }

//   export default GeneratePayment;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { InputAdornment, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import Side from "../Side";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


const GeneratePayment = ({ Bill_Id }) => {
  const [data, setData] = useState({});
  const [Status, setStatus] = useState(" ");
  useEffect(() => {
    axios.get(`https://localhost:44360/api/Bill/${Bill_Id}`)
      .then((Data) => {
        setData(Data.data);
      })
  }, [])

  const handleChange=(e)=>{
     setStatus(e.target.value);
  }

  const submit=(e)=>{
     e.preventDefault();
     const values={
      "Patient_Bill_Id":Bill_Id,
      "Status":Status
     }
     axios.post(`https://localhost:44360/api/Values/`,values);
       
  }


  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Side />
        <Box component="main" sx={{ flexGrow: 1, p: 3, m: 10 }}>
          <h1>Payout Window</h1>
          <Divider />
          <form>
            <Stack spacing={2} sx={{ width: "50%", mt: 5 }}>
              <TextField
               autoFocus
                value={data.Patient_Name}
                name="Patient_Name"
                    autoComplete="off"
                    label="Patient_Name"
                    hiddenLabel
              id="filled-hidden-label-normal"
              variant="filled"
              />
              <TextField
              autoFocus
                value={data.Doctor_Name}
                name="Doctor_Name"
                    autoComplete="off"
                    label="Doctor_Name"
                    hiddenLabel
              id="filled-hidden-label-normal"
              variant="filled"
              />
              <TextField
                autoFocus
                value={data.Room_Bill}
                name="Room_Bill"
                autoComplete="off"
                label="Room_Bill"
                hiddenLabel
              id="filled-hidden-label-normal"
              variant="filled"
              />
              <TextField
                autoFocus
                value={data.Doctor_Bill}
                name="Doctor_Bill"
                autoComplete="off"
                label="Doctor_Bill"
                hiddenLabel
                id="filled-hidden-label-normal"
                variant="filled"
              />
              <TextField
             
                autoFocus
                value={data.Medicine_Bill}
                name="Medicine_Bill"
                autoComplete="off"
                label="Medicine_Bill"
                hiddenLabel
                id="filled-hidden-label-normal"
                variant="filled"
              />
              <TextField
                
                autoFocus 
                value={data.Total_Bill}
                name="Total_Bill"
                autoComplete="off"
                label="Total_Bill"
                hiddenLabel
              id="filled-hidden-label-normal"
              variant="filled"
              />
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Status"
                value={Status}
                onChange={handleChange}
                sx={{ width: '200px', mb: 2 }}
              >
                 <MenuItem value="Paid">Paid</MenuItem>
                 <MenuItem value="Pending">Pending</MenuItem>
              </Select>
              <Button type="submit" onClick={submit} variant="contained">Proceed</Button>
            </Stack>
          </form>
        </Box>
      </Box>

    </>
  )

}
export default GeneratePayment;