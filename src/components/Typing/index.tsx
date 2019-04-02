import * as React from 'react';
import './typing.style';

import Timer from '../Timer';
import Words from '../Words';
import { shuffle } from './words';

export interface TypingProps {
   words: string
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
   words: string[]
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
         wordsPerMinute: 0,
         words: shuffle(this.props.words.split(/\n/g))
      }
   }

   componentDidMount() {
      this.input.focus();
   }

   onSpace = () => {
      let correct = false;

      if (this.state.inputValue.trim() === this.state.words[this.state.current].trim()) {
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

         if (this.isLetter(letter, false)) {
            characterCount += 1;
         }

         if (this.isLetter(letter, true)) {
            characterCount += 2;
         }

         if (this.state.words[state.current].substring(0, val.length) !== val.trim()) {
            wrongCount++;
         }

         return {
            inputValue: val,
            currentWrong: this.state.words[state.current].substring(0, val.length) !== val.trim(),
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
            wrongCount: 0,
            words: shuffle(this.props.words.split(/\n/g))
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
      return (
         <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block', textAlign: 'left', transform: 'translateY(50%)' }}>
               <div style={{ boxShadow: '1px 1px 4px #0000002b', borderRadius: '5px' }}>
                  <Words
                     words={this.state.words}
                     current={this.state.current}
                     currentWrong={this.state.currentWrong}
                     test={this.state.test}
                  />
                  <div className="toolbar">
                     <input style={this.state.currentWrong ? { color: 'red' } : {}} onChange={this.handleChange} value={this.state.inputValue} ref={this.saveInput} />
                     <span className="toolbar-actions">
                        <Timer currentTime={this.state.currentTime} onFinished={this.onFinished} counting={this.state.running} onTick={this.tick} />
                        <button onClick={this.reset}>Reset</button>
                     </span>
                  </div>
               </div>
               <div className="p-1" style={{display: 'flex', flexWrap: 'wrap'}}>
                  <span className="p-1">Keystrokes: <span className="correct">{this.state.characterCount}</span></span>
                  <span className="p-1">Wrong: <span className="wrong">{this.state.wrongCount}</span></span>
                  <span className="p-1">WPM: {this.state.wordsPerMinute}</span>
               </div>
            </div>
         </div>
      );
   }
}