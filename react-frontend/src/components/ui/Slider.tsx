import React, { useState, useEffect } from 'react';

interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  onChange,
  min=50,
  max=2000,
  step=50,
  label="Custom slider",
}: CustomSliderProps) => {
  const [inputValue, setInputValue] = useState(value);


  // Keep `inputValue` in sync with `value` prop
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue >= min && newValue <= max) {
      setInputValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className='flex items-center gap-4'>
      {label && <label className='font-bold text-grey-700'>{label}</label>}
      <input
        type="range"
        value={inputValue}
        onChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        className='w-56 cursor-pointer accent-blue-500'
      >
      </input>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        min={min}
        max={max}
        step={step}
        className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
      />
    </div>
  );
};

export default CustomSlider;
