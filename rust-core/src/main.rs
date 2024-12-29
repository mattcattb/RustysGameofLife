// command line app
use std::io;
use std::env;

use game_logic::board::Board;

mod utils;
mod game_logic;

struct Args {
    input_board: String, // path to board .txt file! 
}

fn main() {

    let args:Vec<String> = env::args().collect();
    dbg!(args);

    println!("Welcome to conways game of life!");
    display_commands();

    // first, create board! 
    let board: game_logic::board::Board = Board::new();
    board.print();

    // then, iterate board forever until button pressed or whatever

    game_loop(board);
}


fn game_loop(board: game_logic::board::Board){
    // do game logic stuff now!

    loop {
        println!("Turn:");
        let mut command = String::new();
        io::stdin().read_line(&mut command).unwrap();
        match command.trim(){
            "n" => {
                //todo advance state!
                println!("Going to next state!");
            }
            "q" => {
                println!("Quitting game!");
                break;
            }
            _ => {
                println!("Invalid Command, start again.");
                continue;
            }
        }

    }

}

fn display_commands(){
    println!("Commands: n (next), q (quit)");
}