use std::fs::File;
use std::io::{self, Bufread};
use std::path::Path;
use std::io::BufReader;

pub fn read_grid(filename: &str) -> Vec<String> {
    // create a struct of file characters
    let mut board = Vec<String>::new();
    if let Ok(lines) = File::open(filename){
        let reader = BufReader::new(file);

        for line in reader.lines() {
            match line {
                Ok(row) => {
                    board.push(row);
                    if (board[0].len() != row.len()) {
                        eprintln!("Improperly sized input file!");
                        break;
                    }
                }
                Err(e) => {
                    eprintln!("Error reading line: {}", e);
                }
            }
        }
    } else {
        eprintln!("Error opening file: {}", filename);
    }

    return board;
}

pub fn is_valid_board(board: &Vec<String>) -> bool{
    // determines if board is valid or not!
    if board.is_empty(){
        eprintln!("Board is empty!");
        return false;
    }

    let row_length = board[0].len();

    for row in board.iter(){
        if row.len() != row_length {
            eprintln!("Row with inconsistant lenght found!");
            return false;
        }
    }
    return true;
}