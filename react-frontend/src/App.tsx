import './styles/App.css'

import GameOfLifeView from './views/GameOfLife';
import { GameProvider } from './contexts/GameContext';
import { Container } from '@mui/material';

function App() {

  return (
  <Container 
    maxWidth="xl"
    sx={{
      backgroundColor: "#f5f5f5",
      height: '90vh',  // Ensure full height
      width: '100%',    // Ensure full width
      padding: 0,       // Optional: remove any default padding if you want the container to be edge-to-edge
      margin: 0,        // Optional: remove any default margin if you want the container to be edge-to-edge
    }}
  >
    <GameProvider>
      <GameOfLifeView />
    </GameProvider>
  </Container>     

  )
}

export default App
