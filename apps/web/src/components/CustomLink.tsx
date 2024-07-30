import { Link, LinkProps } from "@mui/material";

export default function LinkComponent ({ href, children, ...props }: LinkProps) {
    return (
        <Link
        href={href}
        sx={{
          fontFamily: "Roboto",
          fontSize: "16px",
          fontWeight: 400,
          color: "#61892F",
          lineHeight: "24px",
          letterSpacing: "0.15px",
          textDecoration: "none",
          display: 'inline-block',
        }}
        {...props}
      >
        {children}
      </Link>
    )
}