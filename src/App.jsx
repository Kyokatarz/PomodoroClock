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
        <div id='container'>
            <p id='title'>POMODORO CLOCK</p>
            <div id='components'>    
                <SessionAdjust increase = {this.sessionIncrease.bind(this)} decrease = {this.sessionDecrease.bind(this)} sessionMin = {this.state.sessionMin} />
                <Display minuteLeft = {this.state.minuteLeft} secondLeft = {this.state.secondLeft} clockType = {this.state.clockType} sessionMin = {this.state.sessionMin} default = {this.state.default}/>
                <BreakAdjust increase = {this.breakIncrease.bind(this)} decrease = {this.breakDecrease.bind(this)} breakMin = {this.state.breakMin} />
            </div>
            <Control reset = {this.reset.bind(this)} switchState = {this.switchState.bind(this)} running = {this.state.running}/>
            <audio src = {url} id='beep'></audio>
                
                
            
        </div>
        )
    }
}
    
let SessionAdjust = (props) => {
    
    return (
        <div className='adjust'>
            <p id='session-label'>Session Length</p>
            <div onClick = {props.increase} id= 'session-increment'><i className="fas fa-caret-up"></i></div>
            <div id='session-length'>{props.sessionMin}</div>
            <div onClick = {props.decrease} id= 'session-decrement'><i className="fas fa-caret-down"></i></div>
        </div>
    )
}

let BreakAdjust = (props) => {
    
    return (
        <div className='adjust'>
            <p id='break-label'>Break Length</p>
            <div onClick = {props.increase} id = 'break-increment'><i class="fas fa-caret-up"></i></div>
            <div id='break-length'>{props.breakMin}</div>
            <div onClick = {props.decrease} id = 'break-decrement'><i class="fas fa-caret-down"></i></div>
        </div>
    )
}

let Control = (props) =>{
    return(
        <div id='control'> 
            <div onClick = {props.switchState} id='start_stop'>{props.running ? <i className="fas fa-pause"></i> : <i class="fas fa-play"></i>}</div>
            <div onClick = {props.reset} id = 'reset'><i className="fas fa-undo-alt"></i></div>
        </div>
    )
}

let Display = (props) => {
   
    
    return(
        <div id='display'>
            <p id='timer-label'>On: {props.clockType}</p>
            <p id='time-left'>{props.minuteLeft < 10 ? `0${props.minuteLeft}` : props.minuteLeft} 
                :
                {props.secondLeft < 10 ? `0${props.secondLeft}` : props.secondLeft}</p>
            
        </div>
    
    )
    
}
    ReactDOM.render(<App/>, document.querySelector('#App'))
    
const url = 'https://freesound.org/people/Freezeman/sounds/153213/download/153213__freezeman__beep1.wav'     
