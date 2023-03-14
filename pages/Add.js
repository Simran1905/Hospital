import React,{useEffect} from 'react'
import Sidenav from '../SideNav';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import { InputAdornment, TextField } from '@mui/material';
import * as yup from 'yup';
import swal from 'sweetalert';
import {useFormik} from 'formik';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const Add= ({id}) => {
  const Navigate=useNavigate();
  const InitialValues={
    Room_id:" ",
    Room_Type:" ",
    No_Of_Rooms:" ",
    Rates_Per_Day:" "
  }

  useEffect(() => {
    axios.get(`https://localhost:44360/api/Room/${id}`)
  .then((Data)=>{
      InitialValues.Room_id=Data.data.Room_id;
      InitialValues.Room_Type=Data.data.Room_Type;
      InitialValues.No_Of_Rooms=Data.data.No_Of_Rooms;
      InitialValues.Rates_Per_Day=Data.data.Rates_Per_Day;
  })
  },[])

  const validationSchema=yup.object({
    Room_Type:yup.string().required("Room Type is required").matches(/^[A-Z?!\sa-z]+$/, "Invalid Type"),
    No_Of_Rooms: yup.number().min(10,"minimum is 10").max(50,"maximum is 50").required("Enter Between 10 - 50"),
    Rates_Per_Day:yup.number().min(500).max(10000).required("Enter Room Charges")
  })

  const formik=useFormik({
    initialValues:InitialValues,
    onSubmit:(values)=>{
      console.log(values);
      axios.put(`https://localhost:44360/api/Room/${id}`,values).then(()=>{
        swal("Success!", "Details have been Added", "success").then(function () {
          Navigate("/ViewRoom");
        }); 
      
        })
    },
    validationSchema:validationSchema
  })
  return (
    <>
  
      
       <Box component="main" sx={{ flexGrow: 1 ,m:3}}>
       <form onSubmit={formik.handleSubmit} >
          <Stack spacing={2} sx={{ width: '50%' }}>
            
            <TextField 
              
              value={formik.values.Room_Type} 
              onChange={formik.handleChange}
              name="Room_Type"  
              autoComplete='off'
              label="Room Type" 
              hiddenLabel
              id="filled-hidden-label-normal"
              variant="filled"
              error={formik.touched.Room_Type && Boolean(formik.errors.Room_Type)}
              helperText={formik.touched.Room_Type && formik.errors.Room_Type}
              onBlur={formik.handleBlur}
              />
            <TextField 
              value={formik.values.No_Of_Rooms} 
              onChange={formik.handleChange}
              id="outlined-basic" 
              name="No_Of_Rooms" 
              autoComplete='off'
              label="Number Of Room" 
              variant="outlined" 
              error={formik.touched.No_Of_Rooms && Boolean(formik.errors.No_Of_Rooms)}
              helperText={formik.touched.No_Of_Rooms && formik.errors.No_Of_Rooms}
              onBlur={formik.handleBlur}
              />
            <TextField 
              value={formik.values.Rates_Per_Day} 
              autoComplete='off'
              onChange={formik.handleChange}
              InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }} 
              id="outlined-basic"  
              name="Rates_Per_Day"  
              label="Rate per Day" 
              variant="outlined"
              error={formik.touched.Rates_Per_Day && Boolean(formik.errors.Rates_Per_Day)}
              helperText={formik.touched.Rates_Per_Day && formik.errors.Rates_Per_Day}
              onBlur={formik.handleBlur} />
            <Button type="submit" variant="contained">Save</Button>
           
          </Stack>
          </form>
       </Box>
  
    </>
   )
}

export default Add