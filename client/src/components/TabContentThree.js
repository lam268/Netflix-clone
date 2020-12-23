import React from 'react'

function TabContentThree() {
    return (
        <TabContentTwoContainer>
            <div class="tab-content">
                <div class="tab-top-content">
                    <span style = {{ fontsize: '1.5rem'}}>
                        Watch TV shows and movies anytime, anywhere - personalized for you.
                </span>
                    <Button className="btn">try it now</Button>
                </div>
            </div>
            <div className="tab-bottom-content">
                <div>
                    <img src = {Imtv} style = {{ width: '18.76rem'}} alt = ""/>
                    <h3>Watch on your TV</h3>
                    <p>Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray player and more</p>
                </div>
                <div>
                    <img src = {ImTablet} style = {{ width: '18.76rem'}} alt = ""/>
                    <h3>Watch on your TV</h3>
                    <p>Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray player and more</p>
                </div>
                <div>
                    <img src = {ImMac} style = {{ width: '18.76rem'}} alt = ""/>
                    <h3>Watch on your TV</h3>
                    <p>Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray player and more</p>
                </div>
            </div>
        </TabContentTwoContainer>
    )
}

export default TabContentThree

const TabContentTwoContainer = styled.div`
    background: var(--main-deep-dark);

    .tab-content {
        margin: 0 15%;
    }

    .tab-top-content {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        justify-content: center;
        align-item: center;
        padding 2.5rem 0;
    }

    span {
        grid-column: 1 / 8;
    }

    .btn {
        margin: 0 1.25rem 1.25rem;
        grid-column: 10/12;
    }

    .tab-bottom-content {
        display:grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 2rem;
        text-align: center;
        margin-top: 2rem;
    }

    h3 {
        margin: 0.5rem;
    }

    p {
        color: var(--main-grey);
    }
`;
