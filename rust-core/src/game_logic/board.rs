use rand::seq::SliceRandom;

use crate::utils::input_output::read_grid;

#[derive(Debug, Clone)]
pub struct Board {
    width: usize,
    height: usize,
    grid: Vec<String>, // Linear representation of the grid
}


pub fn random_board(height:i32, width:i32, tiles: Vec<char>) -> Board {
    if tiles.is_empty() {
        panic!("Not enough Tile options!");
    }

    let mut rng = rand::thread_rng();

    let mut grid = Vec::new();

    for _ in 0..height {
        let row: String = (0..width)
            .map(|_| *tiles.choose(&mut rng).expect("Failed to select a random tile"))
            .collect();
        grid.push(row);
    }

    return Board::new(grid);
}

impl Board {
    // Constructor
    pub fn new(grid: Vec<String>) -> Board {
        
        let height:usize = grid.len();
        let width:usize = if height > 0 { grid[0].len() } else { 0 };
        return Board { width, height, grid };
    }

    // Get the value of a cell
    pub fn get(&self, x: usize, y: usize) -> bool {
        self.grid[x][y]
    }

    // Set the value of a cell
    pub fn set(&mut self, x: usize, y: usize, value: bool) {
        self.grid[x][y] = value;
    }

    // Apply a function to all cells (e.g., for rendering)
    pub fn for_each_cell<F: FnMut(usize, usize, bool)>(&self, mut f: F) {
        for y in 0..self.height {
            for x in 0..self.width {
                f(x, y, self.get(x, y));
            }
        }
    }
}
