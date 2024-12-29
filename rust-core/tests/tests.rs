use rust-core::utils::read_board;


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_next_state() {
        let input = read_board("boards/input.txt");
        let expected = read_board("boards/output.txt");

        let result = next_state(input);

        assert_eq!(result, expected);
    }

    // Your function to compute the next state
    fn next_state(board: Vec<Vec<bool>>) -> Vec<Vec<bool>> {
        // Implement Conway's Game of Life logic
        board
    }
}
