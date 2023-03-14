import React from 'react'
import { Link } from 'react-router-dom';
import "./MainPage.css";
import Container from '@mui/material/Container';
import { Box, Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MedicationIcon from '@mui/icons-material/Medication';
import { CardActionArea, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainMenu = () => {
    const Navigate = useNavigate();
    return (
        <>
            <div className="nav portal">
                <div className="container">
                    <div className="wrapper_nav_div"><img src="images/Hospital-1.png" loading="lazy" width="250" sizes="120px" alt="" className="logo_icon" />
                        <Button variant="outlined" onClick={() => { Navigate('/') }}>Logout</Button>
                    </div>
                </div>
            </div>
            <Container sx={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center', }}>

                <Grid
                    container
                    spacing={3}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-evenly"
                    style={{ minHeight: '100vh' }}
                >

                    <Grid item xs={3} >
                        <Card sx={{ display: 'flex', justifyContent: 'center', height: "230px" }} component={Paper} elevation={24}>
                            <Link to="/Doctor" style={{ textDecoration: 'none', color: 'black' }}>
                                <CardActionArea>
                                    <CardContent >
                                        <img src="images/doctor.jpg" width="160px" alt="" className="icon" />
                                        <Typography gutterBottom variant="h5" component="div">
                                            Doctor Management
                                        </Typography>

                                    </CardContent>

                                </CardActionArea>
                            </Link>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card sx={{ display: 'flex', justifyContent: 'center', height: "230px" }} component={Paper} elevation={24}>
                            <Link to="/ViewRoom" style={{ textDecoration: 'none', color: 'black' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <img src="images/room.jpg" width="300px" height="170px" alt="" className="icon" />
                                        <Typography gutterBottom variant="h5" component="div">
                                            Room Management
                                        </Typography>
                                    </CardContent>

                                </CardActionArea>
                            </Link>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card sx={{ display: 'flex', justifyContent: 'center', height: "230px" }} component={Paper} elevation={24}>
                            <Link to="/ViewPatient" style={{ textDecoration: 'none', color: 'black' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <img src="images/patient.jpg" width="300px" height="170px" alt="" className="icon" />
                                        <Typography gutterBottom variant="h5" component="div">
                                            Patient Management
                                        </Typography>
                                    </CardContent>

                                </CardActionArea>
                            </Link>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card sx={{ display: 'flex', justifyContent: 'center', height: "230px" }} component={Paper} elevation={24}>
                            <Link to="/ViewAssignment" style={{ textDecoration: 'none', color: 'black' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <img src="images/assignment.jpg" width="300px" height="170px" alt="" className="icon" />
                                        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "18px" }}>
                                            Room & Doctor Assignment
                                        </Typography>
                                    </CardContent>

                                </CardActionArea>
                            </Link>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card sx={{ display: 'flex', justifyContent: 'center', height: "230px" }} component={Paper} elevation={24}>
                            <Link to="/GenerateBill" style={{ textDecoration: 'none', color: 'black' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <img src="images/bill.jpg" width="300px" height="170px" alt="" className="icon" />
                                        <Typography gutterBottom variant="h5" component="div">
                                            Generate Bill
                                        </Typography>
                                    </CardContent>

                                </CardActionArea>
                            </Link>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card sx={{ display: 'flex', justifyContent: 'center', height: "230px" }} component={Paper} elevation={24}>
                            <Link to="/report" style={{ textDecoration: 'none', color: 'black' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <img src="images/report.jpg" width="300px" height="170px" alt="" className="icon" />
                                        <Typography gutterBottom variant="h5" component="div">
                                            Manage Reports
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                        </Card>
                    </Grid>
                </Grid>

            </Container>

        </>
    )
}

export default MainMenu;