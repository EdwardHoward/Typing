import * as React from 'react';
import './results.style';

export interface ResultsProps {
   keystrokes: number,
   wrong: number,
   wpm: number,
   showing: boolean,
   style?
}

function Box(props) {
   const { style, title, textClass, valueStyle, value, boxClass } = props;
   return (
      <div className={"box " + (boxClass ? boxClass : "")} style={style}>
         <div style={{ padding: '0.5rem' }}>{title}</div>
         <div className={textClass ? textClass : ""} style={valueStyle}>{value}</div>
      </div>
   )
}

function WPMText(wpm) {
   return wpm + (wpm > 120 ? " 🔥🔥" : "");
}

function ResultView(props) {
   const { keystrokes, wpm, wrong } = props;
   return (
      <div className="p-1 result-box" style={{ display: 'flex', flexWrap: 'wrap'}}>
         <Box title="WPM" value={WPMText(wpm)} valueStyle={{ padding: '.2rem', fontSize: '1.3rem' }} />
         <Box title="Keystrokes" boxClass="wpm" value={keystrokes} textClass="correct" valueStyle={{ padding: '.5rem' }} />
         <Box title="Wrong Words" boxClass="wpm" value={wrong} textClass="wrong" valueStyle={{ padding: '.5rem' }} />
      </div>);
}

export function Results(props: ResultsProps) {

   return (props.showing ? <ResultView {...props} /> : null);

}