import React from 'react'

type Props = {
    color:string;
    onClick: () => void;
    size:number;
}

export default function Cell(props: Props) {
  return (
    <div 
        className='Cell'
        style={{
            width:`${props.size}px`,
            height:`${props.size}px`,
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: "1px solid rgba(0, 0, 0, 0.2)",
            backgroundColor: props.color,
            color:"black",
            borderRadius:"2px",
            cursor:"pointer"
        }}
        onClick={props.onClick}
    >
    </div>
  )
}