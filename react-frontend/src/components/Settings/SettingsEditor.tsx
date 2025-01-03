import { Dropdown } from '../ui/Dropdown'
import CustomSlider from '../ui/Slider'

import { useGame } from '../../contexts/GameContext'

export const SettingsEditor = () => {
  // for now, just change the dead color and alive colors

  const {GOLSettings, setGOLSettings} = useGame();

  const colorOptions: string[] = ["white", "red", "black", "blue", "orange", "purple"];
  
  const deadColorSelected = (deadIdx:number) => {
    console.log("Selected new dead idx ", deadIdx);
    setGOLSettings({
      ...GOLSettings,
      colors: {
        ...GOLSettings.colors, 
        deadColor: colorOptions[deadIdx],
      }
    })
  }

  const aliveColorSelected = (aliveIdx:number) => {
    console.log("Selected new alive idx ", aliveIdx);

    setGOLSettings({
      ...GOLSettings,
      colors: {
        ...GOLSettings.colors, 
        aliveColor: colorOptions[aliveIdx],
      }
    })

  }

  const onHeightChange = (value:number) => {
    setGOLSettings({
      ...GOLSettings,
      gridSizing:{
        ...GOLSettings.gridSizing,
        height:value
      }
    });
  }

  const onWidthHeight = (value:number) => {
    setGOLSettings({
      ...GOLSettings,
      gridSizing:{
        ...GOLSettings.gridSizing,
        width:value
      }
    });
  }

  return (
    <div className='m-3'>
      <div className='flex flex-row justify-evenly space-x-5 '>
        <Dropdown name={"alive color"} dropdownOptions={colorOptions} onSelect={aliveColorSelected} />
        <Dropdown name={"dead color"} dropdownOptions={colorOptions} onSelect={deadColorSelected}/>
      </div>
      <div className='flex flex-col justify-evenly'>
        <CustomSlider 
          value={GOLSettings.gridSizing.height}
          onChange={onHeightChange}
          label="height"
          min={2}
          max={20}
          step={1}
        />
        <CustomSlider 
          value={GOLSettings.gridSizing.width}
          onChange={onWidthHeight}
          label="width"
          min={2}
          max={20}
          step={1}
        />
      </div>
    </div>
  )
}

