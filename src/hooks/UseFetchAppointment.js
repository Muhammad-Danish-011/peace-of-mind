import { useState } from "react";

const UseFetchAppointment = (url) => {
    const [appointmentData, setAppointmentData] = useState([]);
    const [loading, setLoading] = useState(false);

    function fetchAllAppointment() {
        try{
            setLoading(true);
            fetch(`http://appointment.us-west-2.elasticbeanstalk.com/appointments${url}`)
                .then((response) => response.json())
                .then((appointment) => {
                    // console.log(appointment);
                    setAppointmentData(appointment);
                    setLoading(false);
                })
                .catch(error => {
                    console.log('my error', error);
                    setLoading(false)
                })

        }
        catch(e){
            console.log(e);
        }
    }

    return { fetchAllAppointment, appointmentData, loading };
}


export default UseFetchAppointment;
