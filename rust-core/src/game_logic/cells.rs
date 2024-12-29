// TODO Once I have a better idea about rust, i want to make this! 

// A Cell is either Dead or Alive!
enum CellState {
    Dead,
    Alive
}

struct Cell {
    cur_state: CellState,
    num_alive: u32, // how many alive cells currently around 
}
