


#[derive(Debug, Clone)]
pub struct Grid {
    width: usize,
    height: usize,
    cells: Vec<bool>, // Linear representation of the grid
}

impl Grid {
    // Constructor
    pub fn new(width: usize, height: usize) -> Self {
        Self {
            width,
            height,
            cells: vec![false; width * height],
        }
    }

    // Get the value of a cell
    pub fn get(&self, x: usize, y: usize) -> bool {
        let idx = self.index(x, y);
        self.cells[idx]
    }

    // Set the value of a cell
    pub fn set(&mut self, x: usize, y: usize, value: bool) {
        let idx = self.index(x, y);
        self.cells[idx] = value;
    }

    // Private: Convert 2D coordinates to 1D index
    fn index(&self, x: usize, y: usize) -> usize {
        y * self.width + x
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
