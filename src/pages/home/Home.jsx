import React from 'react';
import { Box } from '@mui/material';
import Search from '../../components/patient/Search';
import BasicCard from '../../components/patient/BasicCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TappointLink from '../../components/patient/TappointLink';
import Card from '../../components/patient/Card';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const styles = {
  container: {
    maxWidth: 1300,
    marginTop: '-1% !important',
    padding: '20px',
    // backgroundColor: '#f5f5f5', 
    margin: '0 auto',

  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 280px)',
    rowGap: '15px',
    columnGap: '0px',
    justifyContent: 'center',
    marginTop: '40px !important',

    // Add media query for smaller screens
    '@media (max-width: 600px)': {// import Card from '../../components/patient/Card';
      display: 'flex', // Use flexbox layout
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      rowGap: '10px',
      columnGap: '5px',
    },

  }
}

const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // const cards = [1,2,3,4,5,6];
  const [cards, setCards] = useState([]);
  const [councelor, setCouncelor] = useState([]);
  const [appointments, setAppopintments] = useState([]);
  const [availability, setAvailability] = useState(null)
  const [loading, setloading] = useState(false);


  const userId = JSON.parse(sessionStorage.getItem('patient_data')).data.id

  //method for check today`s date
  const isToday = (someDate) => {
    const today = new Date()
    someDate = new Date(someDate)
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

  useEffect(() => {
    //Runs on every render
    fetch("http://councelorapp-env.eba-mdmsh3sq.us-east-1.elasticbeanstalk.com/counselor/get")
      .then(data => data.json())
      .then(data => {
        // console.log({data});
        setCouncelor(data);
        setCards(data.slice(0, 6));
      })
      .catch(err => console.group(err))


  }, []);

  // console.log(userId)
  useEffect(() => {

    // const appointment = []
    // setLoader(true);
    const appointment = async () => {
      const app = await fetch("http://appointment.us-west-2.elasticbeanstalk.com/appointments/getall")
      return await app.json()

    }


    const userAppointment = (appointment) => {
      const avail = []
      appointment.map((app) => {
        if (+userId === app.patientid && app.confirmed === true) {
          avail.push(app);
        }
      })
      return avail;
    }


    const availabilityFun = async (app) => {
      const availibilityUrl = process.env.REACT_APP_AVAILIBILITY_API_KEY
      let myData = await Promise.all(app.map(async (appointment, i) => {

        let avail = await fetch(`${availibilityUrl}/availability/${appointment.availabilityId}`)
        avail = await avail.json()
        if (isToday(avail.date)) {
          console.log(avail)
          return {avail, appointment}
        }

        // fetch(`${availibilityUrl}/availability/${appointment.availabilityId}`)
        //   .then((resonse) => {
        //     return resonse.json()
        //   })
        //   .then((data) => {
        //     if (isToday(data.date)) {
        //       d = data
        //       return myData = data
        //       // console.log(myData)
        //     }
        //     // setloading(true);
        //   })
      }))
      // setMyData(myData);
        console.log({myData})
        return myData;
      // }
    }

    const fun = async () => {
      const app = await appointment()
      const userApp = await userAppointment(app)
      const avail = await availabilityFun(userApp)
      // setAppopintments(app);
      setAppopintments(userApp)
      console.log(avail)

      avail.map(a => {
        if(a){
          setAvailability(a)
        }
      })

      setloading(true);
    }

    fun()
    // console.log({funData})
    // setLoader(false)
  }, [userId])




  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/councler', { state: { councelor } });
  };





  return (<>
    {<Box sx={{
      ...styles.container,
      marginLeft: isSmallScreen ? 10 : theme.spacing(8)
    }}>
      {availability ? <TappointLink availability={availability} loading={loading}/> : "Loading"}
      <Search onClick={handleSearchClick} />
      {/* Suggested for you */}
      <Box sx={{
        ...styles.cardContainer,
        marginLeft: isSmallScreen ? 1 : theme.spacing(-11)
      }}
      >
        {
          cards.map((card) => {
            // console.log(card)
            return <BasicCard key={`card-${card.id}`} basicCard={card} sx={{ marginRight: '20px', marginBottom: '20px' }} />
          })
        }
      </Box>
      {appointments.length > 0 ? <Card tapAppointment={appointments} /> : "Loading"}
    </Box>}
  </>)
}

export default Home;

