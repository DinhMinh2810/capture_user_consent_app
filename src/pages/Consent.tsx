import { Fragment, useState } from "react";
import BoxScreenCenter from "../components/Box/BoxScreenCenter";
import TypographyComponent from "../components/Typography";
import { Grid, Box, Stack } from "@mui/material";
import { Check, Clear, PlayArrow, Pause } from "@mui/icons-material";
import { getDataLocalStorage } from "../lib/function";
import { IDataConsent, languageContent } from "../lib/constant";
import { toast } from "react-toastify";

const Consent = () => {
  const dataConsent = getDataLocalStorage("dataConsent");
  const language = getDataLocalStorage("language");
  const synth = window.speechSynthesis;

  const [isReadContent, setIsReadContent] = useState<{ id?: string }>({});

  const isOdd = (num: number) => {
    return num % 2;
  };
  // Speak content
  const handleSpeakContent = (data: string, name: string, id: string) => {
    if (synth.speaking) {
      return;
    }
    if (data) {
      // Get speak text
      const speakText = new SpeechSynthesisUtterance(data);
      setIsReadContent({
        id,
      });
      // Speak end
      speakText.onend = () => {
        setIsReadContent({});
      };

      // Speak error
      speakText.onerror = () => {
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });
      };

      // Speak
      synth.speak(speakText);
    } else {
      toast.error(`${name} no record.`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <BoxScreenCenter>
      <Grid container spacing={2} mt={8}>
        <Grid item xs={12} mb={4}>
          <TypographyComponent
            title={
              language === "en-US"
                ? languageContent.AllConsentEn
                : languageContent.AllConsentFr
            }
            sx={{ fontSize: "32px", fontWeight: 700, textAlign: "center" }}
          />
        </Grid>

        <Grid container item xs={12} mb={4}>
          <Grid item xs={6} sx={{ padding: "0 10px 16px 10px" }}>
            <TypographyComponent
              title={
                language === "en-US"
                  ? languageContent.DetailEn
                  : languageContent.DetailFr
              }
              sx={{ fontSize: "20px" }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ padding: "0 10px 16px 10px" }}
          >
            <TypographyComponent
              title={
                language === "en-US"
                  ? languageContent.ConsentGiveEn
                  : languageContent.ConsentGiveFr
              }
              sx={{ fontSize: "20px" }}
            />
          </Grid>

          {dataConsent?.length > 0 &&
            dataConsent.map((item: IDataConsent, index: number) => {
              return (
                <Fragment key={item.id}>
                  <Grid
                    container
                    item
                    sx={{
                      backgroundColor: !isOdd(index)
                        ? "#f2f2f2"
                        : "transparent",
                      padding: "10px 16px",
                    }}
                  >
                    <Grid item xs={6} sx={{ cursor: "pointer" }}>
                      <Stack direction="column">
                        <TypographyComponent
                          title={`${item.name}`}
                          sx={{ fontSize: "14px", color: "#bebebe" }}
                        />
                        <TypographyComponent
                          title={`${
                            language === "en-US"
                              ? languageContent.LanguageEn
                              : languageContent.LanguageFr
                          }: ${
                            item.language === "en-US" ? "English" : "Français"
                          }`}
                          sx={{ fontSize: "18px" }}
                        />
                      </Stack>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      display="flex"
                      justifyContent="flex-end"
                      sx={{ cursor: "pointer" }}
                    >
                      <Stack direction="row" alignItems="center" gap={4}>
                        <Box>
                          {item.content &&
                          item.content.indexOf(
                            item.language === "en-US" ? "yes" : "oui"
                          ) > -1 ? (
                            <Check />
                          ) : (
                            <Clear />
                          )}
                        </Box>
                        <Box
                          sx={{
                            color: "#666666",
                            backgroundColor: "#d8d8d8",
                            padding: "6px 8px",
                            borderRadius: "50%",
                          }}
                          onClick={() =>
                            handleSpeakContent(item.content, item.name, item.id)
                          }
                        >
                          {isReadContent?.id !== item.id ? (
                            <PlayArrow />
                          ) : (
                            <Pause />
                          )}
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </Fragment>
              );
            })}
        </Grid>
      </Grid>
    </BoxScreenCenter>
  );
};

export default Consent;
