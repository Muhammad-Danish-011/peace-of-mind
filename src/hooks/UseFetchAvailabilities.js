import { useState } from "react";

const UseFetchAvailability = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(null);

    function fetchAllAvailability() {
        setLoading(true);
        fetch('http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/counselor/2')
            .then((response) => response.json())
            .then((availability) => {
                console.log(availability);
                setData(availability);
                setLoading(false);
            })
            .catch(error => {
                console.log('my error', error);
                setLoading(false)
            })
    }

    return { fetchAllAvailability, data, loading, setLoading };
}


export default UseFetchAvailability;
