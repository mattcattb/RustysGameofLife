import React from 'react';
import { Button, ButtonProps } from '@mui/material';

type CustomButtonProps = ButtonProps & {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: 'primary' | 'secondary' | 'error'; // You can expand this if needed
};

const CustomButton = ({ icon, label, onClick, color, ...rest }: CustomButtonProps) => {
  return (
    <Button
      variant="contained"
      color={color}
      onClick={onClick}
      startIcon={icon}
      sx={{
        paddingX: 2, // Custom horizontal padding
        paddingY: 1, // Custom vertical padding
        fontWeight: 'bold', // Optional, bold text
        textTransform: 'none', // Optional, prevents uppercase transformation
        '&:hover': {
          opacity: 0.8, // Slightly reduce opacity on hover
        },
        ...rest.sx, // Spread additional styles if any are passed via `sx`
      }}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
