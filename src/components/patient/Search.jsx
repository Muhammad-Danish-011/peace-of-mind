import React, { useEffect, useState } from 'react';
import { Paper,  Box, InputBase, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
// import Councler from '../../pages/councler/Councler';
import BasicCard from './BasicCard'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



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



const Search = ({onClick}) => {
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [searchedCoouncelor, setSearchedCouncelor] = useState([]);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));



  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_KEY}/user`)
    .then(data => data.json())
    .then(data => {
      // console.log({data})
      setUsers(data)
    })
  },[])

  const {state} = useLocation();

  const onhandleSubmit = (e) => {
    e.preventDefault();
  };
  // console.log(state)

  const search = () =>{
    const councelors = state.councelor;
    const data = [];
    
    users.map((user) =>{
      const fullName = user.firstName.toLowerCase()+" "+user.lastName.toLowerCase()
      if(user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) 
      || user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) 
      || fullName.toLowerCase().includes(searchTerm.toLowerCase())){
        console.log({user})
        councelors.map((councelor)=>{
          if(councelor.userId == user.id){
            data.push(councelor)
            console.log({councelor})
          }
        })
      }
    })
    setSearchedCouncelor(data)
  } 


  return (
    <>
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        width: { xs: '90%', md: '70%' },
      }}
    >
      <Paper
        component='form'
        onSubmit={onhandleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '110%',
          borderRadius: '25px',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#d9d9d9',
        }}
      >
        <InputBase
          placeholder='Search here'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            border: 'none',
            outline: 'none',
            padding: '15px',
            fontSize: '16px',
            width: '100%',
            lineHeight: '1.5em', // set line-height to adjust height of input placeholder
            fontFamily: 'inherit',
            color: 'black',
          }}
        />
      </Paper>
      <Button
      // type='submit'
      variant='contained'
     sx={{
      marginLeft: '10px',
    backgroundColor: '#d9d9d9',
    borderRadius:'15px',
    color: '#000',
    '&:hover': {
      backgroundColor: '#d9d9d9',
    },
    height: '51px',
    width: '150px'
  }}
  onClick={search}
>
  <Typography variant="button" sx={{ fontWeight: "bold"}}>
    Search
  </Typography>
  <SearchIcon sx={{ marginLeft: "4px"}} />
  </Button>
    </Box>
    <Box sx={{...styles.cardContainer,
      marginLeft: isSmallScreen ? 1: theme.spacing(-11)}}>
    {searchedCoouncelor.map((councelor)=>{
      console.log(councelor);
      // return <h1>{councelor.userId}</h1>
      return <BasicCard key={`card-${councelor.id}`} basicCard={councelor} sx={{marginRight: '20px', marginBottom: '20px'}}/> 

    })}
  
</Box>
    </>
  );
};

export default Search;
