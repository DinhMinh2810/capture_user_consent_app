import AppBar from "@mui/material/AppBar";
import { Box, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import TypographyComponent from "../components/Typography";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <NavLink to="/">
            {({ isActive }) => (
              <TypographyComponent
                title="Home"
                sx={{ marginRight: "24px", color: !isActive && "#cccccc" }}
              />
            )}
          </NavLink>
          <NavLink to="/consent">
            {({ isActive }) => (
              <TypographyComponent
                title="Consent"
                sx={{ color: !isActive && "#cccccc" }}
              />
            )}
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
