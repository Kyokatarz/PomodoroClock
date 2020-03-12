class App extends React.Component{
    constructor(props){
       super(props);
       this.state = {
           running: false,
           sessionMin: 25,
           breakMin: 5,
           minuteLeft: 25,
           secondLeft: 0,
           clockType: 'Session'
       }
       this.countSession = this.countSession.bind(this)
       this.countBreak = this.countBreak.bind(this)
    }
    

    
    
    sessionDecrease(){
        if (!this.state.running){
            if(this.state.sessionMin > 0){
                this.setState(({sessionMin})=>({
                    sessionMin: sessionMin - 1
                }))
            }
        }
    }
    
    sessionIncrease(){
        if (!this.state.running){
            if(this.state.sessionMin < 60){
                this.setState(({sessionMin})=>({
                    sessionMin: sessionMin + 1
                }))
            }
        }
    }
    
    breakDecrease(){
        if (!this.state.running){
            if(this.state.breakMin > 0){
                this.setState(({breakMin})=>({
                    breakMin: breakMin - 1
                }))
            }
        }
    }
    
    breakIncrease(){
        if (!this.state.running){
            if(this.state.breakMin < 60){
                this.setState(({breakMin})=>({
                    breakMin: breakMin + 1
                }))
            }
        }
    }
    
    reset(){
        this.setState({sessionMin: 25, breakMin: 5, running: false})
    }
    
    switchState(){
        this.setState(({running}) => ({running: !running}))
    }
    
    componentWillMount(){
        const sessionHolder = this.state.sessionMin,
              breakHolder = this.state.breakMin
        let minute = this.state.sessionMin,
            second = this.state.secondLeft
            
    }
    
    countSession(){
        
        let minute = this.state.sessionMin,
              second = 0
        
        if (this.state.running){
            if (second > 0){
                second = second - 1
                this.setState(({secondLeft}) => ({secondLeft: second}))
            }

            if (second === 0){
                if (minute === 0){
                    this.countBreak()
                } else {
                    minute = minute - 1
                    second = 59
                    this.setState(({minuteLeft}) => ({minuteLeft: minute, secondLeft: second}))
                }          
            }
        }
    }  
    
    countBreak(){
        this.setState({minuteLeft: this.state.breakMin})
        const minute = this.state.minuteLeft,
              second = this.state.secondLeft
        
        if (second > 0){
            this.setState(({second}) => ({second: second - 1}))
        }
        
        if (second === 0){
            if (minute === 0){
                this.countSession()
            } else {
                this.setState(({minute}) => ({minute: minute - 1, second: 59}))
            }          
        }
    }
    
   componentDidMount(){
      this.myInterval = setInterval(this.countSession,1000)
   }
    
    
    render(){
        return(
        <div>
            <p>POMODORO CLOCK</p>
            <SessionAdjust increase = {this.sessionIncrease.bind(this)} decrease = {this.sessionDecrease.bind(this)} sessionMin = {this.state.sessionMin} />
            <BreakAdjust increase = {this.breakIncrease.bind(this)} decrease = {this.breakDecrease.bind(this)} breakMin = {this.state.breakMin} />
            <Control reset = {this.reset.bind(this)} switchState = {this.switchState.bind(this)}/>
            <Display minuteLeft = {this.state.minuteLeft} secondLeft = {this.state.secondLeft}/>
        </div>
        )
    }
}
    
let SessionAdjust = (props) => {
    
    return (
        <div>
            <div onClick = {props.increase}>sessionIncrease</div>
            <div>{props.sessionMin}</div>
            <div onClick = {props.decrease}>sessionDecrease</div>
        </div>
    )
}

let BreakAdjust = (props) => {
    
    return (
        <div>
            <div onClick = {props.increase}>breakIncrease</div>
            <div>{props.breakMin}</div>
            <div onClick = {props.decrease}>breakDecrease</div>
        </div>
    )
}

let Control = (props) =>{
    return(
        <div> 
            <div onClick = {props.switchState}>Play/Pause</div>
            <div onClick = {props.reset}>Reset</div>
        </div>
    )
}

let Display = (props) => {
   
    
    return(
        <div>
            
            <p>Remaining Time: {props.minuteLeft}:{props.secondLeft}</p>
            
        </div>
    
    )
    
}
    ReactDOM.render(<App/>, document.querySelector('#App'))