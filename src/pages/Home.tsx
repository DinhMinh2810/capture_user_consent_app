import { Grid, TextField, Autocomplete, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import TypographyComponent from "../components/Typography";
import ButtonComponent from "../components/Button";
import { languageContent, languageOptions } from "../lib/constant";
import BoxScreenCenter from "../components/Box/BoxScreenCenter";
import { getDataLocalStorage } from "../lib/function";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

const validationSchema = object({
  name: string().nonempty("Required"),
  language: string().nonempty("Required"),
});

type RegisterInput = TypeOf<typeof validationSchema>;

const Home = () => {
  const navigate = useNavigate();
  const dataConsent = getDataLocalStorage("dataConsent");
  const language = getDataLocalStorage("language");

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    const dataValue = { id: uuidv4(), ...values };
    if (dataConsent?.length >= 1) {
      const valueArr = [...dataConsent];
      valueArr.push(dataValue);
      localStorage.setItem("dataConsent", JSON.stringify(valueArr));
    } else {
      const valueArr = [];
      valueArr.push(dataValue);
      localStorage.setItem("dataConsent", JSON.stringify(valueArr));
    }
    localStorage.setItem("language", JSON.stringify(dataValue.language));
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
              title={
                language === "en-US"
                  ? languageContent.ConsentFormEn
                  : languageContent.ConsentFormFr
              }
              sx={{ fontSize: "32px", fontWeight: 700, textAlign: "center" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TypographyComponent
              title={
                language === "en-US"
                  ? languageContent.NameEn
                  : languageContent.NameFr
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="name"
              placeholder={
                language === "en-US"
                  ? languageContent.EnterNameEn
                  : languageContent.EnterNameFr
              }
              fullWidth
              required
              error={!!errors["name"]}
              helperText={errors["name"] ? errors["name"].message : ""}
              {...register("name")}
            />
          </Grid>
          <Grid item xs={12}>
            <TypographyComponent
              title={
                language === "en-US"
                  ? languageContent.LanguageEn
                  : languageContent.LanguageFr
              }
            />
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
                  clearOnBlur={false}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        placeholder={
                          language === "en-US"
                            ? languageContent.SelectLanguageEn
                            : languageContent.SelectLanguageFr
                        }
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
            <ButtonComponent
              title={
                language === "en-US"
                  ? languageContent.NextEn
                  : languageContent.NextFr
              }
              endIcon={<ArrowForwardIcon />}
            />
          </Grid>
        </Grid>
      </Box>
    </BoxScreenCenter>
  );
};

export default Home;
