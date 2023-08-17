import axios from "axios";
import { FRIEND_REQUESTS, GET_USER } from "../urls";
import { useEffect } from "react";
import * as React from "react";
import {Alert, Box, List, TextField, Typography} from "@mui/material";
import { useState } from "react";
import FriendRequestListItem from "./FriendRequestListItem";
import FriendRequestDialog from "./FriendRequestDialog";
import "./friendPageStyle.css"
import SearchUsers from "./SearchUsers";


export default function FriendsPage() {
    const token = localStorage.getItem("access");
    const [data, setData] = useState([]);
    const [selectedFriendRequest, setSelectedFriendRequest] = useState(null);
    const [userData, setUserData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const[refresh,setRefresh] =useState("")

  const handleRefresh = () => {
    setRefresh(new Date().getTime())
  }
  
    const friendRequests = async () => {
      try {
        const response = await axios.get(FRIEND_REQUESTS, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data.filter(friendRequest => friendRequest.status === 'pending'))
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      friendRequests();
    }, [refresh]);
  
   const handleListItemClick = (friendRequest) => {
    setSelectedFriendRequest(friendRequest);
    axios.get(GET_USER + friendRequest.from_user + "/", {
        headers: { Authorization: `Bearer ${token}` },
    })
    .then((responseUserData) => {
        setUserData(responseUserData.data);
        setDialogOpen(true);
    })
    .catch((error) => {
        console.log(error);
    });
};
  
    return (
        <>   
         <Box
            sx={{
              
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >

<SearchUsers/>

         <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
           <p className="friendReqestTitel">
              בקשות חברות
            </p>            
              {data.length === 0 ? (
                <Alert variant="outlined" severity="warning">
                  אין בקשות חברות
                </Alert>
) : (
  <List dense sx={{ width: "100%", maxWidth: 360,direction: 'rtl', bgcolor: "background.paper" }}>
    {data.map((friendRequest) => (
      <FriendRequestListItem
        key={friendRequest.id}
        friendRequest={friendRequest}
        onClick={() => handleListItemClick(friendRequest)}
        onRefresh={handleRefresh}
      />
    ))}
  </List>
)}
            <FriendRequestDialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              friendRequest={selectedFriendRequest}
              userData={userData}
            />
          </Box>

         

          </Box>

          </>

        );
        
    }
  