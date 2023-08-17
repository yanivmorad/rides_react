import axios from "axios"
import { MUYUAL_FRIENDS } from "./urls"
import { Alert, Avatar, AvatarGroup, Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"



export default function MutualFriends({userID}){
    const [mutualList, setMutualListl] = useState([])
    const token = localStorage.getItem('access')
    const getMutual =()=>{axios.get(MUYUAL_FRIENDS+`${userID}`, {headers: {Authorization: `Bearer ${token}`}})
    .then((response) => {
        setMutualListl(response.data)})
    }
    console.log(mutualList);
 
    useEffect(() => {
        getMutual()
      }, [])
return(<>
<Box sx={{ display: 'flex' }}>
{mutualList.length > 0 ? (
  mutualList.map((mutualFriend) => (
    <div style={{ alignItems: 'center', marginLeft: '10px' }}>
    <Avatar
      src={mutualFriend.picture_url}
      style={{ margin: '0 auto', marginTop: '5px',width: '55px', height: '55px' }}
    />
    <p style={{ marginTop: '5px' }}>{mutualFriend.first_name + " " + mutualFriend.last_name}</p>
  </div>
  
  ))
) : (
  <Alert variant="outlined" severity="warning">
  אין חברים משותפים</Alert>
)}



  
</Box>
    </>)
    
}
