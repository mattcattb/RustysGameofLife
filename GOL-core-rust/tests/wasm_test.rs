// In tests/wasm_tests.rs

use wasm_bindgen_test::wasm_bindgen_test;
use wasm_bindgen::prelude::*;
use GOL_core_rust::GameWasm; // Replace with your actual crate name

wasm_bindgen_test::wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_game_initialization() {
    let game = GameWasm::new_random_game(3, 3, "01".to_string());
    let grid = game.get_grid();
    
    // Check the grid structure
    assert_eq!(grid.length(), 3);  // Should have 3 rows
    let first_row = js_sys::Reflect::get(&grid, &JsValue::from(0)).unwrap();
    assert_eq!(first_row.dyn_into::<js_sys::Array>().unwrap().length(), 3);  // Each row has 3 columns
}

#[wasm_bindgen_test]
fn test_next_turn() {
    let mut game = GameWasm::new_random_game(3, 3, "01".to_string());
    assert_eq!(game.round, 0);
    game.next_turn();
    assert_eq!(game.round, 1);
}
