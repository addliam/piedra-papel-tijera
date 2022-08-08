import React, {useEffect, useState } from 'react'
import { OptionComponent } from './OptionComponent';
import { Link } from 'react-router-dom';
import './styles/BoardComponent.css'
const axios = require('axios').default;
const URL_API = 'http://localhost:5000/api/userscore/';

const whoIsTheWinner = (firstOption, computerOption) =>{
    if (firstOption === "piedra" && computerOption === 'tijera'){
        return "piedra";
    }
    else if (firstOption === "papel" && computerOption === 'piedra'){
        return "papel";
    }
    else if (firstOption === "tijera" && computerOption === 'papel'){
        return "tijera";
    }
    else if (computerOption === "piedra" && firstOption === 'tijera'){
        return "piedra";
    }
    else if (computerOption === "papel" && firstOption === 'piedra'){
        return "papel";
    }
    else if (computerOption === "tijera" && firstOption === 'papel'){
        return "tijera";
    }
    else if (firstOption === computerOption){
        return "empate";
    }
}
const selectRandomNumber = (len) =>{
    return Math.floor(Math.random()*len)
}
const arrayOptions = ['piedra','papel','tijera'];
const OPTION_LENGTH = arrayOptions.length;

const selectRandomOption = () =>{
    let randomOption = arrayOptions[selectRandomNumber(OPTION_LENGTH)];
    return randomOption;
}
export const BoardComponent = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [computerSelection, setComputerSelection] = useState('')
    const [score, setScore] = useState(0);
    const [actualWinner, setActualWinner] = useState('');
    const [numberOfRounds, setNumberOfRounds] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [username, setUsername] = useState('');
    
    useEffect(() => {
        if (numberOfRounds >= 10){
            setIsGameOver(true);
        }
      return () => {
      }
    }, [numberOfRounds])
    const incrementScoreByOne = () => {
        setScore((prevScore)=>prevScore+1);
    }
    const incrementRoundsByOne = () => {
        setNumberOfRounds((prevNumber)=>prevNumber+1);
    }
    const playerSelection = (userOption) =>{
        incrementRoundsByOne();
        if (arrayOptions.includes(userOption)){
            setSelectedOption(userOption);
            let randomComputerSelection = selectRandomOption();
            setComputerSelection(randomComputerSelection)
            let winner = whoIsTheWinner(userOption,randomComputerSelection);
            // if user win increment score
            if (winner === userOption){
                incrementScoreByOne();
                setActualWinner('Humano');
            }else if(winner === 'empate'){
                setActualWinner('Empate');
            }else{setActualWinner('Computadora')};
        }else{console.error("Option not in array of options");}
    }
    const usernameInpuHandler = (e) =>{
        setUsername(e.target.value);
    }
    const resetStatesToDefault = () =>{
        setIsGameOver(false);
        setNumberOfRounds(0);
        setComputerSelection('');
        setSelectedOption('');
        setScore(0);
        setActualWinner('');
    }
    const containOffensiveWords = () =>{
    // TODO: Validate name not contains offensive nicknames
        return false;
    }
    const createUserScore = (name,score,date) =>{
        if (typeof score === 'number' && !containOffensiveWords()){
            let bodyRequest = {
                "name": name,
                "score": score,
                "date": date, 
            };
            axios.post(URL_API,bodyRequest)
                .then((res)=>{
                    console.log(res.data);
                })
                .catch((err)=>{
                    console.log("ERROR ON CREATING NEW USER SCORE",err);
                })
        }
    }
    const saveNewUsernameScore = (e) =>{
        e.preventDefault();
        try {
            if (username !== '' && score > 0){
                // TODO: max username lenght 22
                let actualTimeString = new Date().toLocaleString();
                console.log(`You are tryna save: ${username} with ${score} points at ${actualTimeString}`);
                createUserScore(username,score,actualTimeString);
            }                
        } catch (error) {
            console.error("Error on saving new username score");
        } finally{
            resetStatesToDefault();
        }
    }
    const skipButtonHandler = (e) =>{
        e.preventDefault();
        resetStatesToDefault();
    }
  return (
    <div className='board-container'>
        <div style={{display:isGameOver?'initial':'none'}}>
            <div className="overlay" ></div>
            <div className="game-over-container">
                <h3>JUEGO TERMINADO</h3>
                <p>Guarda tu progreso para entrar al salon de la fama</p>
                <div id="save-progress-form">
                    <label>Puntuacion: </label><span id='score-text'>{score}</span>
                    <div id='separation' />
                    <label>Nombre: </label>
                    <input onChange={(e)=>{usernameInpuHandler(e)}} value={username} autoComplete='on' type="text" name="username" id="username"/>
                </div>
                <div id="save-button">
                    <button id='skip-close' onClick={(e)=>{skipButtonHandler(e)}} type="submit">CERRAR</button>
                    <button onClick={(e)=>{saveNewUsernameScore(e)}} type="submit">GUARDAR</button>
                </div>
            </div>
        </div>
        <div className="board-header">
            <Link id='salon-fama' to={'/leaderboard'}>Ir al salon de la fama</Link>
            {/* <a id='salon-fama' href='./leaderboard'>Ir al salon de la fama</a> */}
            <h2 id='app-title'>PIEDRA PAPEL O TIJERA</h2>
            <div className="score-table">
                <span id='puntuacion'>Puntuacion {score} </span>
                <span id='ronda'> Ronda {numberOfRounds}/10</span>
            </div>
        </div>
        <div id='humano' className="players-label">
            <h3>HUMANO</h3>
        </div>
        <div id='versus' className="players-label">
            <h3>VS</h3>
        </div>
        <div id='computadora' className="players-label">
            <h3>COMPUTADORA</h3>
        </div>
        <div className="winner-container">
            <span id='actual-winner-label'>El ganador de la ronda es </span><span id='actual-winner-text'>{actualWinner}</span>
        </div>
        <div className="game-container">
            <div className="human-side">
                <div className="human-options-container">
                    <div className="option-clickable" onClick={()=>playerSelection('piedra')}>
                        <OptionComponent option={'piedra'}/>
                    </div>
                    <div className="option-clickable" onClick={()=>playerSelection('papel')} >
                        <OptionComponent option={'papel'}/>
                    </div>
                    <div className="option-clickable" onClick={()=>playerSelection('tijera')}>                
                        <OptionComponent option={'tijera'}/>
                    </div>
                </div>
                <div id="selected-option" style={{display:selectedOption!==''?  'initial':'none'}}>
                    <OptionComponent customWidth={'160px'} option={selectedOption} />
                </div>
            </div>
            <div className="computer-side">
                <div className="computer-options-container">
                    <OptionComponent option={'piedra'}/>
                    <OptionComponent option={'papel'}/>
                    <OptionComponent option={'tijera'}/>
                </div>
                <div id="selected-option" style={{display:computerSelection!==''?'initial':'none'}}>
                    <OptionComponent customWidth={'160px'} option={computerSelection} />
                </div>
            </div>
        </div>
    </div>
  )
}
