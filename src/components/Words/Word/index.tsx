import * as React from 'react';
import { useRef, forwardRef } from 'react';

function Word(props: any, ref){
   const { index, word, selected, correct, currentWrong } = props;
   const wordRef = useRef();

   React.useImperativeHandle(ref, () => selected ? wordRef.current : null);

   function wordClass() {
      let classes = ["word"];

      if (selected) {
         classes.push("current");
         if (currentWrong) {
            classes.push("error");
         }
      }

      if (correct === true) {
         classes.push("correct");
      } else if (correct === false) {
         classes.push("wrong");
      }

      return classes.join(" ");
   }

   return (
      <span key={index} ref={wordRef} className={wordClass()}>
         {word}
      </span>
   )
}

export default forwardRef(Word);