import { useState } from "react";

const UseFetchAppointment = () => {
    const [appointmentData, setAppointmentData] = useState(null);
    const [loading, setLoading] = useState(false);

    function fetchAllAppointment() {
        setLoading(true);
        fetch('http://appointment.us-west-2.elasticbeanstalk.com/appointments/getall')
            .then((response) => response.json())
            .then((appointment) => {
                console.log(appointment);
                setAppointmentData(appointment);
                setLoading(false);
            })
            .catch(error => {
                console.log('my error', error);
                setLoading(false)
            })
    }

    return { fetchAllAppointment, appointmentData, loading };
}


export default UseFetchAppointment;
