import React from 'react'
import Notes from '../../components/notes/Notes';
import PreviousNotes from '../../components/previousNotes/PreviousNotes';
import styles from './CurrentSessionNotes.module.css';

const CurrentSessionNotes = () => {
  return (
    <div className={styles.main}>
        <div className={styles.noteContainer}>
            <PreviousNotes />
            <Notes />
        </div>
    </div>
  )
}

export default CurrentSessionNotes;
