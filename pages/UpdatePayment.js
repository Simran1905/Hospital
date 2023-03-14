import React,{useEffect} from 'react';
import {Box,TextField,Button} from '@mui/material'
import Stack from '@mui/material/Stack';
import SideBar from '../SideBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useFormik } from 'formik';
import * as yup from 'yup';

const UpdatePayment=({Pid})=>{
    const Navigate=useNavigate();
    const  InitialValues={
        PaymentId:"",
        PatientName:"",
        Age:"",
        Gender:"",
        Address:"",
        ContactNumber:"",
        Status:""
    }
    console.log(Pid);
    useEffect(()=>{
        axios.get(`https://localhost:44360/api/values/${Pid}`)
        .then((Data)=>{
            InitialValues.PaymentId=Data.data.PaymentId;
             InitialValues.PatientName=Data.data.PatientName;
             InitialValues.Age=Data.data.Age;
             InitialValues.Gender=Data.data.Gender;
             InitialValues.Address=Data.data.Address;
             InitialValues.ContactNumber=Data.data.ContactNumber;
             InitialValues.Status=Data.data.Status;
        })
    },[])

    const validationSchema=yup.object({
        
        PatientName:yup.string().required("PatientName is required").matches(/^[A-Z?!\sa-z]+$/,"Invalid Type"),
        Age:yup.number().min(1,"Minimum is 1").max(100,"Maximum is 100").required("Enter Between 1-100"),
        Gender:yup.string().required("Gender is required"),
        Address:yup.string().required("Address is required"),
        ContactNumber:yup.number().required("ContactNumber is required"),
        Status:yup.string().required("Status is required")
      })
   
      const formik=useFormik({
        initialValues:InitialValues,
        onSubmit:(values)=>{
            console.log(JSON.stringify(values),Pid);
            axios.put(`https://localhost:44360/api/values/${Pid}`,values).then(()=>{
                swal("Updated!","Details have been Updated", "success").then(function(){
                    Navigate("/ViewForDetails");
                });
            })
        },
        validationSchema:validationSchema
})
return(
    <>
    <Box sx={{display:'flex'}}>
        <SideBar/>
        <Box component="main" sx={{flexGrow:1,p:3,m:10}}>
            <h2>
                Update Payment Details
            </h2>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2} sx={{width:'50%'}}> 
        <TextField
        value={formik.values.PatientName}
        onChange={formik.handleChange}
        id="outlined-basic"
        name="PatientName"
        autoComplete='off'
        label="PatientName"
        varient="outlined"
        error={formik.touched.PatientName && Boolean(formik.errors.PatientName)}
        helperText={formik.touched.PatientName && formik.errors.PatientName}
        onBlur={formik.handleBlur}
        />
        <TextField
        value={formik.values.Age}
        onChange={formik.handleChange}
        id="outlined-basic"
        name="Age"
        autoComplete='off'
        label="Age"
        varient="outlined"
        error={formik.touched.Age && Boolean(formik.errors.Age)}
        helperText={formik.touched.Age && formik.errors.Age}
        onBlur={formik.handleBlur}
        />
        <TextField
        value={formik.values.Gender}
        onChange={formik.handleChange}
        id="outlined-basic"
        name="Gender"
        autoComplete='off'
        label="Gender"
        varient="outlined"
        error={formik.touched.Gender && Boolean(formik.errors.Gender)}
        helperText={formik.touched.Gender && formik.errors.Gender}
        onBlur={formik.handleBlur}
        />
      <TextField
        value={formik.values.Address}
        onChange={formik.handleChange}
        id="outlined-basic"
        name="Address"
        autoComplete='off'
        label="Address"
        varient="outlined"
        error={formik.touched.Address && Boolean(formik.errors.Address)}
        helperText={formik.touched.Address && formik.errors.Address}
        onBlur={formik.handleBlur}
        />
        <TextField
        value={formik.values.ContactNumber}
        onChange={formik.handleChange}
        id="outlined-basic"
        name="ContactNumber"
        autoComplete='off'
        label="ContactNumber"
        varient="outlined"
        error={formik.touched.ContactNumber && Boolean(formik.errors.ContactNumber)}
        helperText={formik.touched.ContactNumber && formik.errors.ContactNumber}
        onBlur={formik.handleBlur}
        />
        <TextField
        value={formik.values.Status}
        onChange={formik.handleChange}
        id="outlined-basic"
        name="Status"
        autoComplete='off'
        label="Status"
        varient="outlined"
        error={formik.touched.Status && Boolean(formik.errors.Status)}
        helperText={formik.touched.Status && formik.errors.Status}
        onBlur={formik.handleBlur}
        />
        <Button type="submit" variant='contained'>Update</Button>
                </Stack>
            </form>
        </Box>
    </Box>
    </>
)
}

export default UpdatePayment;