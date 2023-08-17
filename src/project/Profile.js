import { useState } from 'react';
import { Avatar, Box, Button, CircularProgress, Container, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import { UPDATE_USER } from './urls';
import { IMaskInput } from 'react-imask';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteRounded';

export default function ProfilePage(props) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const { picture_url, first_name, last_name, email, address, gender, phone_number } = props.user;
  const [updatedFirstName, setFirst_name] = useState(first_name);
  const [updatedLastName, setLast_name] = useState(last_name);
  const [updatedAddress, setAddress] = useState(address);
  const [updatedGender, setGender] = useState(gender);
  const [updatedPhoneNumber, setPhoneNumber] = useState(phone_number);
  const [updatedPicture, setPicture] = useState("");
  const [deletePicture, setDeletePicture] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPicture(file);
      const url = URL.createObjectURL(file);
      setSelectedImageUrl(url);
      setDeletePicture(false);
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDeletePicture(true);
    setSelectedImageUrl("a");
    setPicture(null);
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    setPhoneNumber(value);

    if (value.trim() !== '') {
      const isValidPhoneNumber = /^05\d{1}-\d{7}$/.test(value);
      if (!isValidPhoneNumber) {
        setPhoneNumberError('בבקשה תכתוב מספר טלפון נכון');
      } else {
        setPhoneNumberError('');
      }
    } else {
      setPhoneNumberError('');
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = (event) => {
    event.preventDefault();
    setLoading(true);

    if (updatedPhoneNumber.trim() !== '') {
      const isValidPhoneNumber = /^05\d{1}-\d{7}$/.test(updatedPhoneNumber);
      if (!isValidPhoneNumber) {
        setPhoneNumberError('בבקשה תכתוב מספר טלפון נכון');
        setLoading(false);
        return;
      }
    } else {
      setPhoneNumberError('');
    }

    const formData = new FormData();
    if (updatedPicture) {
      formData.append('file', updatedPicture);
    }
    if (deletePicture) {
      formData.append('profile.picture_url', '');
      console.log("delete pic");
    }

    formData.append('first_name', updatedFirstName);
    formData.append('last_name', updatedLastName);
    formData.append('profile.address', updatedAddress);
    formData.append('profile.gender', updatedGender);
    formData.append('profile.phone_number', updatedPhoneNumber);

    const token = localStorage.getItem('access');

    axios.patch(UPDATE_USER, formData, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log('File Upload success');
        props.onImgUpload();
        setEditing(false);
        setLoading(false);
        setPicture("");
        setSelectedImageUrl(null);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 5 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          {loading && <CircularProgress size={60} />}
        </div>
        <Avatar src={selectedImageUrl || picture_url} sx={{marginTop:5, width: 200, height: 200 }} alt={`${first_name} ${last_name}`} />
        {editing && (
          <>
           <div style={{ position: 'relative', display: 'inline-block' }}>
  <input
    id="picture"
    type="file"
    accept="image/*"
    onChange={(event) => {
      if (event.target.files.length > 0) {
        handlePictureChange(event);
      }
    }}
    style={{ display: 'none' }}
  />
  <label htmlFor="picture">
    <div style={{ position: 'absolute', top: '30%', left: 10, transform: 'translate(-50%, -10%)', cursor: 'pointer' }}>
      <Tooltip title="החלף תמונת פרופיל">
        <AddPhotoAlternateIcon style={{ fontSize: '38px' }} />
      </Tooltip>
    </div>
  </label>
  <div style={{ position: 'absolute', top: '50%', left: 65, transform: 'translate(-50%, -10%)', cursor: 'pointer' }}>
    <Tooltip title="מחק תמונת פרופיל">
      <DeleteForeverTwoToneIcon style={{ fontSize: '36px', color: 'black' }} onClick={handleDelete} />
    </Tooltip>
  </div>
</div>

          </>
        )}
        <Typography variant="h4" component="h1" mt={2}>
          {editing ? (
            <>
              <Box sx={{ mt: 2 }}>
                <TextField
                  variant="standard"
                  required
                  id="first_name"
                  label="שם פרטי"
                  defaultValue={updatedFirstName}
                  fullWidth
                  onChange={(event) => {
                    setFirst_name(event.target.value);
                  }}
                  InputProps={{ style: { direction: "rtl" } }}
                  InputLabelProps={{
                    style: { direction: 'rtl' },
                  }}
                  sx={{ '& label': { right: 15 } }}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField
                  required
                  variant="standard"
                  id="last_name"
                  label="שם משפחה"
                  defaultValue={updatedLastName}
                  fullWidth
                  onChange={(event) => {
                    setLast_name(event.target.value);
                  }}
                  InputProps={{ style: { direction: "rtl" } }}
                  InputLabelProps={{
                    style: { direction: 'rtl' },
                  }}
                  sx={{ '& label': { right: 20 } }}
                />
              </Box>
            </>
          ) : (
              `${first_name} ${last_name}`
            )}
        </Typography>
        {editing ? null : (
          <Typography variant="body1" color="text.secondary" dir="rtl">
            אמייל: {email}
          </Typography>
        )}
        <Typography variant="body1" color="text.secondary">
          {editing ? (
            <TextField
              variant="standard"
              id="phoneNumber"
              label="מספר טלפון"
              value={updatedPhoneNumber}
              onChange={handlePhoneNumberChange}
              InputLabelProps={{
                style: { direction: 'rtl' },
              }}
              sx={{ width: '200px', '& label': { right: 20 } }}
              InputProps={{
                inputComponent: IMaskInput,
                inputProps: {
                  mask: '05#-#######',
                  definitions: {
                    '#': /[0-9]/,
                  },
                },
              }}
              error={!!phoneNumberError}
              helperText={phoneNumberError}
            />
          ) : (
              `טלפון: ${phone_number}`
            )}
        </Typography>
        <Typography variant="body1" color="text.secondary" dir="rtl">
          {editing ? (
            <TextField
              variant="standard"
              id="address"
              label="כתובת"
              defaultValue={updatedAddress}
              fullWidth
              onChange={(event) => {
                setAddress(event.target.value);
              }}
              InputLabelProps={{
                style: { direction: 'rtl' },
              }}
              InputProps={{ style: { direction: "rtl" } }}
              sx={{ '& label': { right: 20 } }}
            />
          ) : (
              ` כתובת: ${address} `
            )}
        </Typography>
        <Typography variant="body1" color="text.secondary" dir="rtl">
          {editing ? (
            <TextField
              required
              id="gender"
              select
              label="מין"
              defaultValue={updatedGender}
              variant="standard"
              onChange={(event) => {
                setGender(event.target.value);
              }}
            >
              <MenuItem value="male">זכר</MenuItem>
              <MenuItem value="female">נקבה</MenuItem>
              <MenuItem value="other">אחר</MenuItem>
            </TextField>
          ) : (
              `מין: ${gender === 'male' ? 'זכר' : gender === 'female' ? 'נקבה' : 'אחר'}`
            )}
        </Typography>
        {editing ? (
          <Box sx={{ display: 'flex', mt: 2 }}>
            <Button variant="contained" onClick={handleSaveClick} sx={{ mr: 2 }}>שמירה </Button>
            <Button color="error" variant="contained" onClick={() => { setEditing(false); setSelectedImageUrl(null); }}>ביטול שינויים</Button>
          </Box>
        ) : (
            <Button variant="contained" onClick={handleEditClick} sx={{ mt: 2 }}>שנה פרטים          </Button>
          )}
      </Box>
    </Container>
  );
};
