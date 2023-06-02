import { Box } from "@mui/material";

interface BoxScreenCenterProps {
  children: JSX.Element;
}

const BoxScreenCenter = ({ children }: BoxScreenCenterProps) => {
  return (
    <Box
      sx={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Box>
  );
};

export default BoxScreenCenter;
