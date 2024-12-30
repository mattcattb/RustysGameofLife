use rust_core::game_logic::board::{Board, create_read_board};
use rust_core::game_logic::input_output::read_grid;

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