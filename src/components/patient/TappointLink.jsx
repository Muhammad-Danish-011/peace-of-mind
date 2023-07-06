import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

const TappointLink = ({availability}) => {
  const [councelor, setCouncelor] = useState([])
  const [user, setUser] = useState('');

  useEffect(()=>{
    console.log({availability})

    const councelorFun = async (ava) =>{
      const councelorArr = [];
      const councelorUrl = process.env.REACT_APP_COUNSELOR_API_KEY;
      
      const counId = await ava.counselorId;
      console.log({counId})
      // ava.map(async (avail) =>{
        let data = await fetch(`${councelorUrl}/counselor/${counId}`)
        data = await data.json();
        councelorArr.push({c: data, a: ava})
      // })
      // const usr = await user(councelorArr[0])
      return councelorArr;
    }

    const user = async () =>{
      const userUrl = process.env.REACT_APP_API_KEY;
      let data = await fetch(`${userUrl}/user`)
      data = await data.json()
       return data;
      
    }

    const fun = async (availability) =>{
      // const couArr = []
        const counc = await councelorFun(availability[0])
        const usr = await user()
        console.log({counc, usr})
        setCouncelor(counc)
        setUser(usr)
    }

    fun(availability)
  },[availability])

  // useEffect(()=>{
    console.log({councelor, user})
    if(councelor.length > 0 && user.length > 0){
      const couArr = [];
      councelor.map((c)=>{
        user.map(u=>{
          if(c.c.userId === u.id){
            couArr.push({c: c.c,a: c.a, u})
          }
        })
      })

      console.log({couArr})
    }
  // },[councelor.length > 0, user.length > 0])

  return (
    <Typography
      sx={{
        textAlign: 'center',
        margin: '2rem auto',
        backgroundColor: '#d7eded',
        border: '1px solid #008080',
        borderRadius: '35px',
        width: '50%',
        height: '25%',
        color: 'black',
        fontWeight: 300,
        '& h1': {
          fontSize: '2.5rem',
          marginTop: '2rem',
        },
        '& h2, & h3': {
          fontSize: '1.5rem',
        },
        '@media (max-width: 768px)': {
          width: '80%',
          height: 'auto',
          '& h1': {
            fontSize: '1.3rem',
          },
          '& h2, & h3': {
            fontSize: '0.9rem',
          },
        },
        '@media (max-width: 480px)': {
          width: '90%',
          height: 'auto',
          '& h1': {
            fontSize: '1.1rem',
            marginTop: '0.5rem',
          },
          '& h2, & h3': {
            fontSize: '0.8rem',
          },
        },
      }}
    >
      <h1>Today's Appointment</h1>
      <h2>Date & Time: 22 May-2023 Friday 6:00PM</h2>
      <h3>Today's Meeting Link: www.zoom.com</h3>
    </Typography>
  );
};

export default TappointLink;
