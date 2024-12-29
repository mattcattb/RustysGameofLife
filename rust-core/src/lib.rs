use wasm_bindgen::prelude::*;
use crate::game_logic::{Game, Board};

// Core Library (Exports to public API) for working with javascript

#[wasm_bindgen]
pub struct GameWasm {
    game:Game
}

#[wasm_bindgen]
impl GameWasm {

    // create new game of height and width randomly
    pub fn new_game(height:usize, width:usize, tiles:Vec<char>) -> Self {
        let board = Game::create_random_board(height, width, tiles);
        let game = Game::new(board);
        GameWasm { game }
    }

    pub fn get_grid(&self) -> Vec<Vec<char>> {
        self.game.board.get_grid()
    }

    pub fn next_step(&mut self){
        self.game.next_state();
    }

    // todo: next_steps (multiple steps forward) 

    // todo: edit board 
}