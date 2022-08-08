import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './styles/LeaderBoardComponent.css'
const axios = require('axios').default;
const URL_API = 'http://localhost:5000/api/userscore/';

export const RowItemComponent = ({id,name,score,dateString}) => {
    // '5/6/2022, 3:16:21 PM'
    let date = dateString.split(',')[0];
    let hour = dateString.split(',')[1];
  return (
    <tr className='row-item' id={id}>
        <td className='item-id'>{id}</td>
        <td className='item-name'>{name}</td>
        <td className='item-score'>{score}</td>
        <td className='item-date'>{date}</td>
        <td className='item-date'>{hour}</td>
    </tr>
  )
}


export const LeaderBoardComponent = () => {
    // const [userScoreJSON, setUserScoreJSON] = useState([]);
    const [userScoreLeadersJSON, setUserScoreLeadersJSON] = useState([]);
    const getUserScoreDataLeaders = () =>{
        axios.get(URL_API+'/leaders')
            .then((res)=>{
                setUserScoreLeadersJSON(res.data);
            })
            .catch((err)=>{
                console.error(err);
            })
    }
    // const getAllUserScoreData = () =>{
    //     axios.get(URL_API)
    //         .then((res)=>{
    //             setUserScoreJSON(res.data);
    //             console.log(res.data);
    //         })
    //         .catch((err)=>{
    //             console.error(err);
    //         })
    // }
    useEffect(() => {
      getUserScoreDataLeaders();
      return () => {
      }
    }, [])

  return (
    <div className='leaderboard-container'>
        <h3 id='leaderboard-title'>SALON DE LA FAMA</h3>
        <div className="button-back-container">
            <Link className='back-to-game' to={'/play'}>Volver al juego</Link>
        </div>
        <p id='presentation-text'>Presentamos a los mejores. Aquellos que pudieron vencer a la computadora en el juego Piedra Papel o Tijera.</p>
        <div className="table-leaderboard-container">
            <table className='leaderboard'>
                <thead>
                    <tr id='row-description-container'>
                        <th id='description-id' className='row-description'>#</th>
                        <th id='description-name' className='row-description'>Name</th>
                        <th id='description-score' className='row-description'>Score</th>
                        <th id='description-date' className='row-description'>Fecha</th>
                        <th id='description-hour' className='row-description'>Hora</th>
                    </tr>    
                </thead>
                <tbody>
                    {
                        userScoreLeadersJSON.map((obj,indx)=>{
                            return <RowItemComponent key={indx} id={indx+1}  name={obj.name} score={obj.score} dateString={obj.date} />
                        })
                    }
                </tbody>
            </table>

        </div>
        <div className="refresh-button-container">
            <button className='refresh' onClick={getUserScoreDataLeaders}>Actualizar</button>
        </div>
        {/* {
            userScoreJSON.map((obj,indx)=>{
                return <p key={indx}>{indx+1}  {obj.name} - {obj.score} - {obj.date} </p>
            })            
        } */}
    </div>
  )
}
