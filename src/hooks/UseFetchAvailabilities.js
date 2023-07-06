import { useState } from "react";

const UseFetchAvailability = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(null);
    const [noAvailability, setNoAvailability] = useState(null);

    function fetchAllAvailability() {
        try{
            setLoading(true);
            fetch(`http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability${url}`)
                .then((response) => response.json())
                .then((availability) => {

                    if(availability.length >0){
                        console.log(availability);
                        setData(availability);
                        setLoading(false);
                    }
                    else{
                        console.log('aya')
                        setNoAvailability(true);
                        setLoading(false);
                    }
                })
                .catch(error => {
                    // console.log('my error', error);
                    
                    setLoading(false)
                })
        }
        catch(e){
            console.log(e);
        }
    }

    return { fetchAllAvailability, data, loading, setLoading , noAvailability};
}


export default UseFetchAvailability;