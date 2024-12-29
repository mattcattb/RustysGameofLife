use rand::prelude::SliceRandom;
use super::board::Board;
use super::input_output::read_grid;
use std::io;


pub struct Game {
    board:Board
}

pub fn create_random_board(height:usize, width:usize, tiles: Vec<char>) -> Board {
    if tiles.is_empty() {
        panic!("Not enough Tile options!");
    }

    let mut rng = rand::thread_rng();

    let mut grid = Vec::new();

    for _ in 0..height {
        let mut row:Vec<char> = Vec::new();
        for _ in 0..width{
            row.push(*tiles.choose(&mut rng).expect("Failed to select random tile..."));
        }
        grid.push(row);
    }
    return Board::new(grid);
}

pub fn create_read_board(src: String) -> Result<Board, io::Error> {
    // read in .txt and create board object

    match read_grid(src) {
        Ok(result) => {
            return Ok(Board::new(result));
        }
        Err(e) => return Err(e),
    }
}

impl Game {
    pub fn new(board:Board) -> Self {
        Self {board}
    }

    pub fn get_board(&self) -> &Board {
        &self.board
    }
    pub fn next_state(&mut self) {
        let new_grid = todo!();
        self.board = Board::new(new_grid);
    }

    pub fn print(&self) {
        // print out the board and the game!
        println!("{}", self.board);
    }

}

pub fn generate_game_with_args(args: Vec<String>) -> Result<Game, io::Error> {

    let board = if args.len() < 2 {
        let tiles:Vec<char> = vec!['0', '1']; 
        let height: usize = 25;
        let width:usize = 25;
        create_random_board(height, width, tiles)       
    } else {
        let file_path = &args[1];
        create_read_board(file_path.clone())?
    };

    Ok(Game::new(board))
}