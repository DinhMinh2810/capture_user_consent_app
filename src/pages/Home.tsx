import { useState, FormEvent } from "react";
import { Box, Grid, TextField, Autocomplete } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { IFormValues } from "../lib/type";
import TypographyComponent from "../components/Typography";
import ButtonComponent from "../components/Button";
import { languageOptions } from "../lib/constant";

const Home = () => {
  const navigate = useNavigate();
  const dataConsent = JSON.parse(localStorage.getItem("dataConsent") || "");

  const [formValues, setFormValues] = useState<IFormValues>({
    name: "",
    language: null,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.name || !formValues.language) {
      return;
    } else if (formValues.name && formValues.language) {
      if (dataConsent.length >= 1) {
        const valueArr = [...dataConsent];
        valueArr.push(formValues);
        localStorage.setItem("dataConsent", JSON.stringify(valueArr));
      } else {
        const valueArr = [];
        valueArr.push(formValues);
        localStorage.setItem("dataConsent", JSON.stringify(valueArr));
      }

      navigate("/agree");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} mt={8}>
          <Grid item xs={12} mb={4}>
            <TypographyComponent
              title="Consent Form"
              sx={{ fontSize: "32px", fontWeight: 700 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TypographyComponent title="Name" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="name"
              name="name"
              placeholder="Enter your name"
              fullWidth
              error={!formValues.name}
              helperText={!formValues.name && "Value is required!"}
              value={formValues.name}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormValues({
                  ...formValues,
                  [name]: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TypographyComponent title="Language" />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={languageOptions}
              fullWidth
              onChange={(e, value) =>
                setFormValues({
                  ...formValues,
                  language: value,
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select language"
                  error={!formValues.language}
                  helperText={!formValues.language && "Value is required!"}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} mt={4} display="flex" justifyContent="flex-end">
            <ButtonComponent title="Next" endIcon={<ArrowForwardIcon />} />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Home;
