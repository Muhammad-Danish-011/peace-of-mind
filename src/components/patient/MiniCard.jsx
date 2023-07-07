import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';


export default function OutlinedCard() {

  const [councelor, setCouncelor] = useState([])
  const [user, setUser] = useState('');

  // useEffect(()=>{
  //   console.log({availability})

  //   const councelorFun = async (ava) =>{
  //     const councelorArr = [];
  //     const councelorUrl = process.env.REACT_APP_COUNSELOR_API_KEY;
      
  //     const counId = await ava.counselorId;
  //     console.log({counId})
  //     // ava.map(async (avail) =>{
  //       let data = await fetch(`${councelorUrl}/counselor/${counId}`)
  //       data = await data.json();
  //       councelorArr.push({c: data, a: ava})
  //     // })
  //     // const usr = await user(councelorArr[0])
  //     return councelorArr;
  //   }

  //   const user = async () =>{
  //     const userUrl = process.env.REACT_APP_API_KEY;
  //     let data = await fetch(`${userUrl}/user`)
  //     data = await data.json()
  //      return data;
      
  //   }

  //   const fun = async (availability) =>{
  //     // const couArr = []
  //       const counc = await councelorFun(availability[0])
  //       const usr = await user()
  //       console.log({counc, usr})
  //       setCouncelor(counc)
  //       setUser(usr)
  //   }

  //   fun(availability)
  // },[availability])

  // useEffect(()=>{
    // console.log({councelor, user})
    // if(councelor.length > 0 && user.length > 0){
    //   const couArr = [];
    //   councelor.map((c)=>{
    //     user.map(u=>{
    //       if(c.c.userId === u.id){
    //         couArr.push({c: c.c,a: c.a, u})
    //       }
    //     })
    //   })

    //   console.log({couArr})
    // }
  // },[councelor.length > 0, user.length > 0])

  const card = (
    <React.Fragment>
      <CardContent
        style={{
          backgroundColor: 'rgb(207,227,223)',
          width: '252px',
          justifyContent: 'center',
          borderRadius: '10px',
          alignItems: 'center',
          padding: '10px',
          paddingRight: '20px',
          paddingLeft: '20px',
          height: '80px',
        }}
      >
        <Typography
          variant="h5"
          fontSize="20px"
          component="div"
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'center', sm: 'baseline' }}
          mb="5px"
        >
          Aoun Ali{' '}
          <Button
            variant="outlined"
            sx={{
              color: 'black',
              borderRadius: '15px',
              display: 'flex',
              marginLeft: { xs: '0', sm: '10px' },
              marginBottom: { xs: '5px', sm: '0' },
              fontSize: '13px',
              padding: '7px',
              bgcolor: 'white',
            }}
            size="small"
          >
            Book Now
          </Button>
        </Typography>
  
        <Typography
          sx={{ mb: 1.5 }}
          color="text.secondary"
          fontSize="15px"
          paddingRight="80px"
          marginTop="-1px"
        >
          Social Psychologist
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  return (
    <Box>

    <Box
      width="100%"
      display="flex"
      alignItems="center"
      sx={{
        borderRadius: '30px',
        marginBottom: '20px',
      }}
    >
      <Card
        style={{
          borderRadius: '20px',
          padding: '0px',
        }}
      >
        {card}
      </Card>
    </Box>
    </Box>
  );
}
