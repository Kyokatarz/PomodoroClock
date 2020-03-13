class App extends React.Component{
    constructor(props){
       super(props);
       this.state = {
           running: false,
           sessionMin: 25,
           breakMin: 5,
           minuteLeft: 25,
           secondLeft: 0,
           clockType: 'Session',
           abc: 10
           
       }
       this.countSession = this.countSession.bind(this)
       this.playSound = this.playSound.bind(this)
       this.stopSound = this.stopSound.bind(this)
    }
    
    playSound(){
        let audio = document.getElementById('beep')
        audio.play()
    }

    
    stopSound(){
        let audio = document.getElementById('beep')
        audio.pause()
        audio.currentTime=0
    }
    
    sessionDecrease(){
        if (!this.state.running){
            if(this.state.sessionMin > 1){
                this.sessionHolder = this.state.sessionMin - 1 
                this.setState(({sessionMin})=>({ sessionMin: sessionMin - 1   }))
                
                if (this.state.clockType == 'Session'){
                    this.setState({minuteLeft: this.sessionHolder,
                                    secondLeft: 0})
                }
            }
        }
    }
    
    sessionIncrease(){
        if (!this.state.running){
            if(this.state.sessionMin < 60){
                this.sessionHolder = this.state.sessionMin + 1 
                this.setState(({sessionMin})=>({ sessionMin: sessionMin + 1   }))
                
                if (this.state.clockType == 'Session'){
                    this.setState({minuteLeft: this.sessionHolder,
                                    secondLeft: 0})
                }
                
            }
        }
    }
    
    breakDecrease(){
        if (!this.state.running){
            if(this.state.breakMin > 1){
                    this.breakHolder = this.state.breakMin - 1 
                    this.setState(({breakMin})=>({ breakMin: breakMin - 1   }))
                
                    if (this.state.clockType == 'Break'){
                        this.setState({minuteLeft: this.breakHolder,
                                       secondLeft: 0})
                        
                    }
            }
        }
    }
        
    breakIncrease(){
        if (!this.state.running){
            if(this.state.breakMin < 60){
                this.breakHolder = this.state.breakMin + 1 
                this.setState(({breakMin})=>({ breakMin: breakMin + 1   }))
                
                if (this.state.clockType == 'Break'){
                    this.setState({minuteLeft: this.breakHolder,
                                       secondLeft: 0})
                }
            }
        }
    }
    
    reset(){
        this.setState({sessionMin: 25, breakMin: 5, running: false, minuteLeft: 25, secondLeft: 0, clockType: 'Session'})
        this.stopSound()
    }
    
    switchState(){
        this.setState(({running}) => ({running: !running}))
    }
    
    componentWillMount(){
        this.breakHolder = this.state.breakMin
        this.sessionHolder = this.state.sessionMin
        this.setState({minuteLeft: this.sessionHolder})
    }
    
    
    countSession(){
        let second = this.state.secondLeft,
            minute = this.state.minuteLeft
            
        if (this.state.running){
            
            if (second > 0){
                    this.setState(({secondLeft}) => ({
                        secondLeft: secondLeft - 1
                    }))
            }
            
            if (second === 0){
                
                if (minute === 0){
                    this.playSound()
                    
                    if(this.state.clockType == 'Session'){
                        this.setState({minuteLeft: this.breakHolder, clockType: 'Break'})
                    } 
                    
                    else {
                        this.setState({minuteLeft: this.sessionHolder, clockType: 'Session'})
                        
                    }
                
                }
                 
                
                else {
                
                    this.setState(({minuteLeft}) => ({
                        minuteLeft: minuteLeft -1 ,
                        secondLeft: 59,
                        
                    }))
                }
            }
        }
    }

    
    
   componentDidMount(){
      this.myInterval = setInterval(this.countSession, 1000)
   }
    
    
    render(){
        return(
        <div>
            <p>POMODORO CLOCK</p>
            <SessionAdjust increase = {this.sessionIncrease.bind(this)} decrease = {this.sessionDecrease.bind(this)} sessionMin = {this.state.sessionMin} />
            <br/>
            <BreakAdjust increase = {this.breakIncrease.bind(this)} decrease = {this.breakDecrease.bind(this)} breakMin = {this.state.breakMin} />
            <br/>
            <Control reset = {this.reset.bind(this)} switchState = {this.switchState.bind(this)}/>
            <Display minuteLeft = {this.state.minuteLeft} secondLeft = {this.state.secondLeft} clockType = {this.state.clockType} sessionMin = {this.state.sessionMin} default = {this.state.default}/>
            <audio src = {url} id='beep'></audio>
                
                
            
        </div>
        )
    }
}
    
let SessionAdjust = (props) => {
    
    return (
        <div>
            <div onClick = {props.increase} id= 'session-increment'>sessionIncrease</div>
            <p id='session-label'>Session Length</p>
            <div id='session-length'>{props.sessionMin}</div>
            <div onClick = {props.decrease} id= 'session-decrement'>sessionDecrease</div>
        </div>
    )
}

let BreakAdjust = (props) => {
    
    return (
        <div>
            <div onClick = {props.increase} id = 'break-increment'>breakIncrease</div>
            <p id='break-label'>Break Length</p>
            <div id='break-length'>{props.breakMin}</div>
            <div onClick = {props.decrease} id = 'break-decrement'>breakDecrease</div>
        </div>
    )
}

let Control = (props) =>{
    return(
        <div> 
            <div onClick = {props.switchState} id='start_stop'>Play/Pause</div>
            <div onClick = {props.reset} id = 'reset'>Reset</div>
        </div>
    )
}

let Display = (props) => {
   
    
    return(
        <div>
            <p id='timer-label'>{props.clockType}</p>
            <p id='time-left'>{props.minuteLeft < 10 ? `0${props.minuteLeft}` : props.minuteLeft}:{props.secondLeft < 10 ? `0${props.secondLeft}` : props.secondLeft}</p>
            
        </div>
    
    )
    
}
    ReactDOM.render(<App/>, document.querySelector('#App'))
    
const url = 'https://freesound.org/people/Freezeman/sounds/153213/download/153213__freezeman__beep1.wav'     
