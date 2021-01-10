import React, { Component } from 'react'
import Header from '../components/ladingpage/Header'
import TabComponent from '../components/ladingpage/TabComponent'
import Footer from '../components/ladingpage/Footer'
import LoginedHeader from '../components/loginedcomponents/LoginedHeader'
import Row from '../components/loginedcomponents/Row'

class Main extends Component {
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

    render() {
        console.log(this.state.currentUser);
        return (
            <div>
                {this.state.currentUser.email ? (
                    <div>
                        <LoginedHeader/>
                        <Row></Row>
                        <Footer></Footer> 
                    </div>
                ) : (
                    <div>
                        <Header></Header>
                        <TabComponent></TabComponent>
                        <Footer></Footer>               
                    </div>              
                )}
            </div>
        )
}

}

export default Main