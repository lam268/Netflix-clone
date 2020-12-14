import React, { Component } from 'react';
import logo from '../svg/logo.svg'
import styled from 'styled-components'
import RegisterForm from '../register/RegisterForm'
import RegisterFooter from '../register/RegisterFooter'

class Register extends Component {
    render() {
        return (
            <div className="main-login-container">
                <div className="header-top">
                    <Logo src={logo} alt="logo" className="logo"/>
                </div>
                <RegisterForm />
                <RegisterFooter />
            </div>
        )
    }
}

export default Register;

const Logo = styled.img`
    width: 11rem;
    position: absolute;
    top: 25%;
    left: 11%;
    transform: translate(-50%, -50%);
    margin-left: 0;
`;