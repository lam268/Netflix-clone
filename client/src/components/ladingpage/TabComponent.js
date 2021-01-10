import React, { Component } from 'react';
import { Tab, Tabs, TabList , TabPanel} from 'react-tabs';
import TabDoor from './TabDoor';
import TabDevices from './TabDevices';
import TabPrice from './TabPrice';
import TabContentOne from './TabContentOne'
import TabContentTwo from './TabContentTwo'
import TabContentThree from './TabContentThree'
import '../css/Tabs.css';


class TabComponent extends Component {
    state = {
        tabIndex: 0
    }
    render() {
        return (
            <div>
                <Tabs className="tabs" selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                    <TabList className="tab-nav-container">
                        <Tab className={`${this.state.tabIndex === 0 ? 'tab-selected active' : null}`}>
                            <TabDoor />
                            <p style = {{ marginBottom: '0.2rem'}}><strong>No commitments</strong></p>
                            <p style = {{ marginTop: '0rem'}}><strong>Cancel online anytime</strong></p>
                        </Tab>
                        <Tab className={`${this.state.tabIndex === 1 ? 'tab-selected active' : null}`}><TabDevices />
                            <p><strong>Watch anywhere</strong></p></Tab>
                        <Tab className={`${this.state.tabIndex === 2 ? 'tab-selected active' : null}`}><TabPrice />
                            <p><strong>Pick your price</strong></p>
                        </Tab>
                    </TabList>
                    <TabPanel>
                        <TabContentOne/>
                    </TabPanel>
                    <TabPanel>
                        <TabContentTwo/>
                    </TabPanel>
                    <TabPanel>
                        <TabContentThree/>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

export default TabComponent
