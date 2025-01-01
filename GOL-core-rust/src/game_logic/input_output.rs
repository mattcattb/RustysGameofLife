use std::fs::File;            // For opening files
use std::io::{self, BufRead}; // For reading file lines and handling I/O
use std::io::BufReader;       // For efficient file reading


pub fn read_grid(src:String) -> Result<Vec<Vec<char>>, io::Error> {

    let f:File = File::open(&src)?;
    let reader:BufReader<File> = BufReader::new(f);

    let mut grid: Vec<Vec<char>> = Vec::new();


    for (index, line) in reader.lines().enumerate(){
        let line = line?; // handle line read errors
        let row: Vec<char> = line.chars().collect();

        if index > 0 && row.len() != grid[0].len() {
            eprintln!("Wrong grid size!!");
            return Err(io::Error::new(io::ErrorKind::InvalidData, "Rows have inconsistent lengths"));
        }
        grid.push(row);
    }

    return Ok(grid);   
}

#[test]
fn test_file_grid_read() {
    let grid_result = read_grid("grids/tests/states/state_1.txt".to_string());
    assert!(grid_result.is_ok(), "Failed to read grid from file");

    let grid = grid_result.unwrap();
    assert_eq!(grid.len(), 9, "grid height is incorrect");
    assert_eq!(grid[0].len(), 9, "grid width is incorrect");
    
    // Check some specific cells for correctness
    assert_eq!(grid[2][2], '1', "Cell (2, 2) is incorrect");
    assert_eq!(grid[0][0], '0' , "Cell (0, 0) is incorrect");
}