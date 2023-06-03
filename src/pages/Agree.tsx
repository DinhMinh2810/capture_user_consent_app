import { useRef, useState, useEffect } from "react";
import BoxScreenCenter from "../components/Box/BoxScreenCenter";
import { Grid, Box, Stack } from "@mui/material";
import TypographyComponent from "../components/Typography";
import { toast } from "react-toastify";
import { getDataLocalStorage } from "../lib/function";
import ButtonComponent from "../components/Button";
import {
  KeyboardVoice,
  ArrowForward,
  PlayArrow,
  Pause,
  Redo,
} from "@mui/icons-material";
import { languageContent } from "../lib/constant";
import { useNavigate } from "react-router-dom";

const Agree = () => {
  const navigate = useNavigate();

  const synth = window.speechSynthesis;

  const language = getDataLocalStorage("language");
  const dataConsent = getDataLocalStorage("dataConsent");

  let SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  let recognition: any;

  const textReadRef = useRef<HTMLElement>(null);
  const textReadAgreeRef = useRef<HTMLElement>(null);
  const contentResultRef = useRef<any>(null);

  const [isReadContent, setIsReadContent] = useState<boolean>(false);
  const [isSwitchSpeaking, setIsSwitchSpeaking] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(true);

  // Speak content
  const handleSpeakContent = () => {
    if (synth.speaking) {
      return;
    }
    if (textReadRef.current && textReadAgreeRef.current) {
      // Get speak text
      const speakText = new SpeechSynthesisUtterance(
        textReadRef.current.outerText + textReadAgreeRef.current.outerText
      );

      // Speak end
      speakText.onend = () => {
        setIsReadContent(true);
      };

      // Speak error
      speakText.onerror = () => {
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });
      };

      // Speak
      synth.speak(speakText);
    }
  };

  const handleSwitchSpeaking = () => {
    setIsReadContent((prev) => !prev);
    setIsSwitchSpeaking((prev) => !prev);
  };

  const handleStopRecording = () => {
    recognition.stop();
    setIsSpeaking(false);
  };

  const handleSpeechToText = () => {
    try {
      setIsSpeaking(true);

      recognition = new SpeechRecognition();
      recognition.lang = language;
      recognition.interimResults = true;

      recognition.start();
      recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;
        //detect when intrim results
        if (event.results[0].isFinal) {
          contentResultRef.current.innerHTML += `${
            language === "en-US"
              ? languageContent.YouResEn
              : languageContent.YouResFr
          } '${speechResult}'`;
        }
      };
      recognition.onspeechend = () => {
        handleSpeechToText();
      };

      recognition.onerror = (event: any) => {
        handleStopRecording();
        if (event.error === "no-speech") {
          toast.error("No speech was detected. Stopping...", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (event.error === "audio-capture") {
          toast.error(
            "No microphone was found. Ensure that a microphone is installed.",
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
        } else if (event.error === "not-allowed") {
          toast.error("Permission to use microphone is blocked.", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (event.error === "aborted") {
          toast.error("Listening stopped.", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(`Error occurred in recognition: ${event.error}.`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      };
    } catch (error) {
      toast.error(`${error}.`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleClearSpeaking = () => {
    if (contentResultRef.current.innerHTML) {
      contentResultRef.current.innerHTML = "";
    }
  };

  const handleSubmitRecord = () => {
    if (!isSpeaking) {
      if (contentResultRef.current.innerHTML) {
        const lastItemArr = dataConsent.at(-1);
        dataConsent.pop();
        const newValue = [
          ...dataConsent,
          { ...lastItemArr, content: contentResultRef.current.innerHTML },
        ];

        localStorage.setItem("dataConsent", JSON.stringify(newValue));
        navigate("/consent");
      } else {
        toast.error("Please say something to record.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.error("Please turn off record.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    handleSpeakContent();
  }, []);

  return (
    <BoxScreenCenter>
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

        <Grid item xs={12} mb={4}>
          <TypographyComponent
            ref={textReadRef}
            title={
              language === "en-US"
                ? languageContent.textReadEnglish
                : languageContent.textReadFrench
            }
          />
        </Grid>

        <Grid item xs={12} mb={4}>
          <TypographyComponent
            ref={textReadAgreeRef}
            title={
              language === "en-US"
                ? languageContent.textReadAgreeEnglish
                : languageContent.textReadAgreeFrench
            }
          />
        </Grid>

        <Grid
          item
          xs={12}
          display="flex"
          justifyContent={isSwitchSpeaking ? "flex-start" : "center"}
          mt={4}
        >
          {isReadContent && (
            <Box
              sx={{
                color: "#666666",
                backgroundColor: "#d8d8d8",
                padding: "16px 20px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={handleSwitchSpeaking}
            >
              <KeyboardVoice />
            </Box>
          )}

          {isSwitchSpeaking && (
            <Stack direction="row" alignItems="center" gap={4} ml={6}>
              <Box
                sx={{
                  color: "#666666",
                  backgroundColor: "#d8d8d8",
                  padding: "16px 20px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={handleSpeechToText}
              >
                {isSpeaking ? <PlayArrow /> : <Pause />}
              </Box>
              <TypographyComponent ref={contentResultRef} title="" />
            </Stack>
          )}
        </Grid>

        {isSwitchSpeaking && (
          <Grid
            item
            xs={12}
            mt={8}
            display="flex"
            gap={2}
            justifyContent="flex-end"
            alignItems="center"
          >
            <ButtonComponent
              title={
                language === "en-US"
                  ? languageContent.RetryEnglish
                  : languageContent.RetryFrench
              }
              onClick={handleClearSpeaking}
              endIcon={<Redo />}
            />
            <ButtonComponent
              title={
                language === "en-US"
                  ? languageContent.SaveEnglish
                  : languageContent.SaveFrench
              }
              onClick={handleSubmitRecord}
              endIcon={<ArrowForward />}
            />
          </Grid>
        )}
      </Grid>
    </BoxScreenCenter>
  );
};

export default Agree;
