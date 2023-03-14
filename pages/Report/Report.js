import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'




const Report = () => { 

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [ReportId, setReportId] = useState('')
    const [PaymentId, setPaymentId] = useState('')
    const [Patient_Id, setPatient_Id] = useState('')
    const [Patient_Billid, setPatient_Billid] = useState('')
    const [PatientName, setPatientName] = useState('')
    const [PatientAddress, setPatientAddress] = useState('')
    const [ContactNo, setContactNo] = useState('')
    const [Disease, setDisease] = useState('')
    const [PatientCondition, setPatientCondition] = useState('')
    const [AdmissionDate, setAdmissionDate] = useState('')
    const [DoctorName, setDoctorName] = useState('')
    const [DischargeDate, setDischargeDate] = useState('')
    

    const [EditReportId, setEditReportId] = useState('')
    const [EditPaymentId, setEditpaymentId] = useState('')
    const [EditPatient_Id, setEditpatientId] = useState('')
    const [EditPatient_Billid, setEditPatient_Billid] = useState('')
    const [EditPatientName, setEditPatientName] = useState('')
    const [EditPatientAddress, setEditPatientAddress] = useState('')
    const [EditContactNo, setEditContactNo] = useState('')
    const [EditDisease, setEditDisease] = useState('')
    const [EditPatientCondition, setEditPatientCondition] = useState('')
    const [EditAdmissionDate, setEditAdmissionDate] = useState('')
    const [EditDoctorName, setEditDoctorName] = useState('')
    const [EditDischargeDate, setEditDischargeDate] = useState('')



    
    const [data, setData] = useState([])

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get('https://localhost:44360/api/Report/')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const handleEdit = (id) => {
       
        handleShow();
        axios.get(`https://localhost:44360/api/Report/${id}`)
        .then((result) => {
            setEditReportId(result.data.ReportId);
            setEditpaymentId(result.data.PaymentId);
            setEditpatientId(result.data.Patient_Id);
            setEditPatient_Billid(result.data.Patient_Billid);
            setEditPatientName(result.data.PatientName);
            setEditPatientAddress(result.data.PatientAddress);
            setEditContactNo(result.data.ContactNo);
            setEditDisease(result.data.Disease);
            setEditPatientCondition(result.data.PatientCondition);
            setEditAdmissionDate(result.data.AdmissionDate);
            setEditDoctorName(result.data.DoctorName);
            setEditDischargeDate(result.data.DischargeDate);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete this record") === true) {
            axios.delete(`https://localhost:44360/api/Report/${id}`)
                .then((result) => {  
                    clear();
                    toast.success('Report has been Deleted');
                    getData();
                }).catch((error) => {
                    toast.error(error);
                })

        }
        alert(id);
    }
    const handleUpdate = () => {
        const url = `https://localhost:44360/api/Report/${EditReportId}`;
        const data = {
            "ReportId": EditReportId,
            "PaymentId": EditPaymentId,
            "Patient_Id": EditPatient_Id,
            "Patient_Billid": EditPatient_Billid,
            "PatientName": EditPatientName,
            "PatientAddress": EditPatientAddress,
            "ContactNo": EditContactNo,
            "Disease": EditDisease,
            "PatientCondition": EditPatientCondition,
            "AdmissionDate": EditAdmissionDate,
            "DoctorName": EditDoctorName,
            "DischargeDate": EditDischargeDate


        }

        axios.put(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Report has been Updated');
            }).catch((error) => {
                toast.error(error)
            })

    }
    const handleSave = () => {
        const url = 'https://localhost:44360/api/Report';
        const data = {
            "ReportId": ReportId,
            "PaymentId": PaymentId,
            "Patient_Id": Patient_Id,
            "Patient_Billid": Patient_Billid,
            "PatientName": PatientName,
            "PatientAddress": PatientAddress,
            "ContactNo": ContactNo,
            "Disease": Disease,
            "PatientCondition": PatientCondition,
            "AdmissionDate": AdmissionDate,
            "DoctorName": DoctorName,
            "DischargeDate":DischargeDate
        }

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Report has been added');
            }).catch((error) => {
                toast.error(error)
            })
    }

    const clear = () => {
            setEditReportId('');
            setEditpaymentId('');
            setEditpatientId('');
            setEditPatient_Billid('');
            setEditPatientName('');
            setEditPatientAddress('');
            setEditContactNo('');
            setEditDisease('');
            setEditPatientCondition('');
            setEditAdmissionDate('');
            setEditDoctorName('');
            setEditDischargeDate('');
    }
return (
        <div>
        <Fragment>
            <ToastContainer />
            <Container>

                <Col>
                <div className="container">
                    <Col><input type="text" className=" form-control" placeholder="Enter ReportId" value={ReportId} onChange={(e) => setReportId(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter PaymentId" value={PaymentId} onChange={(e) => setPaymentId(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter Patient_Id" value={Patient_Id} onChange={(e) => setPatient_Id(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter Patient_Billid" value={Patient_Billid} onChange={(e) => setPatient_Billid(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter PatientName" value={PatientName} onChange={(e) => setPatientName(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter PatientAddress" value={PatientAddress} onChange={(e) => setPatientAddress(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter ContactNo" value={ContactNo} onChange={(e) => setContactNo(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter Disease" value={Disease} onChange={(e) => setDisease(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter PatientCondition" value={PatientCondition} onChange={(e) => setPatientCondition(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter AdmissionDate" value={AdmissionDate} onChange={(e) => setAdmissionDate(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter DoctorName" value={DoctorName} onChange={(e) => setDoctorName(e.target.value)} /></Col>
                    <Col><input type="text" className=" form-control" placeholder="Enter DischargeDate" value={DischargeDate} onChange={(e) => setDischargeDate(e.target.value)} /></Col>
          
          
                    </div>
                    <Col><button className="btn btn-primary" onClick={() => handleSave()}>Add Report</button></Col>
                </Col>
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ReportId</th>
                        <th>PaymentId</th>
                        <th>Patient_Id</th>
                        <th>Patient_Billid</th>
                        <th>PatientName</th>
                        <th>PatientAddress</th>
                        <th>ContactNo</th>
                        <th>Disease</th>
                        <th>PatientCondition</th>
                        <th>AdmissionDate</th>
                        <th>DoctorName</th>
                        <th>DischargeDate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                 <td></td>
                    <td><input type='text' className=" form-control" value={EditReportId} onChange={(e) => setEditReportId(e.target.value)} /></td>
                    <td><input type='text' className=" form-control" value={EditPaymentId} onChange={(e) => setEditpaymentId(e.target.value)} /></td>
                    <td><input type='text' className=" form-control" value={EditPatient_Id} onChange={(e) => setEditpatientId(e.target.value)} /></td>
                    <td><input type='text' className=" form-control" value={EditPatient_Billid} onChange={(e) => setEditPatient_Billid(e.target.value)} /></td>
                    <td><input type='text' className=" form-control" value={EditPatientName} onChange={(e) => setEditPatientName(e.target.value)} /></td>
                    <td><input type='text' className=" form-control" value={EditPatientAddress} onChange={(e) => setEditPatientAddress(e.target.value)} /></td>
                    <td><input type='text' className=" form-control" value={EditContactNo} onChange={(e) => setEditContactNo(e.target.value)} /></td>
                    <td><input type='text' className=" form-control" value={EditDisease} onChange={(e) => setEditDisease(e.target.value)} /></td>
                    <td><input type='text' className=" form-control" value={EditPatientCondition} onChange={(e) => setEditPatientCondition(e.target.value)} /></td>
                    <td><input type='text' className=" form-control" value={EditAdmissionDate} onChange={(e) => setEditAdmissionDate(e.target.value)} /></td>
                    <td><input type='text' className=" form-control" value={EditDoctorName} onChange={(e) => setEditDoctorName(e.target.value)} /></td>
                    <td><input type='text' className=" form-control" value={EditDischargeDate} onChange={(e) => setEditDischargeDate(e.target.value)} /></td>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.ReportId}</td>
                                        <td>{item.PaymentId}</td>
                                        <td>{item.Patient_Id}</td>
                                        <td>{item.Patient_Billid}</td>
                                        <td>{item.PatientName}</td>
                                        <td>{item.PatientAddress}</td>
                                        <td>{item.ContactNo}</td>
                                        <td>{item.Disease}</td>
                                        <td>{item.PatientCondition}</td>
                                        <td>{item.AdmissionDate}</td>
                                        <td>{item.DoctorName}</td>
                                        <td>{item.DischargeDate}</td>
                                        <td colSpan={2}>
                                            <button className="btn btn-primary" onClick={() => handleEdit(item.ReportId)} >Edit</button> &nbsp;
                                            <button className="btn btn-danger" onClick={() => handleDelete(item.ReportId)}>Delete</button>
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
        </div>
    )
}
export default Report;