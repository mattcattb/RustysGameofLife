export type CharGrid = string[][];

export type GameOfLifeSettings = {
    width:number,
    height:number,
    tileOptions:string,
    colors: GameOfLifeColors
}

export type GameOfLifeColors = {
  aliveColor: string,
  deadColor: string
}
