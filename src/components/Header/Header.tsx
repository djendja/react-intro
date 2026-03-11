import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useAppSelector } from "../../state/store";
import { selectCartCount, selectCartTotal } from "../ShoppingCart/ShoppingCartSlice";
import { useAuth } from "../../providers/AuthContext";

export const Header = () => {
    const cartCount = useAppSelector(selectCartCount);
    const cartTotal = useAppSelector(selectCartTotal);
    const { logout } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: '#1a2e3f'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to='/' style={{color: 'white', textDecoration: 'none', marginRight: '15px'}}>Home</NavLink>
            <NavLink to='/posts' style={{color: 'white', textDecoration: 'none'}}>Posts</NavLink>
          </Typography>
            <NavLink to='/cart' style={{color: 'white', textDecoration: 'none', marginRight: "15px"}}>
            <ShoppingCartOutlinedIcon />
            {cartCount > 0 && cartCount}
            {cartTotal > 0 && <div>
              ${cartTotal.toFixed(2)}
            </div>}
            </NavLink>
            <NavLink to='/login' style={{color: 'white', textDecoration: 'none'}} onClick={() => logout()}>Logout</NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
