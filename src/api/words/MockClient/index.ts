import { WordsResult, WordsType } from './../IWordsClient';
import { WordList, shuffle, passage } from './words';
import IWordsClient from "../IWordsClient";

let currentWords;
export default class MockWordsClient implements IWordsClient {
   getWords(type: WordsType) {
      return new Promise<string[]>((resolve, reject) => {
         if(type == WordsType.WORDS){
            currentWords = shuffle(WordList.split(/\n/g));
         }else if(type == WordsType.PASSAGE){
            currentWords = passage.split(/\s/g);
         }

         resolve(currentWords);
      });
   }

   checkWords(words: string, backspaceCount: number) {
      return new Promise<WordsResult>((resolve, reject) => {
         const user = words.trim().split(' ');
         const answers = currentWords;

         let keystrokes = words.length;
         let wrong = 0;

         for (var i = 0; i < user.length; i++) {
            const userWord = user[i];
            const realWord = answers[i];

            if (i === user.length - 1) {
               if (realWord.substring(0, userWord.length) !== userWord) {
                  wrong++;
               }
            } else if (userWord !== realWord) {
               wrong++;
            }
         }

         keystrokes += backspaceCount;

         const wpm = Math.round(keystrokes / 5);

         if (wpm > 130) {
            // good time to check for bots
            console.log('too fast');
         }
         
         resolve({ wpm, wrong });
      });
   }
}