import { useState } from 'react'


type Props = {
  dropdownOptions:string[];
  name:string
  onSelect:(idx:number) => void;
}

export const ColorDropdown = (props:Props) => {
  const [open, setOpen] = useState(false);
  const [idxSelected, setIdxSelected] = useState(0); // choose which of the color dropdown to select!

  const handleOpen = () => {
    setOpen(!open);
  }

  const handleClick = (idxClicked:number) => {
    setIdxSelected(idxClicked);
    setOpen(!open);
    props.onSelect(idxClicked);
  }

  return (
    <div>
      <button onClick={handleOpen}>{props.name}: {props.dropdownOptions[idxSelected]}</button>
      {open ? (
        <ul className='menu'>
          {props.dropdownOptions.map((option:string, idx:number) => (
            <DropdownMenuItem val={option} onClick={() => handleClick(idx)}/>
          ))}
        </ul>
      ) : (
        null
      )}
    </div>
  )
}

type PropsItem = {
  val:string;
  onClick: () => void;
}

const DropdownMenuItem = (props:PropsItem) => {
  return (
    <li key={props.val} className='menu-item'>
      <button onClick={props.onClick}>{props.val}</button>
    </li>
  )
}
