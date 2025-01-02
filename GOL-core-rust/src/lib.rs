use wasm_bindgen::prelude::*;
mod game_logic;
use game_logic::game::{Game, GameOfLife};

use js_sys::Array;

// Core Library (Exports to public API) for working with javascript

#[wasm_bindgen]
pub struct GameWasm {
    game:GameOfLife,
    pub round:u32
}

#[wasm_bindgen]
impl GameWasm {

    // create new game of height and width randomly
    pub fn new_random_game(height:usize, width:usize, tiles:String) -> Self {
        // tiles are a string where the first char is dead, and the second char is alive. 
        let game = GameOfLife::new_random(height, width, 0.5, tiles);
        let round = 0;
        GameWasm { game, round }
    }

    pub fn get_grid(&self) -> Array {

        let grid = self.game.get_grid();
        let js_array = char_grid_to_array_string(grid);

        return js_array;
    }

    pub fn next_turn(&mut self){
        self.round += 1;
        self.game.next_turn();
    }

    // todo: edit board 
    pub fn interact_tile(&mut self, r:usize, c:usize){
        self.game.interact_tile(r, c);
    }

    pub fn edit_dimensions(&mut self, new_width:usize, new_height:usize){
        self.game.edit_dimensions(new_width, new_height);
    }
}

#[wasm_bindgen]
pub fn init() {
    // Any initialization logic you need (if any)
    // For example, you can load any global settings or initial setup if needed
    // The init function can be empty or contain setup code, if required
}

fn char_grid_to_array_string(grid: Vec<Vec<char>>) -> Array {
    // converts rust char 2D array grid to a Array of strings for js

    let js_array = Array::new();


    for row in grid.iter() {
        let js_row = Array::new();
        for &cell in row {
            js_row.push(&JsValue::from(cell.to_string())); // string to JsValue
        }
        js_array.push(&js_row);
    }

    js_array
}
