import React from "react";
import BoxScreenCenter from "../components/Box/BoxScreenCenter";
import { Grid, Box } from "@mui/material";
import TypographyComponent from "../components/Typography";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

const Agree = () => {
  return (
    <BoxScreenCenter>
      <Grid container spacing={2} mt={8}>
        <Grid item xs={12} mb={4}>
          <TypographyComponent
            title="Consent Form"
            sx={{ fontSize: "32px", fontWeight: 700 }}
          />
        </Grid>

        <Grid item xs={12} mb={4}>
          <TypographyComponent title="You understand that by using the site or site services, you agree to be bound by this agreement. If you do not accept this agreement in its entirety, you must not access or use the site or the site services" />
        </Grid>

        <Grid item xs={12} mb={4}>
          <TypographyComponent
            title={`Do you agreee to this agreement? Please respond by saying "Yes" or "No"`}
          />
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="center" mt={4}>
          <Box
            sx={{
              color: "#666666",
              backgroundColor: "#d8d8d8",
              padding: "10px 14px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            <KeyboardVoiceIcon />
          </Box>
        </Grid>
      </Grid>
    </BoxScreenCenter>
  );
};

export default Agree;
