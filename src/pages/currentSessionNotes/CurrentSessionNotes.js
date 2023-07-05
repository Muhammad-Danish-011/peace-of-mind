import React from 'react'
import { useParams } from 'react-router-dom';
import Notes from '../../components/notes/Notes';
import PreviousNotes from '../../components/previousNotes/PreviousNotes';
import styles from './CurrentSessionNotes.module.css';

const CurrentSessionNotes = () => {
  const param = useParams();

  return (
    <div className={styles.main}>
        <div className={styles.noteContainer}>
            <PreviousNotes id={param.pateintId} />
            <Notes pateintId={param.pateintId} appointmentId={param.appointmentId} />
        </div>
    </div>
  )
}

export default CurrentSessionNotes;
