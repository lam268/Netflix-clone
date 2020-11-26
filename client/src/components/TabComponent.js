import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TabDoor from './TabDoor';
import TabDevices from './TabDevices';
import TabPrice from './TabPrice';
import '../css/Tabs.css';


class TabComponent extends Component {
    render() {
        return (
            <div>
                <Tabs>
                    <TabList>
                        <Tab><TabDoor /></Tab>
                        <Tab><TabDevices /></Tab>
                        <Tab><TabPrice /></Tab>
                    </TabList>
                </Tabs>
            </div>
        )
    }
}

export default TabComponent
