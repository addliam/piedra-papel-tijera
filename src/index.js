import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import { BoardComponent } from './components/BoardComponent';
import {LeaderBoardComponent} from './components/LeaderBoardComponent'
const root = ReactDOM.createRoot(document.getElementById('root'));

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BoardComponent/>}/>
        <Route path='/play' element={<BoardComponent/>}/>
        <Route path='/leaderboard' element={<LeaderBoardComponent/>}/>
      </Routes>
    </BrowserRouter>
  )
}

root.render(
  <React.StrictMode>
    {/* <LeaderBoardComponent/> */}
    {/* <BoardComponent/> */}
    <App />
  </React.StrictMode>
);