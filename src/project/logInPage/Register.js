import { CssBaseline, Container, Box, Typography, Button, TextField, MenuItem, Select, Alert, CircularProgress, Tooltip, Avatar } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { CHECK_EMAIL_UNIQUE_URL, LOGIN, SINGUP } from '../urls';
import "./style.css"
import { IMaskInput } from 'react-imask';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteRounded';




export default function Register({registerBox,setErrorText,errorText}){
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [first_name, setFirstName] = useState("");
const [last_name, setLastName] = useState("");
const [address, setAddress] = useState("");
const [phoneNumber,setPhoneNumber] = useState("")
const [gender, setGender] = useState("");
const [picture, setPicture] = useState(null);
const [loading,setLoading] = useState("none")
const [phoneNumberError, setPhoneNumberError] = useState('');
const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  
  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    setPhoneNumber(value);
  
    // Validate phone number if not empty
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
 
  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation()
    setPicture(null);
    setSelectedImageUrl(null);
  }

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
    const url = URL.createObjectURL(file);
    setSelectedImageUrl(url);
  }
  const handleLabelClick = () => {
    if (!selectedImageUrl) {
      document.getElementById('picture').click();
    }
  }

const logIn = () => {
  const formDataLogIn = new FormData();
  console.log("user " + username);
  formDataLogIn.append('username', username);
  formDataLogIn.append('password', password);

  axios
    .post(LOGIN, formDataLogIn)
    .then((responseData) => {
      localStorage.setItem('access', responseData.data.access);
      localStorage.setItem('refresh', responseData.data.refresh);
      setErrorText(null);
      console.log("success");
      setLoading("none");
      window.open('/');
    })
    .catch((error) => {
      setLoading("none");
      if (error.response && error.response.data) {
        console.log(error);
        setErrorText(error.response.data.detail);
      } else {
        setErrorText(error);
        console.log("error");
      }
    });
};


const registerSubmit = async (event) => {
  event.preventDefault();
  setLoading("block");
  if (phoneNumber.trim() !== "") {
    const isValidPhoneNumber = /^05\d{1}-\d{7}$/.test(phoneNumber);
    if (!isValidPhoneNumber) {
      setPhoneNumberError("בבקשה תכתוב מספר טלפון נכון");
      setLoading("none");
      return;
    }
  } else {
    setPhoneNumberError("");
  }

  if (username.trim() !== ""){
    // Email format validation using regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(username);
    if (!emailRegex) {
      setLoading("none");
      setErrorText("האמייל לא כתוב בצורה נכונה")
      return;
    }
  } 
  
  if (
    username.trim() === "" ||
    password.trim() === "" ||
    first_name.trim() === "" ||
    last_name.trim() === "" ||
    gender.trim() === ""
  ) {
    setLoading("none");
    setErrorText("אנא מלא את כל השדות החובה");
    return;
  }
  setErrorText("")
  try {
    const response = await axios.get(CHECK_EMAIL_UNIQUE_URL, {
      params: { email: username },
    });
    console.log(response.data.isUnique);
    if (!response.data.isUnique) {
      setLoading("none");
      setErrorText("כתובת האימייל כבר קיימת במערכת");
      return;
    }
  } catch (error) {
    setLoading("none");
    console.log(error);
    setErrorText("אירעה שגיאה בבדיקת האימייל");
    return;
  }

  const formData = new FormData();
  if (picture !== null) {
    formData.append('file', picture);
  }

  formData.append('email', username);
  formData.append('password', password);
  formData.append('first_name', first_name);
  formData.append('last_name', last_name);
  formData.append('profile.address', address);
  formData.append('profile.gender', gender);
  formData.append('profile.phone_number', phoneNumber);

  axios.post(SINGUP, formData)
    .then((responseData) => {
      console.log("sign up success");
      logIn(); // Call the logIn function after successful registration
    })
    .catch((error) => {
      setLoading("none");
      console.log({ loading });
  
      // Extract the error message from the response
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(error.response.data, 'text/html');
      const errorMessageElement = htmlDoc.querySelector('pre.exception_value');
      const errorMessage = errorMessageElement.textContent.trim();
  
      const startIndex = errorMessage.indexOf('=') + 1;

      const specificErrorMessage = errorMessage.substring(startIndex);
  
      setErrorText(specificErrorMessage); // Set the specific error message in your application
  
      // Additional error handling if needed
      console.log(specificErrorMessage);
    });
    
};


    return(<>
    <Box 
  sx={{
    width: 300,
    height: 500,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  style={{ display: registerBox }}

>
<CircularProgress
    color="primary"
    sx={{
      position: 'absolute', // Add absolute position to the CircularProgress
      top: '40%',
      left: '45%',
      transform: 'translate(-40%, -60%)', // Translate it to the center

    }}
    size={80}
    style={{ display: loading }}
  />
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <TextField
      required
      id="username"
      label="אימייל"
      value={username}
      onChange={(event) => {
        setUsername(event.target.value);
      }}      variant="standard"
      InputLabelProps={{
        style: {direction: "rtl"}
      }}
     
      sx={{width: '200px', "& label": { right: 10 } }}
      
    />
    <TextField
      required
      id="password"
      label="סיסמה"
      type="password"
      value={password}
      onChange={(event) => {setPassword(event.target.value); 
      }}
      variant="standard"
      autoComplete="current-password"
      InputLabelProps={{
        style: {direction: "rtl"}
      }}
     
      sx={{width: '200px', "& label": { right: 10 } }}
      />
    <TextField
      required
      id="first_name"
      label="שם פרטי"
      value={first_name}
      onChange={(event) => setFirstName(event.target.value)}
      variant="standard"
      InputProps={{ style: {direction: "rtl"}
      }}
      InputLabelProps={{
        style: {direction: "rtl"}
      }}
     
      sx={{ "& label": { right: 10 } }}
    />
    
    <TextField
      required
      id="last_name"
      label="שם משפחה"
      value={last_name}
      onChange={(event) => setLastName(event.target.value)}
      variant="standard"
      InputProps={{ style: {direction: "rtl"}
    }}
    InputLabelProps={{
      style: {direction: "rtl"}
    }}
   
    sx={{ "& label": { right: 10 } }}
    />
    <TextField
      id="address"
      label="כתובת"
      value={address}
      onChange={(event) => setAddress(event.target.value)}
      variant="standard"
      InputProps={{ style: {direction: "rtl"}
      }}
      InputLabelProps={{
        style: {direction: "rtl"}
      }}
     
      sx={{ "& label": { right: 10 } }}
    />
    <Box sx={{ mt: 1 }}>
      <TextField
        required
        id="Gender"
        select
        label="מין"
        value={gender}
        onChange={(event) => setGender(event.target.value)}
        variant="standard"
        InputProps={{ style: {direction: "rtl"}
      }}
      InputLabelProps={{
        style: {direction: "rtl"}
      }}
     
      sx={{width: '200px', "& label": { right: 17 } }}
      >
        <MenuItem value="male">זכר</MenuItem>
        <MenuItem value="female">נקבה</MenuItem>
        <MenuItem value="other">אחר</MenuItem>
      </TextField>
    </Box>
    <TextField
       variant="standard"
       id="phoneNumber"
       label="מספר טלפון"
       value={phoneNumber}
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
   
   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
      <label htmlFor="picture" style={{ cursor: 'pointer' }}  >
        {!selectedImageUrl && (
          <div >
            <Tooltip title="החלף תמונת פרופיל">
              <AddPhotoAlternateIcon style={{ fontSize: '38px' }} />
            </Tooltip>
          </div>
        )}
        {selectedImageUrl && (
          <div style={{ position: 'relative' }}>
          <Avatar src={selectedImageUrl} sx={{ width: 80, height: 80 }}/>
          <div style={{ position: 'absolute', top: 75, right: 20 }}>
            <Tooltip title="מחק תמונת פרופיל">
              <DeleteForeverTwoToneIcon style={{ fontSize: '36px', color: 'black' }} onClick={handleDelete} />
            </Tooltip>
          </div>
        </div>
        )}
        <input
          id="picture"
          type="file"
          accept="image/*"
          onChange={handlePictureChange}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  

    <Button 
    onClick={registerSubmit}
      
      variant="contained" 
      sx={{ mt: 3.5, color: 'white', backgroundColor: 'primary.dark',}}
    >
      Register
    </Button>
    </Box>
  
  
</Box>

        </>
    )
}