import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ButtonComponent from "../components/Button";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <ButtonComponent title="Home" />
          <ButtonComponent title="Consents" />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
