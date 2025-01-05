import React from 'react'
import Button from '../ui/Button'

type Props = {
  outline:boolean;
  onClick: () => void;
  color: string;
}

export default function PaletteBlock(props: Props) {
  const buttonStyle = {
    border: props.outline ? '2px solid gold' : 'none', // Apply border if outline is true
    padding: '10px',
    margin: '5px',
    backgroundColor:props.color
  };


  return (
    <Button onClick={props.onClick} style={buttonStyle}></Button>
  )
}