import React from 'react'
import { Box } from '@mui/system';
import PateintImage from '../../components/patient/Images/Pateintimage.jpg';
import PateintImage2 from '../../components/patient/Images/Patientimage2.jpg'
import PateintImage3 from '../../components/patient/Images/Pateintimage3.jpg.jpg'



const ImageCard = () => {
  return (
    <Box sx={{display:'flex', flexDirection:'column'}}>
     <img src={PateintImage} alt="Patient" style={{ width: '300px', height: '300px' }} />
     <img src={PateintImage2} alt="Patient" style={{ width: '300px', height: '300px' }} />
     <img src={PateintImage3} alt="Patient" style={{ width: '300px', height: '300px' }} />
    </Box>
  )
}

export default ImageCard