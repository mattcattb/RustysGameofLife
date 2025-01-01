import {GameOfLifeSettings} from '../types'

export const getCellColor = (gameSettings:GameOfLifeSettings, cellElement:string) => {
  if (cellElement == gameSettings.tileOptions[0]){
    return gameSettings.colors.deadColor;
  }else if (cellElement == gameSettings.tileOptions[1]) {
    return gameSettings.colors.aliveColor;
  } else {
    throw Error;
  }
}