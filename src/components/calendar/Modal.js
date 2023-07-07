import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress } from '@mui/material';

function Modal({type, open, handleClose, loader, bookAnAppointment, addAvailability, deleteAnAvailability }) {

  const handleSubmit = () => {

    if(type === 'Appointment'){
      bookAnAppointment();
    }
    else if(type === 'delete'){
      deleteAnAvailability()
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

        <DialogTitle id="draggable-dialog-title" style={{ backgroundColor: ` ${type==='delete'? '#ee0000' : '#147c74'} `, color: '#ffffff' }} >
          {
            type !== 'delete' ? (type === "Appointment" ?  "Book An Appointment" : "Add Availability") : "Delete an Availability"
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
              loader ? <CircularProgress /> : ( 
                type !== 'delete' ? (type === "Appointment" ?  "Book" : "Add") : "Delete"  
              )
            }
          </Button>
        </DialogActions>
        </DialogTitle>
      </Dialog>
    </div>
  );
}

export default Modal;