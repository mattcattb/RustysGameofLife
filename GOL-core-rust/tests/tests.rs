

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_file_read() {
        let board_result = create_read_board("boards/tests/states/state_1.txt".to_string());
        assert!(board_result.is_ok(), "Failed to read board from file");

        let board = board_result.unwrap();
        assert_eq!(board.height, 9, "Board height is incorrect");
        assert_eq!(board.width, 9, "Board width is incorrect");
        
        // Check some specific cells for correctness
        assert_eq!(board.get(2, 2), Some('1'), "Cell (2, 2) is incorrect");
        assert_eq!(board.get(0, 0), Some('0'), "Cell (0, 0) is incorrect");
    }
    
    #[test]
    fn test_game_next_state() {
        let state_1 = create_read_board("boards/tests/states/state_1.txt".to_string())
            .expect("Failed to read state 1");
        let expected_state_2 = create_read_board("boards/tests/states/state_2.txt".to_string())
            .expect("Failed to read state 2");

        let mut game = Game::new(state_1);
        game.next_state();

        assert_eq!(
            game.get_board(), &expected_state_2,
            "Game next state did not match the expected state"
        );
    }

    // Your function to compute the next state
    fn next_state(board: Vec<Vec<bool>>) -> Vec<Vec<bool>> {
        // Implement Conway's Game of Life logic
        board
    }
}
