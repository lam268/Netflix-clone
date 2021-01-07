import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios';

class Row extends Component {

    state = {
        films: [],
        default: {
            title: '',
            content: '',
            imageURL: '',
            gerne: '',
        },
        clickedfilm: {
            title: '',
            content: '',
            imageURL: '',
            gerne: '',
        }
    }

    handleClick(e, item) {
        e.preventDefault();

        this.setState({
            clickedfilm: {
                title: item.title,
                content: item.content,
                imageURL: item.imageURL
            }

        })
    };

    UNSAFE_componentWillMount() {
        axios.get('http://localhost:9000/api/film/')
            .then(data => {
                console.log(data.data);
                this.setState({
                    films: data.data.data,
                    default: {
                        title: data.data.data[0].title,
                        imageURL: data.data.data[0].imageURL,
                        content: data.data.data[0].content
                    }
                });
            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        const linkURL = `http://localhost:3000/watch/${(this.state.clickedfilm.title) ? this.state.clickedfilm.title : this.state.default.title}`
        return (
            <Contain>
                <Section>
                    <Container>
                        <Slides>
                            <img className="choose" src={(this.state.clickedfilm.imageURL) ? this.state.clickedfilm.imageURL : this.state.default.imageURL} alt="slide" />;
                    <Contentdiv>
                                <h2>{(this.state.clickedfilm.title) ? this.state.clickedfilm.title : this.state.default.title}</h2>
                                <p>{(this.state.clickedfilm.content) ? this.state.clickedfilm.content : this.state.default.content}</p>
                                <a href={linkURL}>
                                    Watch free
                            </a>
                                <a href="/">
                                    Watch with your friends
                            </a>
                            </Contentdiv>
                        </Slides>
                    </Container>
                </Section>
                <Rowx>
                    <h2 className="h23">Films</h2>
                    <Navbar>
                        {this.state.films.map((item) => {
                            return (
                                <Column>
                                    <a onClick={(e) => this.handleClick(e, item)} >
                                        <img src={item.imageURL} alt="" />
                                    </a>

                                </Column>
                            )
                        })}
                    </Navbar>
                    <Prev>{'<'}</Prev>
                    <Next>{'>'}</Next>
                </Rowx>
            </Contain>

        )
    }
}

export default Row;

const Contain = styled.div`
    background: var(--main-deep-dark);
`;

const Rowx = styled.div`
    width: 90%;
    height: auto;
    margin: 0 auto;
    position: relative;
    margin-top: 30px;
    .h23 {
        color: red;
        letter-spacing: 2px;
    }
`;

const Prev = styled.div`
    position: absolute;
    top: 50%;
    font-size: 2em;
    background: #0009;
    color: white;
    padding: 50x 10px;
    transform: translateY(-50%);
    cursor: pointer;
`;

const Next = styled.div`
    position: absolute;
    top: 50%;
    font-size: 2em;
    background: #0009;
    color: white;
    right: 0;
    padding: 50x 10px;
    transform: translateY(-50%);
    cursor: pointer;
`;

const Navbar = styled.div`
    width: 100%;
    height: 220px;
    overflow: hidden;
    padding: 10px 0;
    scroll-behavior: smooth;
    display: flex;
`;

const Column = styled.div`
    width: 25%;
    height: 100%;
    transition: 0.3s linear;
    cursor: pointer;

    a img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
    }
`;

const Section = styled.section`
    position: relative
`;

const Container = styled.div`
    width: 100%;
    height: 450px;
    overflow: hidden;
    position: relative;
`;

const Slides = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    animation: fade 1s ease-in-out;

    keyframes fade {
        to {
            opacity: 1;
        }
        from {
            opacity: 0;
        }
    }

    .choose {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        filter: brighness(80%);
    }
`;

const Contentdiv = styled.div`
    position:absolute;
    left: 50px;
    bottom: 100px;
    color: white;
    max-width: 400px;
    text-shadow: 0 0 1px #000;

    h2 {
        font-size: 2em;
        font-family: 'Bebas Neue', cursive;
        letter-spacing: 2px;
    }

    p {
        line-height: 1.4;
        margin: 10px 0;
        font-family: 'Bebas Neue', cursive;
    }

    a{
        display: inline-block;
        text-decoration: none;
        font-family: 'Bebas Neue', cursive;
        background: red;
        color: white;
        padding: 10px 15px;
    }
    a:hover {
        background: chocolate;

    }
`;