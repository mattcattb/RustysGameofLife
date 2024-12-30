use rand::prelude::SliceRandom;
use super::board::Board;
use super::input_output::read_grid;
use std::io;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum TileState {
    Alive,
    Dead,
}


pub struct Game {
    board:Board,
    char_to_state: HashMap<char, TileState> // map char to filestate
}

pub fn create_random_board(height: usize, width: usize, alive_ratio: f32, char_to_state: &HashMap<char, TileState>) -> Result<Board, io::Error> {
    use rand::Rng;
    let mut rng = rand::thread_rng();

    let grid = (0..height)
        .map(|_| {
            (0..width)
                .map(|_| {
                    if rng.gen::<f32>()< alive_ratio {
                        *char_to_state.get(&'1').unwrap_or(&TileState::Dead)
                    } else {
                        *char_to_state.get(&'0').unwrap_or(&TileState::Dead)
                    }
                })
                .collect()
        })
        .collect();

    Board::new(grid)
}


impl Game {

    pub fn new_random(height: usize, width: usize, alive_ratio: f32, char_to_state: HashMap<char, TileState>) -> Self {
        let board = Game::create_random_board(height, width, alive_ration, &char_to_state);
        Game {board, char_to_state}
    }

    pub fn new_from_file(src: String, char_to_state:Hashmap<char, TileState>) -> Result<Self, std::io::Error> {
        let grid: Vec<Vec<char>> = read_grid(src)?;
        let state_grid = self.convert_grid_to_tile_state(grid);
        let board = Board::new(state_grid);
        Ok(Game {board, char_to_state})
    }

    pub fn next_state(&mut self) {
        // TODO
        let new_grid = self.board.get_grid();
        self.board = Board::new(new_grid);
    }

    pub fn print(&self) {
        // TODO
        // print out the board and the game!
        println!("{}", self.board);
    }

    pub fn get_grid(&self) -> Vec<Vec<TileState>> {
        self.board.get_grid()
    }

    pub fn convert_grid_to_tile_state(&self, grid: Vec<Vec<char>>) -> Vec<Vec<TileState>> {
        grid.iter()
            .map(|row| row.iter().map(|&cell| *self.char_to_state.get(&cell).unwrap_or(&TileState::Dead)).collect())
            .collect()
    }

    pub fn get_grid(&self) -> Vec<Vec<char>> {
        grid.iter()
            .map(|row| row.iter().map(|&cell| match cell {
                TileState::Alive => '1',
                TileState::Dead => '0'
            }).collect())
            .collect()
    }

}

fn basic_GOL_state_map() -> HashMap<char, TileState> {
    let mut custom_map = HashMap::new();
    custom_map.insert('1', TileState::Alive);
    custom_map.insert('0', TileState::Dead);

    return custom_map;
}

pub fn generate_game_with_args(args: Vec<String>) -> Result<Game, io::Error> {

    let state_map:HashMap<char, TileState> = basic_GOL_state_map();

    let board = if args.len() < 2 {
        let ratio:f32 = 0.5; 
        let height: usize = 25;
        let width:usize = 25;
        Game::new_random(height, width, ratio, state_map)
    } else {
        let file_path = &args[1];
        Game::new_from_file(file_path.clone(), state_map)?
    };

    Ok(Game::new(board))
}