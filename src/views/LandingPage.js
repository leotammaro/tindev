import React from 'react';
import './LandingPage.scss';
import Navbar from '../components/Navbar';
import AuthButton from '../components/AuthButton';

function LandingPage(){

    return <div className="landing-page">
        <Navbar/>
        <div className="content">
            <h1 className="title">Match. Chat. Date.</h1>
            <AuthButton type="register">CREATE ACCOUNT</AuthButton>
        </div>
    </div>;
}

export default LandingPage; 