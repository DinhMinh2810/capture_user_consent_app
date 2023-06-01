import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface ButtonComponentProps {
  title: string;
}

const ButtonStyled = styled(Button)(() => ({
  textTransform: "capitalize",
  fontSize: "1rem",
}));

const ButtonComponent = ({ title }: ButtonComponentProps) => {
  return <ButtonStyled color="inherit">{title}</ButtonStyled>;
};

export default ButtonComponent;
