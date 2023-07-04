import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress } from '@mui/material';

function Modal({type, open, handleClose, loader, bookAnAppointment, addAvailability }) {

  const handleSubmit = () => {
    console.log('submit');
    if(type === 'Appointment'){
      bookAnAppointment();
    }
    else{
      addAvailability();
    }
  }

  return (
    <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >

        <DialogTitle id="draggable-dialog-title" style={{ backgroundColor: '#147c74', color: '#ffffff' }} >
          {
            type === "Appointment" ?  "Book An Appointment" : "Add Availability"
          }       
        <DialogActions sx={
          {
            marginTop: '1rem',
            '& .btn':{
              color: '#ffffff',
              ':hover':{
                background : 'rgb(3 44 41)'
              }

            },
          }
        } >
          <Button onClick={handleClose} className='btn'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className='btn'>
            {
              loader ? <CircularProgress /> : ( type === "Apppointment" ? 'Book' : "Add")
            }
          </Button>
        </DialogActions>
        </DialogTitle>
      </Dialog>
    </div>
  );
}

export default Modal;