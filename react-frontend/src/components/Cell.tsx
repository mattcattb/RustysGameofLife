import React from 'react'

type Props = {
    cellElement:string;
    onClick: () => void;
}

export default function Cell(props: Props) {
  return (
    <div 
        className='Cell'
        style={{
            width:'40px',
            height:'40px',
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #000',
            backgroundColor: '#f0f0f0',
            color:"black"
        }}
        onClick={props.onClick}
    >
        {props.cellElement}
    </div>
  )
}