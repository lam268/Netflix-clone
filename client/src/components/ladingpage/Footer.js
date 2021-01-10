import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { iosWorld } from 'react-icons-kit/ionicons/iosWorld';
import { arrowSortedDown } from 'react-icons-kit/typicons/arrowSortedDown';
import styled from 'styled-components';

export default class Footer extends Component {
    render() {
        return (
            <FooterContainer>
                <span style={{ marginLeft: '15%', fontSize: '1.125rem' }}>
                    Questions?<Link to='/'>    Call 1900-8565-656</Link>
                </span>
                <div className="footer-columns">
                    <u1>
                        <li>
                            <Link to="/">Gift card Terms</Link>
                        </li>
                    </u1>
                    <u1>
                        <li>
                            <Link to="/">FAQs</Link>
                        </li>
                    </u1>
                    <u1>
                        <li>
                            <Link to="/">Terms of use</Link>
                        </li>
                    </u1>
                    <u1>
                        <li>
                            <Link to="/">Privacy Statements</Link>
                        </li>
                    </u1>
                    <div className="lang-btn">
                        <Icon icon={iosWorld} size={20} />
                        &nbsp;&nbsp;English&nbsp;&nbsp;
                        <Icon icon={arrowSortedDown} />
                    </div>
                </div>
                <span style={{marginLeft: '15%', fontSize: '1.125rem'}}>Moiflix VietNam</span>
            </FooterContainer>
        )
    }
}

const FooterContainer = styled.footer`
    background: var(--main-deep-dark);
    padding-top: 10rem;
    padding-bottom: 3rem;
    color: #999;

    .footer-columns {
        width: 70%;
        margin: 1rem auto 0;
        font-size: 0.9rem;
        overflow: auto;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    u1 li {
        list-style: none;
        line-height: 2.5;
    }

    a {
        color: #999;
    }

    a:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .lang-btn {
        background: transparent;
        border: 0.9px solid #333;
        padding: 1rem;
        width: 8rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        margin: 2rem 0;
    }
`;