import * as React from 'react';

export interface WordsProps {
   words;
   current;
   currentWrong: Boolean;
   test: Boolean[];
}

export default class Words extends React.Component<WordsProps, any> {
   currentNode;

   constructor(props) {
      super(props);

      this.state = {
         currentRow: 0
      }
   }

   componentDidUpdate(prevProps: any, prevState: any) {
      if (this.currentNode) {
         const row = this.currentNode.offsetTop / 45;
         if (this.state.currentRow !== row) {
            this.setState({
               currentRow: row
            })
         }
      }
   }

   shouldComponentUpdate(prevProps: WordsProps, prevState: any) {
      return (
         prevProps.current !== this.props.current ||
         prevState.currentRow !== this.state.currentRow ||
         prevProps.currentWrong !== this.props.currentWrong ||
         prevProps.words !== this.props.words);
   }

   saveCurrentSpan = (node) => {
      this.currentNode = node;
   }

   renderWord = (word, index) => {
      const {  currentWrong, test } = this.props;
      const current = (index === this.props.current);

      return (
         <span key={index} ref={current ? this.saveCurrentSpan : null}
            className={
               'word' +
               (current ? (' current' + (currentWrong ? ' error' : '')) : '') +
               (test[index] === true ? ' correct' : '') +
               (test[index] === false ? ' wrong' : '')
            }>
            {word}
         </span>
      )
   }

   public render() {
      const { words } = this.props;

      return (
         <div className="words-wrapper">
            <div className="words-container">
               <div className="words" style={{ top: (this.state.currentRow * -45) + 'px' }}>
                  {words && words.map(this.renderWord)}
               </div>
            </div>
         </div>
      );
   }
}
