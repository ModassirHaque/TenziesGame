import { useState,useEffect,useRef } from 'react'
import './App.css'
import Die from "./Die.jsx"
import Confetti from 'react-confetti'
import {nanoid} from "nanoid"
function App() {
  const [dice,setDice]=useState(()=>generateAllNewDice())
  let youWin=false
  if(dice.every(die=>die.isHeld) && dice.every(die=>dice[0].value==die.value)){
    console.log("YOU win")
    youWin=true
  }
  const btnRef=useRef(null)
  useEffect(()=>{
       if(youWin){
        btnRef.current.focus()
       }
  },[youWin])
  function generateAllNewDice(){
      return new Array(10)
      .fill(0)
      .map(()=>(
        {value:Math.ceil(Math.random()*6),
         isHeld:false,
         id:nanoid()
        }
      ))
  }
  function hold(id){
    setDice(oldDice=>{
      return oldDice.map(die=>{
        return die.id===id?{...die,isHeld:!die.isHeld}:die
      })
    })
  }
  const element=dice.map(ele=><Die 
    key={ele.id} 
    value={ele.value} 
    isHeld={ele.isHeld}
    hold={()=>hold(ele.id)}
    />)
  function handleReset(){
    setDice(oldDice=>{
      return oldDice.map(die=>{
        return die.isHeld===false?{...die,value:Math.ceil(Math.random()*6)}:die
      })
    })
    youWin ? setDice(generateAllNewDice):""
  }
  return (
   <>
   <main>
    {youWin && <Confetti />}
    <div aria-live="polite" className="sr-only">
    {youWin && <p>Congratulations! You won! Press New Game to start again.</p>}
    </div>
   <h1 className="title">Tenzies</h1>
   <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div id='dice-container'>
        {element}
     </div>
     <button ref={btnRef} id="roll" onClick={handleReset}>
         {youWin?"New Game":"Roll"}
     </button>
   </main>
   </>
  )
}

export default App
