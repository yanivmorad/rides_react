import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import MutualFriends from "./MutualFriends";

export default function FriendRequestDialog({  open, onClose, friendRequest, userData }) {
    

    if (!friendRequest) {
      return null;
     
    }
  
    return (
      <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Box sx={{ textAlign: 'center' }}>
          <Avatar
            src={userData.picture_url}
            sx={{ width: 160, height: 160, mx: 'auto', mb: 1 }}
          />
          <Typography sx={{ fontSize: '1.2rem', mb: 1 }}>
            {userData.first_name + " " + userData.last_name}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '1.2rem', mb: 1, textAlign: 'right' }}>
          <strong>טלפון:</strong> {userData.phone_number}
        </Typography>
        <Typography sx={{ fontSize: '1.2rem', textAlign: 'right' }}>
          <strong>כתובת:</strong> {userData.address}
        </Typography>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="" sx={{ textAlign: 'center' }}>
            חברים משותפים
          </Typography>
          <MutualFriends userID={userData.id} />
        </Box>
      </DialogContent>
    </Dialog>
    
    );
  }