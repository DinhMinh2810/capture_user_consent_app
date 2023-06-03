import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface ButtonComponentProps {
  title: string;
  endIcon: JSX.Element;
  onClick?: () => void;
}

const ButtonStyled = styled(Button)(() => ({
  textTransform: "capitalize",
  fontSize: "1.25rem",
  color: "#666666",
  backgroundColor: "#d8d8d8",
  padding: "6px 24px",
}));

const ButtonComponent = ({
  title,
  endIcon,
  onClick,
  ...rest
}: ButtonComponentProps) => {
  return (
    <ButtonStyled
      variant="contained"
      endIcon={endIcon}
      type="submit"
      onClick={onClick}
      {...rest}
    >
      {title}
    </ButtonStyled>
  );
};

export default ButtonComponent;
