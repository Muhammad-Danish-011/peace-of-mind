import { useState } from "react";

const UseFetchAvailability = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(null);
    const obj = JSON.parse(sessionStorage.getItem('counselor_data'));

  console.log(obj);

    function fetchAllAvailability() {
        setLoading(true);
        fetch(`http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/counselor/${obj.id}`)
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
