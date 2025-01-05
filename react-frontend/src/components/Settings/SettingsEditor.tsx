import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Dropdown } from '../ui/Dropdown';
import CustomSlider from '../ui/Slider';
import { useGame } from '../../contexts/GameContext';

export const SettingsEditor = () => {
  const { GOLSettings, setGOLSettings } = useGame();

  const colorOptions: string[] = ["white", "red", "black", "blue", "orange", "purple"];

  const handleColorChange = (type: 'aliveColor' | 'deadColor', index: number) => {
    setGOLSettings({
      ...GOLSettings,
      colors: {
        ...GOLSettings.colors,
        [type]: colorOptions[index],
      },
    });
  };

  const handleDimensionChange = (type: 'width' | 'height', value: number) => {
    setGOLSettings({
      ...GOLSettings,
      gridSizing: {
        ...GOLSettings.gridSizing,
        [type]: value,
      },
    });
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 400, margin: 'auto' }}>
      <Grid container spacing={1}>
        {/* Dropdowns */}
        <Grid item xs={6}>
          <Dropdown
            name="Alive Color"
            dropdownOptions={colorOptions}
            onSelect={(idx) => handleColorChange('aliveColor', idx)}
          />
        </Grid>
        <Grid item xs={6}>
          <Dropdown
            name="Dead Color"
            dropdownOptions={colorOptions}
            onSelect={(idx) => handleColorChange('deadColor', idx)}
          />
        </Grid>

        {/* Sliders */}
        <Grid item xs={12}>
          <CustomSlider
            value={GOLSettings.gridSizing.height}
            onChange={(value) => handleDimensionChange('height', value)}
            label="Height"
            min={2}
            max={20}
            step={1}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomSlider
            value={GOLSettings.gridSizing.width}
            onChange={(value) => handleDimensionChange('width', value)}
            label="Width"
            min={2}
            max={20}
            step={1}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
