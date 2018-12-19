import * as React from 'react';
import './timer.style';

export interface TimerProps {
   currentTime: number;
   counting: boolean;
   onFinished: () => void;
   onTick: () => void;
}

export interface TimerState {
   currentTime: number; // in seconds
}

export default class Timer extends React.Component<TimerProps, any> {
   interval;

   constructor(props) {
      super(props);
   }

   componentDidMount(){
      if(this.props.counting){
         this.start();
      }
   }

   componentDidUpdate(prevProps){
      if(this.props.counting !== prevProps.counting){
         if(this.props.counting){
            this.start();
         }else{
            clearInterval(this.interval);
         }
      }
   }

   private start(){
      this.interval = setInterval(this.tick, 1000);
   }

   private tick = () => {
      if(this.props.currentTime - 1 == 0){
         clearInterval(this.interval);
         this.props.onFinished();
      }

      this.props.onTick();
   }

   private renderTime(){
      const minutes = Math.floor(this.props.currentTime / 60);
      const seconds = ('0' + this.props.currentTime % 60).substr(-2, 2);

      return `${minutes}:${seconds}`;
   }

   public render() {
      return (
         <span className="time">
            {this.renderTime()}
         </span>
      );
   }
}
