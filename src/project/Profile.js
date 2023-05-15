import { useState } from 'react';
import { Avatar, Box, Button, Container, MenuItem, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { UPDATE_USER } from './urls';

export default function ProfilePage(props) {
  const [editing, setEditing] = useState(false);
  const { picture_url, first_name, last_name, email, address, gender } = props.user;
  const [updatedFirstName, setFirst_name] = useState(first_name);
  const [updatedLastName, setLast_name] = useState(last_name);
  const [updatedEmail, setEmail] = useState(email);
  const [updatedAddress, setAddress] = useState(address);
  const [updatedGender, setGender] = useState(gender);


  const handleEditClick = () => {
    setEditing(true)
  };

  const handleSaveClick = (event) => {
    event.preventDefault();


    const requestBody = {
      email: updatedEmail,
      first_name: updatedFirstName,
      last_name: updatedLastName,
      profile: {
        picture_url: picture_url,
        address: updatedAddress,
        gender: updatedGender,
      }
    };
    const token = localStorage.getItem('access')

    axios.patch(UPDATE_USER, requestBody, {headers: {Authorization: `Bearer ${token}`}})
    .then((res) => {
      console.log("File Upload success");
      props.onImgUpload()
      setEditing(false)
    })
    .catch((err) =>{ console.log(err)

    });
};

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 5 }}>
        <Avatar src={picture_url} sx={{ width: 200, height: 200 }} alt={`${first_name} ${last_name}`} />
        <Typography variant="h4" component="h1" mt={2}>
          {editing ? (
            <>
            <Box sx={{ mt: 2 }}>
              <TextField
                required
                id="first_name"
                label="First Name"
                defaultValue={updatedFirstName}
                fullWidth
                onChange={(event)=>{setFirst_name(event.target.value)}}
              />
              </Box>
               <Box sx={{ mt: 2 }}>
              <TextField
                required
                id="last_name"
                label="Last Name"
                defaultValue={updatedLastName}
                fullWidth
                onChange={(event)=>{setLast_name(event.target.value)}}
              />
              </Box>
            </>
          ) : (
            `${first_name} ${last_name}`
          )}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" color="text.secondary">
            {editing ? (
              <TextField
                required
                id="email"
                label="Email"
                defaultValue={updatedEmail}
                fullWidth
                onChange={(event)=>{setEmail(event.target.value)}}

              />
            ) : (
              `Email: ${email}`
            )}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {editing ? (
              <TextField
                required
                id="address"
                label="Address"
                defaultValue={updatedAddress}
                fullWidth
                onChange={(event)=>{setAddress(event.target.value)}}

              />
            ) : (
              `Address: ${address}`
            )}
          </Typography>
          <Typography variant="body1" color="text.secondary">
  {editing ? (
    <TextField
      required
      id="gender"
      select
      label="Gender"
      defaultValue={updatedGender}
      fullWidth
      onChange={(event)=>{setGender(event.target.value)}}

    >
      <MenuItem value="male">Male</MenuItem>
      <MenuItem value="female">Female</MenuItem>
      <MenuItem value="other">Other</MenuItem>
    </TextField>
  ) : (
    `Gender: ${gender}`
  )}
</Typography>
        </Box>
        {editing ? (
          <Box sx={{ display: 'flex', mt: 2 }}>
            <Button variant="contained" onClick={handleSaveClick} sx={{ mr: 2 }}>Save</Button>
            <Button variant="contained" onClick={() => setEditing(false)}>Cancel</Button>
          </Box>
        ) : (
          <Button variant="contained" onClick={handleEditClick} sx={{ mt: 2 }}>Edit Details</Button>
        )}
      </Box>
    </Container>
  );
};
