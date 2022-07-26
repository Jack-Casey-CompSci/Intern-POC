import * as React from 'react';
import {styled} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {mainListItems, secondaryListItems} from './listItems';
import {Button,Container,FormControl,Grid,InputLabel,MenuItem,Paper,Select,SelectChangeEvent,TextField} from '@mui/material';
import Axios from 'axios';
import { columnsStateInitializer } from '@mui/x-data-grid/internals';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  })
);

export default function FormPropsTextFields() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;


  const [address, setAddress] = React.useState('');
  const [size, setSize] = React.useState<number | null>(null);
  const [type, setType] = React.useState('');
  const [market, setMarket] = React.useState('');

  const selectType = [
    {
      value: 'Office',
      label: 'Office',
    },
    {
      value: 'Industrial',
      label: 'Industrial',
    },
  ];

  const selectMarket = [
    {
      value: 'New York, NY',
      label: 'New York, NY',
    },
    {
      value: 'Los Angeles, LA',
      label: 'Los Angeles, LA',
    },
    {
      value: 'Philadelphia, PA',
      label: 'Philadelphia, PA',
    },
    {
      value: 'Dallas, TX',
      label: 'Dallas, TX',
    },
    {
      value: 'Chicago, IL',
      label: 'Chicago, IL',
    },
  ];

  const submitProperty = (e:any) => {
    e.preventDefault();
    console.log('in one');
    try {
    Axios.post("http://localhost:3001/api/insert", { 
      address: address, 
      size: size,
      type: type, 
      market: market,
    })
      .then(() => {
        alert('Success! New asset is saved to database.')
    })
      .catch(() => {
        alert('Error! New asset didnt save to database.')
      });
    } catch (err) {
      console.log(err);
      alert('Error! Database call failed to execute')
    }  
  };

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && {display: 'none'}),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{my: 1}} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
          <Box component="form" onSubmit={submitProperty} autoComplete="off">
            <Paper sx={{mb: 3, p: 3}}>
              <Typography variant="h4" sx={{mb: 3}}>
                Add Property
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    id="outlined-address"
                    label="Property Address"
                    required
                    variant="outlined"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    error={format.test(address)}
                    helperText={format.test(address) ? 'invalid address' : ' '}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-size"
                    label="Size (sq. ft)"
                    type="number"
                    variant="outlined"
                    required
                    inputProps={{min: 0, max: 10000000}}
                    onChange={(e) => {
                      setSize(Number(e.target.value));
                    }}
                    error={size === 0}
                    helperText={size === 0 ? 'invalid size' : ' '}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl sx={{minWidth: 250}}>
                    <InputLabel id="Property-Type">Property Type</InputLabel>
                    <Select
                      id="outlined-type"
                      labelId="Property-Type"
                      variant="outlined"
                      value={type}
                      autoWidth
                      required
                      onChange={(e: SelectChangeEvent) => {
                        setType(e.target.value);
                      }}
                      label="Property Type"
                    >
                      {selectType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl sx={{minWidth: 250}}>
                    <InputLabel id="Property-Market">Property Market</InputLabel>
                    <Select
                      id="outlined-basic"
                      labelId="Property-Market"
                      value={market}
                      autoWidth
                      required
                      variant="outlined"
                      onChange={(e: SelectChangeEvent) => {
                        setMarket(e.target.value);
                      }}
                      label="Property Market"
                    >
                      {selectMarket.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" type="submit" sx={{mt: 3}}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
