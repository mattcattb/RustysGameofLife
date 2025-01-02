# Rustys Game of Life

## Features

- **Simulation in Rust**: Write modular and fast core game logic in Rust.
- **CML Integration**: Allow parts to be done in command line for debugging and non web-app usage.
- **Web Integration**: Use react to fully integrate Rust using WebAssembly. Create games and rules with graphical interface.
- **Multiple Gametypes**: Expand to produce alternate simulations such as elementals, water, etc.

# Technologies Used

- **Rust**: Core simulation logic.
- **Web Assembly**: Compile Rust for Web Use.
- **React**: Interactivity display.
- **Cargo**: Rust Package and Build Manager.

## Goals

Going into this project, I had a few goals. I wanted to **learn rust as fast and effectively as possible**, and provide myself with a strong challenge for doing so. Rusts high flexibility in web-development and embedded systems and its highly effective memory management system made me excited to build and learn with it.

A major goal was to create **strong development habits and practices**. I wanted to practice a **test driven development**, with many test cases written before any code was written. I wanted to **define an MVP**, and write out *explicitly defined features* I wanted to create. I finally wanted to **practice version control**, with all parts of this project developed strongly with github. 

I finally wanted to continue practicing web technologies, and specifically combine a non-javascript code with frontend React to produce results.


## Useage 


## Features 

### MVP Features:
- Core Simulation for Conways game of life.
- Command line display for moving snapshots of game.
- Configurable initial setup (tile placements and game config)
- Pausable, forward game movement.
- Basic elements that use interactions similar to conways (air, stone, dirt, water).

### Feature List

#### Core Features 
- Simulate 2D Cells Game Grid
- Impliment Conways Rules
- Allow forward iteration

#### Command Line Integration
- Show grid in terminal
- Allow file initial configurations to be set
- Pause, resume, step through states

#### Web App Integration
- Provide app view of grid
- Allow forward and backward, playback speed control for browser
- Draw on board with clicks and interation
- Set the board state and edit anytime during simulation

#### Advanced Features
- Elements Simulation 
- Alternate Gamemodes
- Store users past games on a home page

