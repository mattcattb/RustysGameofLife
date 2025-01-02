export type CharGrid = string[][];

export type GameOfLifeSettings = {
    width:number,
    height:number,
    tileOptions:string,
    colors: GameOfLifeColors,
    speedMS:number
}

export type GameOfLifeColors = {
  aliveColor: string,
  deadColor: string
}
