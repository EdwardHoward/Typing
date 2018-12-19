import * as React from 'react';
import './typing.style';
import { Words, shuffle } from './words';
import Timer from '../Timer';

let words = shuffle(Words.split(/\n/g));

export interface TypingProps {
}

export interface TypingState {
   current: number;
   inputValue: string;
   typedCount: number;
   test: boolean[];
   currentWrong: boolean;
   characterCount: number;
   running: boolean;
   finished: boolean;
   currentTime: number;
   wrongCount: number;
   wordsPerMinute: number;
}

export default class Typing extends React.Component<TypingProps, any> {
   input;

   constructor(props) {
      super(props);

      this.state = {
         current: 0,
         inputValue: '',
         typedCount: 0,
         test: [],
         currentWrong: false,
         characterCount: 0,
         running: false,
         finished: false,
         currentTime: 60,
         wrongCount: 0,
         wordsPerMinute: 0
      }
   }

   componentDidMount() {
      this.input.focus();
   }

   onSpace = () => {
      let correct = false;

      if (this.state.inputValue.trim() === words[this.state.current].trim()) {
         correct = true;
      }

      this.setState(state => {
         return {
            current: state.current + 1,
            inputValue: '',
            test: { ...state.test, [state.current]: correct },
            currentWrong: false,
            characterCount: state.characterCount + 1
         }
      });
   }

   isLetter(str, uppercase) {
      let regex = uppercase ? /[A-Z]/g : /[a-z]/g;
      const match = str.match(regex);

      return !!match;
   }

   handleChange = (e) => {
      if (this.state.finished) return;

      const val = e.target.value;

      if (val[val.length - 1] === ' ') {
         this.onSpace();
         return;
      }

      this.setState((state) => {
         let { characterCount, wrongCount } = this.state;

         const letter = val.substr(-1, 1);

         if (words[state.current].substring(0, val.length) === val.trim()) {
            if (this.isLetter(letter, false)) {
               characterCount += 1;
            }

            if (this.isLetter(letter, true)) {
               characterCount += 2;
            }
         } else {
            wrongCount++;
         }

         return {
            inputValue: val,
            currentWrong: words[state.current].substring(0, val.length) !== val.trim(),
            running: true,
            characterCount,
            wrongCount,
            wordsPerMinute: Math.round(state.characterCount / 5)
         }
      });
   }

   private onFinished = () => {
      console.log(this.state.characterCount + ' keystrokes');
      console.log(`${this.state.characterCount / 5} WPM`);

      this.setState(state => {
         return {
            finished: true,
            wordsPerMinute: Math.round(state.characterCount / 5)
         }
      });
   }

   reset = () => {
      words = shuffle(Words.split(/\n/g));

      this.setState(
         {
            current: 0,
            inputValue: '',
            typedCount: 0,
            test: [],
            currentWrong: false,
            characterCount: 0,
            running: false,
            finished: false,
            currentTime: 60,
            wrongCount: 0
         }
      )

      this.input.focus();
   }

   tick = () => {
      this.setState(state => {
         return {
            currentTime: state.currentTime - 1
         }
      })
   }

   saveInput = (node) => {
      this.input = node;
   }

   public render() {
      const wd = Math.floor((Math.max(0, this.state.current)) / 10);
      const start = wd * 10;
      const w = words.slice(start, start + 20);

      return (
         <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block', textAlign: 'left', transform: 'translateY(50%)' }}>
               <div className="words-container">
                  <div className="words">
                     {w.map((word, index) =>
                        <React.Fragment>
                           <span key={index}
                              className={
                                 'word' +
                                 ((index + start) == this.state.current ? (' current' + (this.state.currentWrong ? ' error' : '')) : '') +
                                 (this.state.test[index + start] === true ? ' correct' : '') +
                                 (this.state.test[index + start] === false ? ' wrong' : '')
                              }>
                              {word}
                           </span>
                           {(index + 1) % 10 == 0 && <br />}
                        </React.Fragment>
                     )}
                  </div>
               </div>
               <div className="toolbar">
                  <input style={this.state.currentWrong ? { color: 'red' } : {}} onChange={this.handleChange} value={this.state.inputValue} ref={this.saveInput} />
                  <Timer currentTime={this.state.currentTime} onFinished={this.onFinished} counting={this.state.running} onTick={this.tick} />
                  <button onClick={this.reset}>Reset</button>
               </div>
               <div className="p-1">
                  <span className="p-1">{this.state.characterCount}</span>
                  <span className="p-1">{this.state.wrongCount}</span>
                  <span className="p-1">{this.state.wordsPerMinute} WPM</span>
               </div>
            </div>
         </div>
      );
   }
}