import React from "react";
import {CurrentAppointments} from "./CurrentAppointments";
import {PendingAppointments} from "./PendingAppointments";
import {PreviousAppointments} from "./PreviousAppointments";
import Tabs from './Tabs'
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function Appointments() {

    return (
        <div>
            <Tabs>
                <div label="Current Appointments" >
                    <Router>
                        <CurrentAppointments />
                    </Router>
                </div>

                <div label="Pending Appointments" >
                    <Router>
                        <PendingAppointments />
                    </Router>


                </div>
                <div label="Previous Appointments" >

                    <Router>
                        <PreviousAppointments />
                    </Router>

                </div>
            </Tabs>
        </div>
    )
}
