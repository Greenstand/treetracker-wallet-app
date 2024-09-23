import { Link, LinkProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(16),
  fontWeight: theme.typography.fontWeightRegular,
  color: theme.palette.primary.main,
  lineHeight: 1.5,
  letterSpacing: "0.15px",
  textDecoration: "none",
  display: "inline-block",
}));

export default function CustomLink({
  href,
  children,
  ...props
}: LinkProps) {
  return (
    <StyledLink
      href={href}
      {...props}
    >
      {children}
    </StyledLink>
  );
}
