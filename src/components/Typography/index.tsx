import { forwardRef, ForwardedRef } from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

interface ClickableListProps<T> {
  title: string;
  sx?: object;
  className?: string;
}

const TypographyStyled = styled(Typography)(() => ({
  color: "#666666",
}));

function ClickableListInner<T>(
  props: ClickableListProps<T>,
  ref: ForwardedRef<HTMLUListElement>
) {
  return (
    <TypographyStyled
      ref={ref}
      variant="h6"
      className={props.className}
      sx={{ ...props.sx }}
    >
      {props.title}
    </TypographyStyled>
  );
}

const TypographyComponent = forwardRef(ClickableListInner);

export default TypographyComponent;
