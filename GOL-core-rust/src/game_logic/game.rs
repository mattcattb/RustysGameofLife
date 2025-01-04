use rand::Rng;
use core::panic;
use std::{io, vec};
use std::collections::HashMap;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum TileState {
    Alive, 
    Dead
}

pub trait Game {
    fn next_turn(&mut self);
    fn get_grid(&self) -> Vec<Vec<char>>;
    fn print(&self);
    fn interact_tile(&mut self, r:usize, c:usize);
    fn edit_dimensions(&mut self, new_height:usize, new_width:usize);
    fn wipe(&mut self);
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct GameOfLife {
    grid:Vec<Vec<TileState>>,
    char_to_state: std::collections::HashMap<char, TileState> // map char to filestate
}

impl Game for GameOfLife {

    fn wipe(&mut self){
        // turn all to dead 
        for r in (0..self.grid.len()) {
            for c in (0.. self.grid[0].len()){
                self.grid[r][c] = TileState::Dead;
            }
        }
    }

    fn edit_dimensions(&mut self, mut new_height:usize, mut new_width:usize){
        // enter 0 for a dimention that is to stay the same
        if (new_height == 0) {new_height = self.grid.len()};
        if (new_width == 0) {new_width = self.grid[0].len()};

        let prev_height = self.grid.len();
        let prev_width = self.grid[0].len();

        let mut new_grid:Vec<Vec<TileState>> = (0..new_height)
            .map(|col| vec![TileState::Dead; new_width])
            .collect(); // collect into 2D vector

        if (new_height > prev_height){
            new_height = prev_height;
        }
        if (new_width > prev_width) {
            new_width = prev_width;
        }

        for r in (0..new_height) {
            let mut new_row: Vec<TileState> = Vec::new();
            for c in (0.. new_width) {
                // first create the width 
                new_grid[r][c] = self.grid[r][c].clone();
            }
        }

        self.grid = new_grid;

    }

    fn get_grid(&self) -> Vec<Vec<char>> {
        // returns a grid of 2D Vector of Chars based on mapping
        let grid_char: Vec<Vec<char>>= self.grid.iter()
            .map(|row| {
                row.iter()
                    .map(|val| {
                        match self.find_key_for_value(val.clone()) {
                            Some(v) => v,
                            None => panic!("Tile state not found in mapping!")
                        }
                    })
                    .collect()
            })
            .collect();

        grid_char

    }

    fn next_turn(&mut self) {
        let mut new_grid = self.grid.clone(); // copy old grid
        for (r_idx, row) in self.grid.iter().enumerate() {
            for (c_idx, value) in row.iter().enumerate() {
                let alive = self.count_alive_neighbors(r_idx, c_idx);                
                match value {
                    TileState::Alive => {
                        if alive < 2 || alive > 3 {new_grid[r_idx][c_idx] = TileState::Dead}
                    },
                    TileState::Dead => {
                        if alive == 3 {new_grid[r_idx][c_idx] = TileState::Alive}
                    }
                }

            }
        }

        self.grid = new_grid;

    }

    fn interact_tile(&mut self, r:usize, c:usize) {
        // flip tiles state!
        if r < self.grid.len() && c < self.grid[r].len() {
            match self.grid[r][c] {
                TileState::Alive => {self.grid[r][c] = TileState::Dead},
                TileState::Dead => {self.grid[r][c] = TileState::Alive}
            }
        }
        else {
            panic!("Out of bounds!!");
        }
    }

    fn print(&self) {
        let char_grid = self.get_grid();

        for row in char_grid {
            for val in row {
                print!("{}", val);
            }
            print!("\n");
        }
    }

}


impl GameOfLife {
    pub fn new_random(height: usize, width: usize, alive_ratio: f32, char_mapping:String ) -> Self {
        let mut rng = rand::thread_rng();

        let char_to_state = GameOfLife::create_char_to_state(char_mapping);

        let grid = (0..height)
            .map(|_| {
                (0..width)
                    .map(|_| {
                        match rng.gen_bool(alive_ratio as f64) {
                            true => {char_to_state.get(&'1').cloned().unwrap_or(TileState::Dead)},
                            false => char_to_state.get(&'0').cloned().unwrap_or(TileState::Dead)
                        }
                    })
                    .collect()
            })
            .collect();        
        GameOfLife {grid, char_to_state}
    }

    pub fn new_from_file(src: String, char_mapping: String) -> Result<Self, std::io::Error> {
        let file_content = std::fs::read_to_string(src)?;
        let char_to_state = GameOfLife::create_char_to_state(char_mapping);
        let grid: Vec<Vec<TileState>> = file_content
            .lines()
            .map(|line| {
                line.chars()
                    .map(|ch| char_to_state.get(&ch).cloned().unwrap_or(TileState::Dead))
                    .collect()
            })
            .collect();
        Ok(Self { grid, char_to_state })
    }

    fn create_char_to_state(char_mapping:String) -> HashMap<char, TileState> {
        let char_to_state = match char_mapping.len() {
            2 => {
                let mut hash = HashMap::new();
                hash.insert(char_mapping.chars().nth(0).unwrap(), TileState::Dead);
                hash.insert(char_mapping.chars().nth(1).unwrap(), TileState::Alive);
                hash
            },
            _ => panic!() // panic if anything else then 2
        };
        char_to_state
    }

    fn count_alive_neighbors(&self, r: usize, c: usize) -> usize {
        // Directions represent all neighbors (N, NE, E, SE, S, SW, W, NW)
        let directions = vec![
            (-1, -1), (-1, 0), (-1, 1),
            (0, -1),         (0, 1),
            (1, -1), (1, 0), (1, 1),
        ];
    
        let mut alive = 0;
    
        for (row_dir, col_dir) in directions.iter() {
            let neighbor_r = r as i32 + row_dir;
            let neighbor_c = c as i32 + col_dir;
    
            if let Some(tile) = self.get_tilestate(neighbor_r, neighbor_c) {
                if tile == TileState::Alive {
                    alive += 1;
                }
            }
        }
    
        alive
    }
    
    fn get_tilestate(&self, r: i32, c: i32) -> Option<TileState> {
        if r >= 0 && c >= 0 {
            let r = r as usize;
            let c = c as usize;
    
            if r < self.grid.len() && c < self.grid[0].len() {
                return Some(self.grid[r][c].clone());
            }
        }
        None
    }

    fn find_key_for_value(&self, value: TileState) -> Option<char> {
        self.char_to_state.iter()
            .find_map(|(key, val)| if *val == value { Some(*key) } else { None })
    }
    

}

fn basic_GOL_state_map() -> HashMap<char, TileState> {
    let mut custom_map = HashMap::new();
    custom_map.insert('1', TileState::Alive);
    custom_map.insert('0', TileState::Dead);

    return custom_map;
}

pub fn generate_game_with_args(args: Vec<String>) -> Result<GameOfLife, io::Error> {
    //! &str vs string error!

    let char_mapping = String::from("01");

    let game = if args.len() < 2 {
        let ratio:f32 = 0.5; 
        let height: usize = 25;
        let width:usize = 25;
        GameOfLife::new_random(height, width, ratio, char_mapping)
    } else {
        let file_path = &args[1];
        GameOfLife::new_from_file(file_path.clone(), char_mapping)?
    };

    Ok(game)
}