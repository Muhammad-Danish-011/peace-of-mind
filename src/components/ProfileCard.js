import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '1rem',
  backgroundColor: '#d7eded',
  borderRadius: '0.5rem',
  width: '87%',
  marginLeft:'7.5rem',
  marginTop: '35px !important',

  // add media query for smaller screens
  '@media (max-width: 768px)': {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0.5rem',
  }
});

const NameContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.5rem',
});

const Name = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  marginLeft: '2rem',
});

const InfoContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '50%',
  marginTop: '1rem',
  gap: '1rem', 

  // add media query for smaller screens
  '@media (max-width: 768px)': {
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem'
  }
});

const InfoItem = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

});

const InfoLabel = styled(Typography)({
  fontSize: '0.8rem',
  color: '#666',
});

const InfoValue = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  color:'#008080'
});

const ServicesContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '2rem',
});

const ServicesTitle = styled(Typography)({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginRight:'15rem',

  // add media query for smaller screens
  '@media (max-width: 768px)': {
    marginRight: 0,
    marginBottom: '1rem',
    textAlign: 'center',
  }
});

const ServicesList = styled('ul')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem',
  color:'#008080',

  // add media query for smaller screens
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)'
  }
});

const ServicesItem = styled(Typography)({
  fontSize: '0.9rem',
  fontWeight: 'bold',
});

const Description = styled(Typography)({
  marginTop: '2rem',
  textAlign: 'center',
  width:'50%',

  // add media query for smaller screens
  '@media (max-width: 768px)': {
    width: '100%',
    fontSize: '0.9rem',
  }
});

const ProfileCard = ({handleSurvey}) => {
  return (
    <Root>
      <NameContainer>
        <AccountCircleRoundedIcon style={{ fontSize: '98px' }} sx={{ color: '#008080', bgcolor: 'white', borderRadius: '50%'  }} />
        <Name variant="h5">Asad Ahmad Rao - Psychologist</Name>
      </NameContainer>
      <InfoContainer>
        <InfoItem>
          <InfoLabel>11 Year</InfoLabel>
          <InfoValue>Experience</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>99%</InfoLabel>
          <InfoValue>Satisfied Patients</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>gmail</InfoLabel>
          <InfoValue>asad@gmail.com</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>phoneNumber</InfoLabel>
          <InfoValue>03093893928</InfoValue>
        </InfoItem>
      </InfoContainer>
      <ServicesContainer>
        <ServicesTitle>Specialization</ServicesTitle>
        <ServicesList>
          <ServicesItem>Phycology</ServicesItem>
          <ServicesItem>Acupunctrurist</ServicesItem>
          <ServicesItem>Herbalist</ServicesItem>
</ServicesList>
<ServicesTitle>Services</ServicesTitle>
<ServicesList>
<ServicesItem>Phobias</ServicesItem>
<ServicesItem>Depression</ServicesItem>
<ServicesItem>Social Phobia</ServicesItem>
<ServicesItem>Mood disorders</ServicesItem>
<ServicesItem>Panic Attacks</ServicesItem>
<ServicesItem>Family Problems</ServicesItem>
</ServicesList>
</ServicesContainer>
<Description>
Asad Ahmad Rao is a consultant Psychologist. He is having over 11 year(s) of experience in the field of Psychologist and practices at Iffat Anwar Medical Complex Hospital. Field of interest includes Stress Management,Mood disorders,Emotional Outbursts,Anxiety Disorder,Depression,Family Problems,Social Phobia, Social Anxiety Disorder, Individual Psychotherapy,Phobias, Personality/ IQ Assessment, Panic Attacks,Early Parenting Issues.
</Description>
</Root>
);
};

export default ProfileCard;