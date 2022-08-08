import React from 'react'
import paperImage from './sources/papel.png'
import rockImage from './sources/piedra.png'
import scissorImage from './sources/tijera.png'

export const OptionComponent = ({option,customWidth}) => {
    const optionImages = {'piedra':rockImage,'papel':paperImage,'tijera':scissorImage};
    if (!Object.keys(optionImages).includes(option) && option!== ''){
        console.error(`The option ${option} is not valid`);
    }
    const width = customWidth ? customWidth : '65';
  return (
    <div className='option-container'>
        <div className="option" id={option}>
            <img className='image-option' width={width} height='auto' src={optionImages[option]} alt="game option" />
            {/* <span>{option}</span> */}
        </div>
    </div>
  )
}
