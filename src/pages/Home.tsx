import { Grid, TextField, Autocomplete, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import TypographyComponent from "../components/Typography";
import ButtonComponent from "../components/Button";
import { languageOptions } from "../lib/constant";
import BoxScreenCenter from "../components/Box/BoxScreenCenter";
import { getDataLocalStorage } from "../lib/function";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const validationSchema = object({
  name: string().nonempty("Name is required"),
  language: string().nonempty("Language is required"),
});

type RegisterInput = TypeOf<typeof validationSchema>;

const Home = () => {
  const navigate = useNavigate();
  const dataConsent = getDataLocalStorage("dataConsent") || [];

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    if (dataConsent.length >= 1) {
      const valueArr = [...dataConsent];
      valueArr.push(values);
      localStorage.setItem("dataConsent", JSON.stringify(valueArr));
    } else {
      const valueArr = [];
      valueArr.push(values);
      localStorage.setItem("dataConsent", JSON.stringify(valueArr));
    }
    localStorage.setItem("language", JSON.stringify(values.language));
    navigate("/agree");
  };

  return (
    <BoxScreenCenter>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
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
              placeholder="Enter your name"
              fullWidth
              required
              error={!!errors["name"]}
              helperText={errors["name"] ? errors["name"].message : ""}
              {...register("name")}
            />
          </Grid>
          <Grid item xs={12}>
            <TypographyComponent title="Language" />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="language"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <Autocomplete
                  options={languageOptions}
                  onChange={(_, data) => onChange(data?.value)}
                  fullWidth
                  disablePortal
                  id="combo-box-demo"
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        placeholder="Select language"
                        error={!!errors["language"]}
                        helperText={
                          errors["language"] ? errors["language"].message : ""
                        }
                      />
                    );
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} mt={4} display="flex" justifyContent="flex-end">
            <ButtonComponent title="Next" endIcon={<ArrowForwardIcon />} />
          </Grid>
        </Grid>
      </Box>
    </BoxScreenCenter>
  );
};

export default Home;
