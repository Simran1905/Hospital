import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
//import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import './Styles.css'
import Col from 'react-bootstrap/Col';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Link } from "react-router-dom";




const Patient = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(false);

    const [Patient_Id, setPatient_id] = useState('')
    const [Patient_Name, setPatient_Name] = useState('')
    const [Gender, setGender] = useState('')
    const [Age, setAge] = useState('')
    const [Patient_Address, setPatient_Address] = useState('')
    const [Contact_No, setContact_No] = useState('')
    const [Guardian_Name, setGuardian_Name] = useState('')
    const [Emergency_contact_no, setEmergency_contact_no] = useState('')
    const [Nature_Of_Disease, setNature_Of_Disease] = useState('')
    const [Patient_Condition, setPatient_Condition] = useState('')


    const [EditPatient_Id, setEditPatient_id] = useState('')
    const [EditPatient_Name, setEditPatient_Name] = useState('')
    const [EditGender, setEditGender] = useState('')
    const [EditAge, setEditAge] = useState('')
    const [EditPatient_Address, setEditPatient_Address] = useState('')
    const [EditContact_No, setEditContact_No] = useState('')
    const [EditGuardian_Name, setEditGuardian_Name] = useState('')
    const [EditEmergency_contact_no, setEditEmergency_contact_no] = useState('')
    const [EditNature_Of_Disease, setEditNature_Of_Disease] = useState('')
    const [EditPatient_Condition, setEditPatient_Condition] = useState('')

    const [idError, setIdError] = useState('')
    const [patientnameError, setPatientNameError] = useState('')
    const [genderError, setGenderError] = useState('')
    const [ageError, setAgeError] = useState('')
    const [patientAddressError, setPatientAddressError] = useState('')
    const [contactnoError, setContactnoError] = useState('')
    const [guardianNameError, setGuardianNameError] = useState('')
    const [emergencycontactnoError, setEmergencycontactnoError] = useState('')
    const [natureOfDiseaseError, setNatureOfDiseaseError] = useState('')
    const [patientConditionError, setPatientConditionError] = useState('')



    const [data, setData] = useState([])

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get('https://localhost:44360/api/Patient/')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    const handleEdit = (id) => {
        
        handleShow();
        axios.get(`https://localhost:44360/api/Patient/${id}`)
        .then((result) => {
            setEditPatient_id(result.data.Patient_Id);
            setEditPatient_Name(result.data.Patient_Name);
            setEditGender(result.data.Gender);
            setEditAge(result.data.Age);
            setEditPatient_Address(result.data.Patient_Address);
            setEditContact_No(result.data.Contact_No);
            setEditGuardian_Name(result.data.Guardian_Name);
            setEditEmergency_contact_no(result.data.Emergency_contact_no);
            setEditNature_Of_Disease(result.data.Nature_Of_Disease);
            setEditPatient_Condition(result.data.Patient_Condition)
          
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete this record") === true) {
            axios.delete(`https://localhost:44360/api/Patient/${id}`)
                .then((result) => {
                    clear();
                    toast.success('Patient has been Deleted');
                    getData();
                }).catch((error) => {
                    toast.error(error);
                })

        }
        alert(id);
    }
    const handleUpdate = () => {
        const url = `https://localhost:44360/api/Patient/${EditPatient_Id}`;
        const data = {
            "Patient_Id":EditPatient_Id,
            "Patient_Name":EditPatient_Name,
            "Gender":EditGender,
            "Age":EditAge,
            "Patient_Address":EditPatient_Address,
            "Contact_No":EditContact_No,
            "Guardian_Name":EditGuardian_Name,
            "Emergency_contact_no":EditEmergency_contact_no,
            "Nature_Of_Disease":EditNature_Of_Disease,
            "Patient_Condition":EditPatient_Condition            
        }

        axios.put(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Patient has been Updated');
            }).catch((error) => {
                toast.error(error)
            })

    }
    const handleSave = () => {
        const url = 'https://localhost:44360/api/Patient/';
        const data = {
            "Patient_Id":Patient_Id,
            "Patient_Name":Patient_Name,
            "Gender":Gender,
            "Age":Age,
            "Patient_Address":Patient_Address,
            "Contact_No":Contact_No,
            "Guardian_Name":Guardian_Name,
            "Emergency_contact_no":Emergency_contact_no,
            "Nature_Of_Disease":Nature_Of_Disease,
            "Patient_Condition":Patient_Condition 
        }
    
        if (Patient_Id === '') {
            setIdError('ID is required');
        } else if (!/^\d+$/.test(Patient_Id)) {
            setIdError('ID must be a number');
        } else {
            setIdError('');
        }


        if (Patient_Name === '') {
            setPatientNameError('Patient name is required');
        }
        else if (!/^[a-zA-Z]+$/.test(Patient_Name)) {
            setPatientNameError('Patient name should contain only alphabets');
        }
        else {
            setPatientNameError('');
        }


        if (Age === '') {
            setAgeError('Patient Age is required');
        }
        else if (!/^\d+$/.test(Age)) {
            setAgeError('Patient age should be a number');
        }
        else if (Age<=0 || Age>=150) {
            setAgeError('Invalid Patient age ');
        }
        else {
            setAgeError('');
        }

        if (Patient_Address === '') {
            setPatientAddressError('Patient Address is required');
        }
        else {
            setPatientAddressError('');
        }
        if (Contact_No === '') {
            setContactnoError('Contact number cannot be empty ');
        } else if (Contact_No.length!==10) {
            setContactnoError('Contact number should have 10 digits');
        } else {
            setContactnoError('');
        }
         if (Guardian_Name === '') {
            setGuardianNameError('Guardian name is required');
        }
        else if (!/^[a-zA-Z]+$/.test(Guardian_Name)) {
            setGuardianNameError('Guardian name should contain only alphabets');
        }
        else {
            setGuardianNameError('');
        }

        if (Emergency_contact_no === '') {
            setEmergencycontactnoError('Emergency Contact number cannot be empty ');
        } else if (Emergency_contact_no.length!==10) {
            setEmergencycontactnoError('Contact number should have 10 digits');
        } else {
            setEmergencycontactnoError('');
        }
        
       
    
        if ((Patient_Id !== '') && (/^\d+$/.test(Patient_Id)) && (Patient_Name !== '') && (/^[a-zA-Z]+$/.test(Patient_Name)) && ((Age!=='')&&(!/^\d+$/.test(Age))&&(Age<=0 || Age>=150))&& (Patient_Address !== '') &&(Contact_No !== '') && (Contact_No.length==10) && ((Guardian_Name !== '') &&(!/^[a-zA-Z]+$/.test(Guardian_Name)))&&((Emergency_contact_no !== '')&&(Emergency_contact_no.length==10))&&(Patient_Id !== '') && (/^\d+$/.test(Patient_Id))){

        
            axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Patient has been added');
            }).catch((error) => {
                toast.error(error)
            })
    }

    const clear = () => {
        setPatient_id('');
        setPatient_Name('');
        setGender('');
        setAge('');
        setPatient_Address('');
        setContact_No('');
        setGuardian_Name('');
        setEmergency_contact_no('');
        setNature_Of_Disease('');
        setPatient_Condition('');
        setEditPatient_id('');
        setEditPatient_Name('');
        setEditGender('');
        setEditAge('');
        setEditPatient_Address('');
        setEditContact_No('');
        setEditGuardian_Name('');
        setEditEmergency_contact_no('');
        setEditNature_Of_Disease('');
        setEditPatient_Condition(''); 

    }


    return (
        <Fragment>
            <ToastContainer />
            <Container>
            <h1>Doctor Details Management</h1>
                    <div className="first">

                <Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter Patient_id" value={Patient_Id} onChange={(e) => setPatient_id(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter Patient_Name" value={Patient_Name} onChange={(e) => setPatient_Name(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter Gender" value={Gender} onChange={(e) => setGender(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter Age" value={Age} onChange={(e) => setAge(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Patient_Address" value={Patient_Address} onChange={(e) => setPatient_Address(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter Contact_No" value={Contact_No} onChange={(e) => setContact_No(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter Guardian_Name" value={Guardian_Name} onChange={(e) => setGuardian_Name(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter Emergency_contact_no" value={Emergency_contact_no} onChange={(e) => setEmergency_contact_no(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter Nature_Of_Disease" value={Nature_Of_Disease} onChange={(e) => setNature_Of_Disease(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter Patient_Condition" value={Patient_Condition} onChange={(e) => setPatient_Condition(e.target.value)} /></Col>
                    <Col><button  onClick={() => handleSave()}>Add Patient</button></Col>
                    <br/>
                    <br/>
                    <Col><Link to={'/dashboard'}><button>Back to Home</button></Link></Col>
                </Col>
                </div>
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                      
                        <th>Patient_Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Patient_Address</th>
                        <th>Contact_No</th>
                        <th>Guardian_Name</th>
                        <th>Emergency_contact_no </th>
                        <th>Nature_Of_Disease</th>
                        <th>Patient_Condition</th>
                        <th>Actions</th>
                    </tr>
                    <td></td> 
                    <td><input type="text" className=" form-control"  value={EditPatient_Id} onChange={(e) => setEditPatient_id(e.target.value)} /></td>
                    <td><input type="text" className=" form-control"  value={EditPatient_Name} onChange={(e) => setEditPatient_Name(e.target.value)} /></td>
                    <td><input type="text" className=" form-control"  value={EditGender} onChange={(e) => setEditGender(e.target.value)} /></td>
                    <td><input type="text" className=" form-control"  value={EditAge} onChange={(e) => setEditAge(e.target.value)} /></td>
                    <td><input type="text" className=" form-control" value={EditPatient_Address} onChange={(e) => setEditPatient_Address(e.target.value)} /></td>
                    <td><input type="text" className=" form-control"  value={EditContact_No} onChange={(e) => setEditContact_No(e.target.value)} /></td>
                    <td><input type="text" className=" form-control"  value={EditGuardian_Name} onChange={(e) => setEditGuardian_Name(e.target.value)} /></td>
                    <td><input type="text" className=" form-control"  value={EditEmergency_contact_no} onChange={(e) => setEditEmergency_contact_no(e.target.value)} /></td>
                    <td><input type="text" className=" form-control"  value={EditNature_Of_Disease} onChange={(e) => setEditNature_Of_Disease(e.target.value)} /></td>
                    <td><input type="text" className=" form-control"  value={EditPatient_Condition} onChange={(e) => setEditPatient_Condition(e.target.value)} /></td>

                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.Patient_Id}</td>
                                        <td>{item.Patient_Name}</td>
                                        <td>{item.Gender}</td>
                                        <td>{item.Age}</td>
                                        <td>{item.Patient_Address}</td>
                                        <td>{item.Contact_No}</td>
                                        <td>{item.Guardian_Name}</td>
                                        <td>{item.Emergency_contact_no}</td>
                                        <td>{item.Nature_Of_Disease}</td>
                                        <td>{item.Patient_Condition}</td>
                                        <td colSpan={2}>
                                            <button className="btn btn-primary" onClick={() => handleEdit(item.Patient_Id)} >Edit</button> &nbsp;
                                            <button className="btn btn-danger" onClick={() => handleDelete(item.Patient_Id)}>Delete</button>
                                        </td>
                                    </tr>

                                )
                            })
                            :
                            'Loading..'
                    }


                </tbody>
            </Table>
   
        </Fragment>
    )
                }
          
 }

export default Patient;