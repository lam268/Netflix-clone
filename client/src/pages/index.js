import React, { Component } from 'react'
import Header from '../components/ladingpage/Header'
import TabComponent from '../components/ladingpage/TabComponent'
import Footer from '../components/ladingpage/Footer'
import LoginedHeader from '../components/loginedcomponents/LoginedHeader'
import Row from '../components/loginedcomponents/Row'
import IndexControllers from '../controllers/IndexControllers'

var indexControllers = new IndexControllers();

class Main extends Component {
    state = {
        currentUser: {
            email: '',
            name: '',
        },
    };

    UNSAFE_componentWillMount() {
        indexControllers.getCurrentUser();
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