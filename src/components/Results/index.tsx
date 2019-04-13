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
   const { style, title, textClass, valueStyle, value } = props;
   return (
      <div className="box" style={style}>
         <div style={{ padding: '0.5rem' }}>{title}</div>
         <div className={textClass} style={valueStyle}>{value}</div>
      </div>
   )
}

function ResultView(props) {
   const { showing, keystrokes, wpm, wrong } = props;
   return (<div className="p-1" style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#e0e0e0' }}>
      <Box style={{ backgroundColor: 'whitesmoke' }} title="Keystrokes" value={keystrokes} textClass="correct" valueStyle={{ padding: '.5rem' }} />
      <Box style={{ backgroundColor: 'whitesmoke' }} title="Wrong Words" value={wrong} textClass="wrong" valueStyle={{ padding: '.5rem' }} />
      <Box title={showing ? "WPM" : null} value={showing ? (wpm + (wpm > 120 ? "🔥🔥" : "")) : ''} valueStyle={{ padding: '.2rem', fontSize: '1.3rem' }} />
   </div>);
}

export function Results(props: ResultsProps) {
   
   return (props.showing ? <ResultView {...props} /> : null);

}