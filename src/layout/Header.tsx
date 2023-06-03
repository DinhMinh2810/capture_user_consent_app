import AppBar from "@mui/material/AppBar";
import { Box, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import TypographyComponent from "../components/Typography";
import { getDataLocalStorage } from "../lib/function";
import { languageContent } from "../lib/constant";

const Header = () => {
  const language = getDataLocalStorage("language");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <NavLink to="/">
            {({ isActive }) => (
              <TypographyComponent
                title={
                  language === "en-US"
                    ? languageContent.HomeEn
                    : languageContent.HomeFr
                }
                sx={{ marginRight: "24px", color: !isActive && "#cccccc" }}
              />
            )}
          </NavLink>
          <NavLink to="/consent">
            {({ isActive }) => (
              <TypographyComponent
                title={
                  language === "en-US"
                    ? languageContent.ConsentEn
                    : languageContent.ConsentFr
                }
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
