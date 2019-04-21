import * as React from 'react';
import { useEffect, useState, useRef, useImperativeHandle } from 'react';
import Word from './Word';

export default function Words(props) {
   const { currentWrong, correctWords, words } = props;

   const [rowWordCount, setRowWordCount] = useState(0);
   const [wordCount, setWordCount] = useState(0);

   const currentWord = useRef(null);

   useEffect(() => {
      setRowWordCount(rowWordCount + 1);

      if (props.current == 0) {
         setWordCount(0);
         setRowWordCount(0);
      }
      
   }, [props.current]);

   useEffect(() => {
      const { current } = currentWord;

      if (current && current.offsetTop !== 0) {
         setWordCount(wordCount + rowWordCount);
         setRowWordCount(0);
      }

   }, [currentWord.current]);

   function renderWords(words) {
      if (words) {
         return words.slice(wordCount, wordCount + 30).map((word, index) => {

            const realIndex = index + wordCount;
            const current = (realIndex === props.current);
            const correct = correctWords[realIndex];

            return (
               <Word
                  word={word}
                  currentWrong={currentWrong}
                  correct={correct}
                  key={realIndex}
                  index={realIndex}
                  selected={current}
                  ref={current ? currentWord : null}
               />
            )
         });
      }

      return null;
   }


   return (
      <div className="words-wrapper">
         <div className="words-container">
            <div className="words">
               {renderWords(words)}
            </div>
         </div>
      </div>
   );
}