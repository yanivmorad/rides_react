
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from '@mui/material/Tooltip';
const CardSkeleton = () => {
    return ( <Card
        sx={{
          width: [300,440],
        //   minWidth: [290, 400],
          height: [155,180],
          marginLeft: 1,
          backgroundColor: "#f2f2f2",
          borderRadius: '16px',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Grid container dir="rtl" direction="column">
          <Grid item xs={8}>
            <Grid container direction="row">
              <Grid item xs={10} direction="row">
                <Grid container direction="column" marginTop={[0,0.7]}>
                  <Grid
                    item
                    alignItems="center"
                    direction="row"
                    display="flex"
                    justifyContent="space-around"
                    marginTop={"1rem"}
                    marginBottom={"1rem"}
                  >
                    <Skeleton variant="text" width={100} height={40} />
                    <Skeleton variant="text" width={40} height={30} />
                    <Skeleton variant="text" width={100} height={40} />
                  </Grid>
                  <Grid
                    item
                    alignItems="center"
                    direction="row"
                    display="flex"
                    marginTop={[-1,"5px"]}
                    justifyContent="space-around"
                  >
                    <Box
                      direction="row"
                      display="flex"
                      style={{ marginRight: ['1px'] }}
                    >
                      <Skeleton variant="text" width={[40,60]} height={20} />
                      <Box display="flex" alignItems="center">
                        <Skeleton variant="text" width={10} height={20} />
                        <Skeleton variant="text" width={40} height={20} />
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Skeleton variant="text" width={30} height={20} />
                      <Skeleton variant="text" width={50} height={20} />
                    </Box>
                    <Box>
                      <Skeleton variant="text" width={60} height={20} />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={4}
            direction="row"
            alignItems="center"
            display="flex"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Skeleton
                variant="circular"
                sx={{
                    width: '60px',
                    height: '60px',
                    '@media (min-width: 600px)': {
                      width: '80px',
                      height: '80px',
                    },
                    marginLeft: '10px',
                    marginRight: '2px',
                  }}
            
              />
              <Skeleton variant="text" width={80} height={20} />
            </Box>
             
              <Box marginLeft={5}>
                <Skeleton variant="text" width={80} height={20} />
              </Box>
         
          </Grid>
        </Grid>
      </Card>
      );
    };
    export default CardSkeleton;
