import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import UserControllers from '../../controllers/UsersControllers'

const initState = {
    name: '',
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    nameError: '',
}

var userControllers = new UserControllers();

export default class RegisterForm extends Component {

    state = initState;

    handleNameChange = e => {
        this.setState({
            name: e.target.value
        });
    };

    handleEmailChange = e => {
        this.setState({
            email: e.target.value
        });
    };

    handlePasswordChange = e => {
        this.setState({
            password: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const err = userControllers.validate(this.state)
        this.setState({
            ...err
        })
        console.log(err)

        if (this.state.emailError === "") {
            this.setState(initState);

            const registered = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }

            axios.post('http://localhost:9000/api/auth/register', registered)
                .then(function (res) {
                    console.log(res.data);
                    window.localStorage.setItem('email', res.data.newUser.email);
                    window.localStorage.setItem('name', res.data.newUser.name);
                    window.location.href = '/';
                }, (error) => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <FormContainer>
                <div className="form-container">
                    <form>
                        <h1>Sign up</h1>
                        <div className="input-container">
                            <input className={this.state.namedError ? 'input-error input-empty' : 'input-empty'} type="text"
                                onChange={this.handleNameChange}
                                required />
                            <label>Name</label>
                            <span style={{ color: '#db7302' }}>{this.state.namedError}</span>
                        </div>
                        <div className="input-container">
                            <input className={this.state.emailError ? 'input-error input-empty' : 'input-empty'} type="email"
                                onChange={this.handleEmailChange}
                                required />
                            <label>Email or Phone Number</label>
                            <span style={{ color: '#db7302' }}>{this.state.emailError}</span>
                        </div>
                        <div className="input-container">
                            <input className={this.state.emailError ? 'input-error input-empty' : 'input-empty'} type="password"
                                onChange={this.handlePasswordChange}
                                required />
                            <label>Password</label>
                            <span style={{ color: '#db7302' }}>{this.state.passwordError}</span>
                        </div>
                        <div className="input-container">
                            <Button href="/" type="submit" onClick={e => this.onSubmit(e)}>Sign up</Button>
                        </div>


                    </form>
                </div>
            </FormContainer>

        )
    }
}

const FormContainer = styled.div`
    display: grid;
    justify-content: center;
    position: relative;
    z-index: 5; 

    .form-container {
        background: rgba(0,0,0,0.8);
        position: relative;
        width: 28.125rem;
        height: 37.25rem;
        padding: 4rem;
    }

    .input-container {
        display:grid;
        grid-template-columns: 1fr;
        margin-top: 1.2rem;
    }

    .input-empty {
        color:  #fff;
        background: #333;
        border: 0;
        border-radius: 0.25rem;
        height: 3rem;
        padding: 0.9rem 1.25rem;
    }

    form div label {
        position: absolute;
        top: 0.625rem;
        left: 1.25rem;
        poiner-events: none;
        color: #8a8a8a;
        font-size: 1rem;
        transition: transform 150ms ease-out, font-size 150ms ease-out;
    }

    form div {
        position: relative;
    }

    input:focus ~ label {
        top: 0.4375rem;
        font-size: 0.7rem;
    }

    input:focus {
        outlint: none;
    }

    .input-error {
        border-bottom: 1px solid #db7302;
    }

    .checkbox-container {
        margin-left: 0.75rem;
        padding-left: 1.875rem;
        position: relative;
        font-size: 0.9rem;
        cursor: pointer;
        color: #999;
    }

    .checkbox-container input {
        display: none;
    }

    .checkbox-container .checkmark {
        display: inline-block;
        background: #454545;
        width: 1.1rem;
        height: 1.1rem;
        left: 0;
        top: 0;
        border-radius: 0.1rem;
        position: absolute;
    }

    .checkbox-container input:checked + .checkmark:after {
        content: '';
        position: absolute;
        height: 0.25rem;
        width: 0.625rem;
        border-left: 2px solid #000000;
        border-bottom: 2px solid #000000;
        top: 25%;
        left: 21%;
        transform: rotate(-45deg);
    }

    .need-help {
        text-decoration: none;
        color: #828282;
        margin-left: 6.6rem;
        font-size: 0.9rem;
    }

    .bottom-form {
        position: absolute;
        bottom: 0;
        margin-bottom: 4rem;
    }

    .sign-up-text {
        font-size: 1.1rem;
        color: #fff;
        &:hover {
            text-decoration: underline;
        }
    }
`;

const Button = styled.button`
    color: #fff;
    background: rgba(229, 9,20);
    border:none;
    outline: none;
    padding: 0.8rem 1.3rem;
    border-radius: 0.125rem;
    font-size: 1rem;
    text-align: center;
    box-shadow: 0 1px 0 rgba(0,0,0,0.45)
    transition: opacity .2s ease-in;
    cursor: pointer;
    text-decoration: none;
    margin: 1rem 0;

`;