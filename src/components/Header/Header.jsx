import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: '#1a2e3f'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to='/' style={{color: 'white', textDecoration: 'none', marginRight: '15px'}}>Home</NavLink>
            <NavLink to='/posts' style={{color: 'white', textDecoration: 'none'}}>Posts</NavLink>
          </Typography>
            <NavLink to='/login' style={{color: 'white', textDecoration: 'none'}}>Login</NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
