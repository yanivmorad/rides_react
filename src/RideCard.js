import { Card, CardContent, CardMedia, Typography, Box, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import test_imge from './johnny depp.jpeg'
export default function RideCard(props) {
    const userId = props.user;
    const from_location =props.rideData.from_location
    const to_location = props.rideData.to_location
    const price = props.rideData.price
    const datetime = props.rideData.datetime
    const is_request = props.rideData.is_request
let cardColor;
if (is_request){
  cardColor= "#ffdb4d"
}
else{cardColor = "rgba(97, 31, 97, 0.8)"}




return(

<Card sx={{ width: 400, height: 200, backgroundColor:cardColor }}>
<Grid container>
  <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" component="div">
        John Doe
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', mb: 1, height: '100%' }}>
<LocationOnIcon sx={{ fontSize: '2rem', marginRight: 1 }} />
<Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.3rem' }}>
  {from_location}
</Typography>
<Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
  <ArrowRightAltIcon sx={{ fontSize: '2rem' }} />
</Box>
<Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.3rem' }}>
  <Box component="span" sx={{ fontWeight: 'bold' }}>
   {to_location}
  </Box>
</Typography>
</Box>

    </Box>
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', mt: 1 }}>
      <Typography variant="h5" color="text.secondary">
        {price}₪
      </Typography>
    </Box>
  </Grid>
  <Grid item xs={4}>
    <CardMedia
      component="img"
      height="150"
      image={test_imge}
      alt="profile picture"
    />
  </Grid>
</Grid>
</Card>
)}