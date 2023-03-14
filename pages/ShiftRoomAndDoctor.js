import React from 'react'
import Box from '@mui/material/Box';
import SideMenu from '../SideMenu';
const ShiftRoomAndDoctor = () => {
  return (
    <>
     <Box sx={{ display: 'flex' }}>
       <SideMenu/>
      
       <Box component="main" sx={{ flexGrow: 1, p: 3,m:10 }}>
       <h1>Shift Patient Room </h1>
       </Box>
     </Box>
    </>
   )
}

export default ShiftRoomAndDoctor