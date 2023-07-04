import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrapPlugin from '@fullcalendar/bootstrap';
import Modal from './Modal';

import UseFetchAvailabilities from '../../hooks/UseFetchAvailabilities';
import moment from 'moment';
import UseFetchAppointment from '../../hooks/UseFetchAppointment';

import './Calendar.css'

const Calendar = ({ type }) => {
  const obj = JSON.parse(sessionStorage.getItem('counselor_data'));
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const { data, loading, noAvailability, setLoading, fetchAllAvailability } = UseFetchAvailabilities(`/counselor/${obj.id}`);
  const { appointmentData, fetchAllAppointment } = UseFetchAppointment('/getall');
  const [event, setEvent] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [select, setSelect] = useState(null);



  useEffect(() => {
    fetchAllAvailability();
    fetchAllAppointment();
  },[])

  useEffect(() => {
    if (data.length > 0 && appointmentData.length > 0) {

      const formattedEvents = data.map(availabilities => {
        
        const startDate = new Date(availabilities.date);
        const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

        // console.log(startDate)
        // console.log(endDate)

        const isPast = new Date(startDate) < new Date();
        const isBooked = appointmentData.some(item => item.availabilityId === availabilities.id);

        
        if (isPast) {
          return {
            id: availabilities.id,
            title: 'Past',
            start: availabilities.date,
            end: endDate.toISOString(),
            color: '#888888',
          };
        } else {
          return {
            id: availabilities.id,
            title: isBooked ? 'Booked' : 'Available',
            start: availabilities.date,
            end:  endDate.toISOString(),
            color: isBooked ? '#dc3545' : '#007bff',
          };
        }
      });  
      setEvent(formattedEvents);
    }
    if(noAvailability){
       setEvent([{}]);
     }
  }, [data, appointmentData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleDateSelect = (selectInfo) => {
    console.log(selectInfo);

    let dateNow = moment().format('YYYY-MM-DDTHH:mm:ss');
    console.log(dateNow)

    if(selectInfo.endStr < dateNow ){
      console.log( 'Date is before');
      return false;
      
    }else{
      console.log(selectInfo.startStr)
      setSelect(false)
      setSelectedEvent(selectInfo.startStr);
      handleClickOpen();
    }

  }

  const handleEventClick = (clickInfo) => {
    
    console.log(clickInfo.event.startStr);    
    let dateNow = moment().format('YYYY-MM-DDTHH:mm:ss');
    console.log(dateNow)

    if(clickInfo.event.startStr < dateNow || clickInfo.event.backgroundColor === '#dc3545' ){
      console.log( 'Date is before');
     
      
    }else{
      setSelect(true)
      setSelectedEvent(clickInfo.event);
      handleClickOpen();
    }
  }

  const bookAnAppointment = async () => {
    setLoader(true);
    setLoading(true);
    try {
      console.log(selectedEvent);
      let appointment= {
        availabilityId : selectedEvent.id,
        patientid : 3,
        confirmed : false,
        deleted : 0
      }

      const response = await fetch('http://appointment.us-west-2.elasticbeanstalk.com/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });
  
      if (response.ok) {
        const responseData = await response.json();

        let newData = event.map(item=>{
          if(item.id === responseData.availabilityId){
            return { ...item , title : 'Booked', color: '#dc3545' }
          }
          else{
            return item;
          }})
          
        setEvent([...newData]);
        
        setLoading(false);
        setLoader(false);
        setOpen(false);
        console.log(data);
        console.log('Appointment submitted successfully');
      } else {
        console.error('Failed to submit appointment');
      }
    } catch (error) {
      console.error('Failed to submit appointment:', error);
    }
  };


  const addAvailability = async () => {
    setLoader(true);
    setLoading(true);
    try {
      console.log(selectedEvent);

      let dateNow = moment().format('YYYY-MM-DDTHH:mm:ssZ');
      console.log(dateNow);

      const availability = {
          counselorId : obj.id,
          created : dateNow,
          updated : dateNow,
          date : selectedEvent
      }

      const response = await fetch('http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(availability),
      });
  
      if (response.ok) {
        const responseData = await response.json();

        console.log(responseData);

        const startDate = new Date(responseData.date);
        const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

        const obj = {
          id: responseData.id,
          title: 'Available',
          start: startDate,
          end: endDate.toISOString(),
          color: '#007bff',
        }
          
        setEvent([...event, obj]);
        
        setLoading(false);
        setLoader(false);
        setOpen(false);
        console.log(data);
        console.log('Availability Added successfully');
      } else {
        console.error('Failed to submit Availability');
      }
    } catch (error) {
      console.error('Failed to submit Availability:', error);
    }
  };


  return (
    <div style={{ height :'50%', width: '50%' }}>
      <h1>Calendar</h1>

      {
        !loading && event.length > 0 && (
          <main data-testid="calendar-id" >
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin , bootstrapPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay'
              }}
              initialView='timeGridWeek'
              editable={false}
              selectable={ type === 'public' ? false : true }
              // themeSystem = 'bootstrap'
              selectMirror={true}
              dayMaxEvents={true}
              initialEvents={event}
              select={handleDateSelect}
              eventClick={type === 'public' ? handleEventClick : false}
              height={700}
            />

          </main>)
      }


      {
        select ? 
          <Modal data-testid="appointment-modal-trigger" open={open} handleClose={handleClose} loader={loader} bookAnAppointment={bookAnAppointment} type={"Appointment"} />
          :
          <Modal open={open} handleClose={handleClose} loader={loader} addAvailability={addAvailability} type={"Availability"} />

      }
    
    </div>
  )
}

export default Calendar;