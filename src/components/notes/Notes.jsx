import React, { useState } from 'react'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import { Box, Typography, TextareaAutosize, Button, TextField, useTheme } from '@mui/material'



function Notes() {
    const [content, setContent] = useState('');

    function handleSave() {
        const currentDate = new Date();
        const timezoneOffset = currentDate.getTimezoneOffset() * 60000;
        const currentDateTime = new Date(Date.now() - timezoneOffset).toISOString();
        console.log(currentDateTime);

        const newNote = {
            // id: 1,
            appointment_id: 2,
            patientId: 2,
            created: currentDateTime,
            updated: currentDateTime,
            content: content,

        }
        fetch('http://notes.us-west-2.elasticbeanstalk.com/notes/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Note saved successfully!');
                    setContent('');
                } else {
                    throw new Error('Error saving note');
                }
            })
            .catch(error => {
                console.error('Error saving note:', error);
            });
    }
    return (
        <Box display="flex" flexDirection="column" alignItems='center'>
            <Typography variant='h4' sx={{ my: '1%', fontWeight: "bold" }}>Notes</Typography>
            <Box display="flex" flexDirection="column" alignItems='center' justifyContent='center'>
                <TextareaAutosize
                    style={{
                        backgroundColor: "white",
                        height: "40vh",
                        width: "55vw",
                        padding: "2vw",
                        outline: "none",
                        fontSize: "1.3em",
                        borderRadius: "30px",
                        border: '1px solid rgba(0, 128, 128, 1)'
                    }}
                    type="text"
                    value={content}
                    onChange={event => setContent(event.target.value)}
                    placeholder="create a note for patient"
                />
                <Box display="flex" justifyContent="flex-end" width="100%">
                    <Button
                        variant='outlined'
                        onClick={handleSave}
                        sx={{
                            backgroundColor: "white",
                            color: 'black',
                            fontSize: '1em',
                            border: '1px solid white',
                            padding: '0.5em 1em',
                            borderRadius: '15px',
                            m: 1,
                            '&:hover': {
                                border: '1px solid rgba(0, 128, 128, 1)',
                                backgroundColor: "white",

                            },
                        }}><CheckBoxRoundedIcon /> Save</Button>
                </Box>
            </Box>
            {/* cost area */}
            <Box display="flex" alignItems='center' justifyContent='center'>
                <Typography variant='h6' sx={{ mr: '2%', fontWeight: "bold" }}>Cost:</Typography>
                <TextField
                    type="text"
                    value="300$"
                    data-testid="cost-textfield"
                    InputProps={{
                        readOnly: true,
                        sx: {
                            width: "20vw",
                            height: "8vh",
                            backgroundColor: "white",
                            borderRadius: '15px',
                            fontSize: '1.3em',
                            textAlign: 'center',
                            m: 1,
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                                outline: 'none',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                                outline: 'none',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                outline: 'none',
                            },
                        },
                    }}
                />
            </Box>
        </Box>
    )
}

export default Notes