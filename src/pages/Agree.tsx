import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import BoxScreenCenter from "../components/Box/BoxScreenCenter";
import { Grid, Box, Stack } from "@mui/material";
import TypographyComponent from "../components/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { toast } from "react-toastify";
import { getDataLocalStorage } from "../lib/function";
import ButtonComponent from "../components/Button";
declare global {
  interface Window {
    example: any; // 👈️ turn off type checking
  }
}

const Agree = () => {
  const synth = window.speechSynthesis;
  const language = getDataLocalStorage("language");

  const recordBtn = document.querySelector(".record"),
    result: any = document.querySelector(".result"),
    downloadBtn: any = document.querySelector(".download"),
    inputLanguage: any = document.querySelector("#language"),
    clearBtn: any = document.querySelector(".clear");
  const interim = document.querySelector(".interim");
  let SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;
  let recognition: any;
  let recording = false;

  const textReadRef = useRef<any>(null);
  const textReadAgreeRef = useRef<any>(null);

  const [isReadContent, setIsReadContent] = useState<boolean>(false);
  const [isSwitchSpeed, setIsSwitchSpeed] = useState<boolean>(false);
  // Speak
  const speakContent = () => {
    if (synth.speaking) {
      return;
    }
    if (textReadRef.current && textReadAgreeRef.current) {
      // Get speak text
      const speakText = new SpeechSynthesisUtterance(
        textReadRef.current.outerText + textReadAgreeRef.current.outerText
      );

      // Speak end
      speakText.onend = (e) => {
        setIsReadContent(true);
      };

      // Speak error
      speakText.onerror = (e) => {
        console.error("Something went wrong");
      };

      // Speak
      synth.speak(speakText);
    }
  };

  const handleSwitchSpeed = () => {
    setIsReadContent((prev) => !prev);
    setIsSwitchSpeed((prev) => !prev);
  };

  const stopRecording = () => {
    recognition.stop();
    recording = false;
  };

  const speechToText = () => {
    try {
      recognition = new SpeechRecognition();
      recognition.lang = language.value;
      recognition.interimResults = true;

      recognition.start();
      recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;

        if (!document.querySelector(".interim")) {
          const interim = document.createElement("p");
          interim.classList.add("interim");
          result.appendChild(interim);
        }

        // Update the interim p with the speech result

        if (interim) {
          interim.innerHTML = `You response: ${speechResult}`;
        }
      };

      recognition.onerror = (event: any) => {
        stopRecording();
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
          toast.error("Listening Stopped.", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(`Error occurred in recognition: ${event.error}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      };
    } catch (error) {
      recording = false;
      console.log(error);
    }
  };

  const handleClearSpeed = () => {
    if (interim) interim.innerHTML = "";
  };

  useEffect(() => {
    speakContent();
  }, []);

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
          <TypographyComponent
            ref={textReadRef}
            title="You understand that by using the site or site services, you agree to be bound by this agreement. If you do not accept this agreement in its entirety, you must not access or use the site or the site services"
          />
        </Grid>

        <Grid item xs={12} mb={4}>
          <TypographyComponent
            ref={textReadAgreeRef}
            title={`Do you agree to this agreement? Please respond by saying "Yes" or "No"`}
          />
        </Grid>

        <Grid
          item
          xs={12}
          display="flex"
          justifyContent={isSwitchSpeed ? "flex-start" : "center"}
          mt={4}
        >
          {/* {isReadContent && (
            <Box
              sx={{
                color: "#666666",
                backgroundColor: "#d8d8d8",
                padding: "16px 20px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={handleSwitchSpeed}
            >
              <KeyboardVoiceIcon />
            </Box>
          )} */}

          {/* {isSwitchSpeed && <p onClick={speechToText}>Start Listening</p>
        <div
          className="result"
          spellCheck="false"
          placeholder="Text will be shown here"
        >
          <p className="interim"></p>
        </div>} */}

          <Stack direction="row" alignItems="center" gap={4} ml={6}>
            <Box
              sx={{
                color: "#666666",
                backgroundColor: "#d8d8d8",
                padding: "16px 20px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={speechToText}
            >
              <PlayArrowIcon />
            </Box>
            <TypographyComponent className="interim" title="" />
          </Stack>
        </Grid>

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
            title="Retry"
            onClick={handleClearSpeed}
            endIcon={<ArrowForwardIcon />}
          />
          <ButtonComponent title="Save" endIcon={<ArrowForwardIcon />} />
        </Grid>
      </Grid>
    </BoxScreenCenter>
  );
};

export default Agree;
