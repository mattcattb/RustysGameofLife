use wasm_bindgen::prelude::*;
mod game_logic;
use game_logic::game::Game;

use js_sys::Array;

// Core Library (Exports to public API) for working with javascript

#[wasm_bindgen]
pub struct GameWasm {
    game:Game
    round:u32
}

#[wasm_bindgen]
impl GameWasm {

    // create new game of height and width randomly
    pub fn new_random_game(height:usize, width:usize, tiles:String) -> Self {
        let new_tiles: Vec<char> = tiles.chars().collect();
        let board = game_logic::game::create_random_board(height, width, new_tiles);
        let game = Game::new(board);
        let round = 0;
        GameWasm { game, round }
    }

    pub fn get_grid(&self) -> Array {

        let js_array = Array::new();

        for row in self.game.get_grid().iter() {
            let js_row = Array::new();
            for &cell in row {
                js_row.push(&JsValue::from(cell.to_string())); // string to JsValue
            }
            js_array.push(&js_row);
        }

        return js_array;
    }

    pub fn next_step(&mut self){
        self.round += 1;
        self.game.next_state();
    }

    // todo: next_steps (multiple steps forward) 

    // todo: edit board 
    pub fn edit_board(&mut self){
        
    }
}