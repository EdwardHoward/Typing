import * as React from 'react';
import './typing.style';

import Timer from '../Timer';
import Words from '../Words';
import { Results } from '../Results';
import IWordsClient from '../../api/words/IWordsClient';

export interface TypingProps {
   client: IWordsClient
}

export interface TypingState {
   current: number;
   inputValue: string;
   typedCount: number;
   correctWords: boolean[];
   currentWrong: boolean;
   characterCount: number;
   running: boolean;
   finished: boolean;
   currentTime: number;
   wrongCount: number;
   wordsPerMinute: number;
   words: string[];
   showResults: boolean;
}

let userInput = "";
let backspaceCount = 0;
export default class Typing extends React.Component<TypingProps, any> {
   input;

   constructor(props) {
      super(props);

      this.state = {
         current: 0,
         inputValue: '',
         typedCount: 0,
         correctWords: [],
         currentWrong: false,
         characterCount: 0,
         running: false,
         finished: false,
         currentTime: 60,
         wrongCount: 0,
         wordsPerMinute: 0,
         words: [],
         showResults: false
      }
   }

   async componentDidMount() {
      let words = await this.props.client.getWords();
      this.setState({ words });
      this.input.focus();
   }

   onSpace = () => {
      let correct = false;
      let wrong = this.state.wrongCount;

      userInput += this.state.inputValue + " ";

      if (this.state.inputValue.trim() === this.state.words[this.state.current].trim()) {
         correct = true;
      }else{
         wrong++;
      }

      if (!this.state.words[this.state.current + 1]) {
         this.onFinished();
      }

      this.setState(state => {
         return {
            current: state.current + 1,
            inputValue: '',
            correctWords: { ...state.correctWords, [state.current]: correct },
            currentWrong: false,
            characterCount: state.characterCount + 1,
            wrongCount: wrong
         }
      });
   }

   isLetter(str) {
      let regex = /[A-z]/g;
      const match = str.match(regex);

      return !!match;
   }

   handleKeyDown = (e) => {
      if(e.which === 8){
         backspaceCount++;
      }
   }

   handleChange = async (e) => {
      if (this.state.finished) return;
      const val = e.target.value;

      if (val[val.length - 1] === ' ') {
         // only allow space when there is a character typed
         if(val.length > 1){
            this.onSpace();
         }
         return;
      }

      this.setState((state) => {
         let { characterCount, wrongCount } = state;

         const letter = val.substr(-1, 1);

         if (this.isLetter(letter)) {
            characterCount += 1;
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

   private onFinished = async () => {
      this.setState(state => {
         return {
            finished: true,
            wordsPerMinute: Math.round(state.characterCount / 5),
            running: false
         }
      });

      userInput += this.state.inputValue;

      let check = await this.props.client.checkWords(userInput, backspaceCount) as any;

      this.setState({wordsPerMinute: check.wpm, wrongCount: check.wrong, showResults: true});
   }

   reset = async () => {
      let words = await this.props.client.getWords();
      userInput = "";
      
      this.setState(
         {
            current: 0,
            inputValue: '',
            typedCount: 0,
            correctWords: [],
            currentWrong: false,
            characterCount: 0,
            running: false,
            finished: false,
            currentTime: 60,
            wrongCount: 0,
            words,
            showResults: false
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
            <div className="typing" style={{ display: 'inline-block', textAlign: 'left', boxShadow: '1px 1px 4px #0000002b', borderRadius: "5px" }}>
               <div>
                  <Words
                     words={this.state.words}
                     current={this.state.current}
                     currentWrong={this.state.currentWrong}
                     correctWords={this.state.correctWords}
                  />
                  <div className="toolbar">
                     <input
                        style={this.state.currentWrong ? { color: 'red' } : {}}
                        onChange={this.handleChange}
                        value={this.state.inputValue}
                        ref={this.saveInput}
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        onKeyDown={this.handleKeyDown}
                     />
                     <span className="toolbar-actions">
                        <Timer currentTime={this.state.currentTime} onFinished={this.onFinished} counting={this.state.running} onTick={this.tick} />
                        <button disabled={this.state.characterCount < 1} onClick={this.reset}>Reset</button>
                     </span>
                  </div>
               </div>
               <Results 
                  keystrokes={this.state.characterCount} 
                  wrong={this.state.wrongCount} 
                  wpm={this.state.wordsPerMinute} 
                  showing={this.state.showResults}
               />
            </div>
         </div>
      );
   }
}