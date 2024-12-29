// command line app
use std::io;
use std::env;

mod game_logic;
use game_logic::game;

struct Args {
    input_board: String, // path to board .txt file! 
}

fn main() -> Result<(), io::Error>{

    let args:Vec<String> = env::args().collect();

    println!("Welcome to conways game of life!");
    display_commands();

    // first, create board using... something?

    let game = game::generate_game_with_args(args)?;

    game.print();

    // then, iterate board forever until button pressed or whatever

    game_loop(game);

    Ok(())
}


fn game_loop(mut game: game::Game){
    // do game logic stuff now!

    loop {
        println!("Turn:");
        let mut command = String::new();
        io::stdin().read_line(&mut command).unwrap();
        match command.trim(){
            "n" => {
                //todo advance state!
                println!("Going to next state!");
                game.next_state();
                game.print();
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