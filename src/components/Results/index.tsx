import * as React from 'react';

export interface ResultsProps {
   keystrokes: number,
   wrong: number,
   wpm: number
}

export function Results(prop: ResultsProps) {

   return (
      <div className="p-1" style={{ display: 'flex', flexWrap: 'wrap', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', backgroundColor:'#e0e0e0'}}>
         <span className="p-1">Keystrokes: <span className="correct">{prop.keystrokes}</span></span>
         <span className="p-1">Wrong: <span className="wrong">{prop.wrong}</span></span>
         <span className="p-1">WPM: {prop.wpm} {prop.wpm > 120 ? "🔥🔥" : ""}</span>
      </div>
   )
}