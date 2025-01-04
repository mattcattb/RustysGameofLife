export type CharGrid = string[][];

export type GridSizeData = {
  width:number,
  maxWidth:number,
  height:number,
  maxHeight:number

}

export type GameOfLifeSettings = {
    gridSizing:GridSizeData
    tileOptions:string,
    colors: GameOfLifeColors,
    speedMS:number
    
}

export type GameOfLifeColors = {
  aliveColor: string,
  deadColor: string
}
