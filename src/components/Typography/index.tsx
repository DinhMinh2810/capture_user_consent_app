import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

interface TypographyComponentProps {
  title: string;
  sx?: object;
}

const TypographyStyled = styled(Typography)(() => ({
  color: "#666666",
}));

const TypographyComponent = ({
  title,
  sx,
  ...rest
}: TypographyComponentProps) => {
  return (
    <TypographyStyled variant="h6" sx={{ ...sx }} {...rest}>
      {title}
    </TypographyStyled>
  );
};

export default TypographyComponent;
