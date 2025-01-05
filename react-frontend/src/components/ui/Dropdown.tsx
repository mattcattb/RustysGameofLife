import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
  dropdownOptions: string[];
  name: string;
  onSelect: (idx: number) => void;
};

export const Dropdown = ({ dropdownOptions, name, onSelect }: Props) => {
  const [selectedIdx, setSelectedIdx] = React.useState(0);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const newIdx = event.target.value as number;
    setSelectedIdx(newIdx);
    onSelect(newIdx);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`${name}-select-label`}>{name}</InputLabel>
        <Select
          labelId={`${name}-select-label`}
          id={`${name}-select`}
          value={selectedIdx}
          label={name}
          onChange={handleChange}
        >
          {dropdownOptions.map((option, idx) => (
            <MenuItem key={idx} value={idx}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
