import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {Stack,Button, Paper} from '@mui/material';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Box from "@mui/material/Box";




 const Payout =({billId}) =>{
    const Navigate=useNavigate();
    const [data, setData] = useState({});
    const [Status, setStatus] = useState("Paid");
    
    useEffect(() => {
        axios.get(`https://localhost:44360/api/Bill/${billId}`)
          .then((Data) => {
            setData(Data.data);
          })
      }, [])

    const payments = [
        { name: 'Card type', detail: 'Visa' },
        { name: 'Card holder', detail: data.Patient_Name },
        { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
      ];

      const submit=(e)=>{
        e.preventDefault();
        const values={
         "Patient_Bill_Id":billId,
         "Status":Status
        }
        axios.post(`https://localhost:44360/api/Values/`,values).then(()=>{
            swal("Success!", "Payment have been Made", "success").then(function () {
              Navigate("/ViewBill");
            }); 
          
            })
          
     }
   

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3, m: 10 }}>
    <React.Fragment style={{fontWeight:'bold', fontSize:'16px'}}>
        <Stack sx={{width:'500px', display:'flex', justifyContent:'center', alignItem:"center", ml:50,mt:15}} >
      <Typography variant="h6" gutterBottom>
        <h1>Bill Summary</h1>
      </Typography>
      <List disablePadding>
      <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText sx={{ fontWeight: 700 }} primary="Patient Name"/>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>{data.Patient_Name}</Typography>
          </ListItem>
          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Doctor Name"/>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>{data.Doctor_Name}</Typography>
          </ListItem>
          
          <ListItem  sx={{ py: 1, px: 0 , fontSize:"36px"}}>
            <ListItemText primary="Room Bill" secondary={data.Room_Type} />
            <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{data.Room_Bill}</Typography>
          </ListItem>
          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Doctor Bill"/>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{data.Doctor_Bill}</Typography>
          </ListItem>
          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Medicine Bill"  />
            <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{data.Medicine_Bill}</Typography>
          </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total Bill" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          ₹{data.Total_Bill}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
             <Grid item xs={6}>
                <Button type="submit" onClick={submit} variant="contained">Pay</Button>
                </Grid>
          </Grid>

        </Grid>
      </Grid>
      </Stack>
    </React.Fragment>
    </Box>
    </Box>
  );
}

export default Payout;