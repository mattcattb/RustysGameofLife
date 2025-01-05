import React, { useState } from 'react';
import { 
  Box,
  Paper,
  IconButton,
  Stack,
  Collapse
} from '@mui/material';
import { 
  Settings as SettingsIcon,
  Palette as PaletteIcon,
  PlayArrow as PlayIcon
} from '@mui/icons-material';

import Board from '../components/Board/Board';
import { SettingsEditor } from '../components/Settings/SettingsEditor';
import GameControls from '../components/Controls/GameControls';

// Define panel content and their icons in a single object for easy management
const PANELS = {
  controls: {
    icon: <PlayIcon />,
    title: 'Controls',
    component: GameControls
  },
  settings: {
    icon: <SettingsIcon />,
    title: 'Settings',
    component: SettingsEditor
  },
  palette: {
    icon: <PaletteIcon />,
    title: 'Palette',
    component: () => <Box>Pattern Palette</Box>
  }
};

function GameOfLifeView() {
  // Track which panel is currently open (if any)
  const [activePanel, setActivePanel] = useState(null);

  // Toggle panel open/closed
  const handlePanelClick = (panelKey) => {
    setActivePanel(activePanel === panelKey ? null : panelKey);
  };

  return (
    <Box sx={{ 
      display: 'flex',
      height: '100%',
      gap: 2
    }}>
      {/* Vertical Icon Bar */}
      <Paper 
        elevation={3}
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
        <Stack spacing={1}>
          {Object.entries(PANELS).map(([key, { icon, title }]) => (
            <IconButton
              key={key}
              onClick={() => handlePanelClick(key)}
              color={activePanel === key ? 'primary' : 'default'}
              // Add visual feedback for active state
              sx={{
                bgcolor: activePanel === key ? 'action.selected' : 'transparent',
                '&:hover': {
                  bgcolor: activePanel === key ? 'action.selected' : 'action.hover'
                }
              }}
            >
              {icon}
            </IconButton>
          ))}
        </Stack>
      </Paper>

      {/* Expandable Panel */}
      <Collapse 
        in={activePanel !== null} 
        orientation="horizontal"
        // Keep the panel mounted but hidden
        mountOnEnter
        unmountOnExit
      >
        <Paper
          elevation={3}
          sx={{
            width: 300,  // Fixed width for the expanded panel
            height: '100%',
            p: 2
          }}
        >
          {/* Render the active panel's component */}
          {activePanel && React.createElement(PANELS[activePanel].component)}
        </Paper>
      </Collapse>

      {/* Main Board Area */}
      <Paper 
        elevation={3}
        sx={{ 
          flexGrow: 1,
          p: 2,
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Board />
      </Paper>
    </Box>
  );
}

export default GameOfLifeView