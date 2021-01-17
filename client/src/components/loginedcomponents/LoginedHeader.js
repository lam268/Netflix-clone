import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from '../ladingpage/Buttons'
import axios from 'axios';

class LoginedHeader extends Component {

    state = {
        currentUser: {
            email: '',
            name: '',
        },
    };

    UNSAFE_componentWillMount() {
        const email = window.localStorage.getItem('email');
        const name = window.localStorage.getItem('name');

        if (email) {
            this.setState({
                currentUser: {
                    email: email,
                    name: name,
                }
            })
        };
    }

    onClick = e => {
        e.preventDefault();

        axios.get('http://localhost:9000/api/auth/logout')
        .then(response => {
            console.log(response);
        }, (error) => {
            console.log(error.message);
        });

        window.localStorage.removeItem('email');
        window.localStorage.removeItem('name');


        this.setState({
            currentUser: {
                email: '',
                name: '',
            }
        })
        window.location.href = '/';
    }


    render() {
        return (
            <Header>
                <Logo>Moiflix</Logo>
                <U><a href='/'>Home</a></U>
                <U><a href='/'>Movies</a></U>
                <U>Welcome, {this.state.currentUser.name}</U>
                <U><Button onClick={e => this.onClick(e)}>Logout</Button></U>
                <label htmlFor="chk1" className="menu-close">
                    <i className="fa fa-times" aria-hidden="true"></i>
                </label>
                <Search className="search">
                    <input type="text" name="search" id="srch"
                        required placeholder="Enter your search"></input>
                    <button type="submit">Search</button>
                </Search>
                <label htmlFor="chk1" className="menu-open"><i className="fa fa-bars" aria-hidden="true"></i>
                </label>
            </Header>
        )
    }
}

export default LoginedHeader;

const Header = styled.div`
    font-family: 'Helvetica', cursive;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-height: 80px;
    background: var(--main-deep-dark);
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: center;

    li a:hover {
        color: red
    }

    .search input {
        width: 200px;
        height: 100%;
        border: none;
        padding: 0 10px;
    }

    .search button {
        width: 80px;
        height: 100%;
        border: none;
        cursor: pointer;
        background: white;
    }

    .menu-close {
        color: white;
        position: absolute;
        top: 15px;
        right: 2px;
        font-size: 2em;
        display: none;
    }

    .menu-open {
        color: white;
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
        cursor: pointer;
        font-size: 2em;
        display: none;
    }
`;

const Logo = styled.h2`
    font-size: 2em;
    color: red;
    margin-left: 100px;
    letter-spacing: 2px;
`;

const U = styled.li`
    flex: 2;
    text-align: right;
    margin-right: 50px;
    list-display: none;
    display: inline-block;
    color: whitesmoke;
    text-decoration: none;
    padding: 10px 15px;
    font-szie: 1.5rem;
`;

const Search = styled.div`
    max-width: 300px;
    width: 100%;
    height: 30px;
    margin-right: 100px;
`;