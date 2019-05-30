import { WordsResult } from './../IWordsClient';
import { WordList, shuffle } from './words';
import IWordsClient from "../IWordsClient";

let currentWords;
export default class MockWordsClient implements IWordsClient {
   getWords() {
      return new Promise<string[]>((resolve) => {
         currentWords = shuffle(WordList.split(/\n/g));
         resolve(currentWords);
      });
   }

   // If they didn't finish typing the last word, we don't want to mark it wrong
   // unless the part they did type is wrong
   isWordWrong(user, real, partial) {
      const comp = partial ? real.substring(0, user.length) : real;
      return comp !== user;
   }

   getWrongWordCount(user, answers) {
      let wrong = 0;
      for (var i = 0; i < user.length; i++) {
         if(!answers[i]){
            // There were more words typed than exist
            console.error("Ran out of words");
            break;
         }
         
         if (this.isWordWrong(user[i], answers[i], i === user.length - 1)) {
            wrong++;
         }
      }

      return wrong;
   }

   getWPM(keystrokes) {
      return Math.round(keystrokes / 5);
   }

   checkWords(words: string, backspaceCount: number) {
      return new Promise<WordsResult>((resolve) => {
         const wpm = this.getWPM(words.length + backspaceCount);
         const wrong = this.getWrongWordCount(words.trim().split(' '), currentWords);

         if (wpm > 130) {
            // good time to check for bots
            console.log('too fast');
         }

         resolve({ wpm, wrong });
      });
   }
}