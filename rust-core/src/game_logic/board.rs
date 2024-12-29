use std::fmt;

#[derive(Debug, Clone)]
pub struct Board {
    height: usize,
    width: usize,
    grid: Vec<Vec<char>>, // Linear representation of the grid
}

    
impl fmt::Display for Board {
    // todo write this for board!
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        writeln!(f, "Board {}x{}", self.height, self.width)?;
        for row in &self.grid {
            for cell in row {
                write!(f, "{}", cell)?;
            }
            writeln!(f)?;
        }
        Ok(())
    }
}


impl Board {
    // Constructor
    pub fn new(grid: Vec<Vec<char>>) -> Self {
        
        let height:usize = grid.len();
        let width:usize = if height > 0 { grid[0].len() } else { 0 };
        return Self { width, height, grid };
    }

    // Get the value of a cell
    pub fn get(&self, r: usize, c: usize) -> Option<char> {
        if r < self.height && c < self.width {
            Some(self.grid[r][c])
        } else {
            None
        }
    }

    // Set the value of a cell
    pub fn set(&mut self, r: usize, c: usize, value: char) {
        if r < self.height && c < self.width {
            self.grid[r][c] = value;
        }        
    }

    pub fn get_grid(&self) -> Vec<Vec<char>>{
        return self.grid.clone()
    }

}
