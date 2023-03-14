import React from 'react';
import "./MainPage.css";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const Navigate=useNavigate();
  return (
    <>
      <div className="hero_section">
    <div className="nav">
      <div className="container">
        <div className="nav_div"><img src="images/Hospital-1.png" loading="lazy" width="250" sizes="150px"  alt="logo" className="logo_image"/><div/>
      </div>
    </div>
    <div className="section wf-section heading">
      <div className="container hero">
        <div id="w-node-_8db3aa47-a19f-a02a-7d5f-4423ded0fd72-2282d1f9">
          <h1 id="w-node-_6c552b2e-c086-a22b-45d8-760365985584-2282d1f9" className="hero_text heading">Hospital Management System</h1>
          <Button variant="contained" onClick={()=>{Navigate('/Login')}} size="large" sx={{width:'250px', fontSize:'20px'}}>Login</Button>
        </div>
      </div>
    </div>
  </div>
  <div className="section">
    <div className="container">
      <div className="our_service_div">
        <h2 className="services_text">Our Services</h2>
      </div>
      <div className="grid">
        <div><img src="images/olga-guryanova-tMFeatBSS4s-unsplash.jpg" loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 25vw, 24vw" id="w-node-_62fdb451-e83c-c24e-ba92-2caa6a577f45-2282d1f9"  alt="" className="operation_image"/>
          <h3 id="w-node-_5b539386-cc3d-db2f-bcab-17292f71438c-2282d1f9" className="service_section_heading">Operation &amp; Surgery</h3>
        </div>
        <div><img src="images/tom-claes-HIdUiamYIs0-unsplash.jpg" loading="lazy" width="2000" sizes="(max-width: 479px) 100vw, (max-width: 767px) 25vw, 24vw"  alt="" className="ortho-image"/>
          <h3 id="w-node-_2e88443c-4038-adba-cbf6-3bd2bd707015-2282d1f9" className="service_section_heading">Orthopaedics</h3>
        </div>
        <div><img src="images/kenny-eliason-MEbT27ZrtdE-unsplash.jpg" loading="lazy" width="2000" sizes="(max-width: 479px) 100vw, (max-width: 767px) 23vw, 24vw"  alt="" className="cardiology_image"/>
          <h3 id="w-node-_74494f8f-4806-8b01-b402-3e7b39095654-2282d1f9" className="service_section_heading">Cardiology</h3>
        </div>
        <div><img src="images/accuray-jEC4Tco8I9E-unsplash.jpg" loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 23vw, 24vw"  alt="" className="cancer_image"/>
          <h3 id="w-node-_7fa2a316-7a7d-521b-e7e2-acaf5c4bc0d5-2282d1f9" className="service_section_heading">Cancer</h3>
        </div>
        <div><img src="images/accuray-AhTXFlSf5xI-unsplash.jpg" loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 25vw, 24vw"  alt="" className="neuro_photo"/>
          <h3 id="w-node-_9435cb48-6e6e-a54a-13f4-e628210a5a38-2282d1f9" className="service_section_heading">Neurosurgery</h3>
        </div>
        <div><img src="images/otto-norin-xqPhcfPO0jc-unsplash.jpg" loading="lazy" sizes="(max-width: 479px) 100vw, 24vw"  alt="" className="spine_image"/>
          <h3 id="w-node-_91763b1e-e6aa-c7df-e437-ce69415280bd-2282d1f9" className="service_section_heading">Spine</h3>
        </div>
      </div>
    </div>
  </div>
  <div className="footer_section">
    <div className="container">
      <div className="footer_item_div"><img src="images/Hospital-1.png" loading="lazy" width="250" sizes="(max-width: 479px) 100vw, 140px"  alt="" className="logo_image_footer"/>

        <p className="footer_add"><strong className="bold-text">Health + Hospital No. 71,<br/>11th Main Road,<br/>Opp Railway Station,RP Nagar,<br/> Bengaluru-560003</strong></p>
      </div>
    </div>
    <div className="_1px_div"></div>
    <div className="container">
      <p className="text">@ 2023. All right reserved</p>
    </div>
  </div>
  </div>
  </>
  )
}

export default MainPage;