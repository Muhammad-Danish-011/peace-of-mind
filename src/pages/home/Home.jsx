import React from 'react';
import { Box } from '@mui/material';
import Search from '../../components/patient/Search';
import BasicCard from '../../components/patient/BasicCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TappointLink from '../../components/patient/TappointLink';
import Card from '../../components/patient/Card';
import { useNavigate } from 'react-router-dom';
import {useEffect, useState } from 'react';


const styles = {
  container: {
    maxWidth: 1300,
    marginTop: '-1% !important',
    padding: '20px',
    // backgroundColor: '#f5f5f5', 
    margin: '0 auto' ,

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
  const obj = JSON.parse(sessionStorage.getItem('patient_data'));
  const user = JSON.parse(sessionStorage.getItem('user'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const accountUrl = process.env.REACT_APP_API_KEY;

  // const cards = [1,2,3,4,5,6];
  const [cards, setCards] = useState([]);
  const [councelor, setCouncelor] = useState([]);
  useEffect(() => {
    fetch(
      `${accountUrl}/user/get/${user.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        // setUserData(data);
        // setFirstName(data.firstName);
        // setLastName(data.lastName);
        // setPassword(data.password);
        // setAddress(data.address);
        // setEmail(data.email);
        // setPhoneNumber(data.phoneNumber);
        // setRole(data.role);
        // setCnic(data.cnic);

        // if (data.role === "PATIENT") {
        //   fetch(
        //     // /{userId}
        //     `http://patient-app.us-west-2.elasticbeanstalk.com/patient/getByUserId/${user.id}`
        //   )
        //     .then((response) => response.json())
        //     .then((patientData) => {
        //       // console.log('-------======--',patientData);
        //       // setSpecialization(counselorData.specialization);
        //       // setDescription(counselorData.description);
        //       sessionStorage.setItem("patient_data", JSON.stringify(patientData))
        //     })
        //     .catch((error) => {
        //       console.error(error);
        //     });
        // }
  });}, []);
  // console.log(obj);
  // console.log(user);

  useEffect(() => {
    //Runs on every render
    fetch("http://councelorapp-env.eba-mdmsh3sq.us-east-1.elasticbeanstalk.com/counselor/get")
    .then(data => data.json())
    .then(data => {
      // console.log({data});
      setCouncelor(data);
      setCards(data.slice(0,6));
    })
    .catch(err => console.group(err))

   
  },[]);
 

  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/councler', {state: {councelor}});
  };
  return (<>
    {<Box sx={{
      ...styles.container,
      marginLeft: isSmallScreen ? 10 : theme.spacing(8)
    }}>
    <TappointLink/>
      <Search  onClick={handleSearchClick}/>
      {/* Suggested for you */}
      <Box sx={{...styles.cardContainer,
      marginLeft: isSmallScreen ? 1: theme.spacing(-11)}}
      >
        {
        cards.map((card) => {
          // console.log(card)
          return <BasicCard key={`card-${card.id}`} basicCard={card} sx={{marginRight: '20px', marginBottom: '20px'}}/>
        })
        }
      </Box>
      <Card />
    </Box>}
    </>)
}

export default Home;

