import { WordList, shuffle } from './words';
import IWordsClient from "../IWordsClient";

export default class MockWordsClient implements IWordsClient {
   getWords(){
      return new Promise<string[]>((resolve, reject) => {
         resolve(shuffle(WordList.split(/\n/g)));
      });
   }

   checkWords(words: string, backspaceCount: number){
      return new Promise<string>((resolve, reject) => {
         resolve('');
      });
   }
}