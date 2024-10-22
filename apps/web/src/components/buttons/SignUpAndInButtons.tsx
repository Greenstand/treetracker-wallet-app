import { ReactNode } from 'react';
import { Button } from '@mui/material';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  icon?: ReactNode;
  type?: 'submit' | 'button';
}

const SignUpAndInButtons: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  type,
}) => {
  return (
    <Button
      variant="outlined"
      fullWidth
      sx={{
        borderColor: 'rgb(97, 137, 47)', // Yeşil sınır rengi
        color: 'rgb(97, 137, 47)', // Yeşil metin rengi
        '&:hover': {
          borderColor: 'rgb(70, 100, 30)', // Hover durumunda daha koyu yeşil
          backgroundColor: 'rgba(97, 137, 47, 0.1)', // Hover durumunda açık yeşil arka plan
        },
      }}
      startIcon={icon ? <>{icon}</> : undefined} // show the icon
      onClick={onClick}
      type={type}
    >
      {text}
    </Button>
  );
};

export default SignUpAndInButtons;
