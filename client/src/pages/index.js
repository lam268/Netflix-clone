import React, { Component } from 'react'
import Header from '../components/Header'
import TabComponent from '../components/TabComponent'
import Footer from '../components/Footer'
import LoginedHeader from '../loginedcomponents/LoginedHeader'
import Row from '../loginedcomponents/Row'

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