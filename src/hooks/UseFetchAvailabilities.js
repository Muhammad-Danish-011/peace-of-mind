import { useState } from "react";

const UseFetchAvailability = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(null);
    const [noAvailability, setNoAvailability] = useState(null);

    function fetchAllAvailability() {
        setLoading(true);
        fetch(`http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability${url}`)
            .then((response) => response.json())
            .then((availability) => {
                // console.log(availability);
                setData(availability);
                setLoading(false);
            })
            .catch(error => {
                // console.log('my error', error);
                setNoAvailability(true);
                setLoading(false)
            })
    }

    return { fetchAllAvailability, data, loading, setLoading , noAvailability};
}


export default UseFetchAvailability;