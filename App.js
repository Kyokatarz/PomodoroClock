var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            running: false,
            sessionMin: 25,
            breakMin: 5,
            minuteLeft: 25,
            secondLeft: 0,
            clockType: 'Session'

        };
        _this.countSession = _this.countSession.bind(_this);
        _this.playSound = _this.playSound.bind(_this);
        _this.stopSound = _this.stopSound.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'playSound',
        value: function playSound() {
            var audio = document.getElementById('beep');
            audio.play();
        }
    }, {
        key: 'stopSound',
        value: function stopSound() {
            var audio = document.getElementById('beep');
            audio.pause();
            audio.currentTime = 0;
        }
    }, {
        key: 'sessionDecrease',
        value: function sessionDecrease() {
            if (!this.state.running) {
                if (this.state.sessionMin > 1) {
                    this.sessionHolder = this.state.sessionMin - 1;
                    this.setState(function (_ref) {
                        var sessionMin = _ref.sessionMin;
                        return { sessionMin: sessionMin - 1 };
                    });

                    if (this.state.clockType == 'Session') {
                        this.setState({ minuteLeft: this.sessionHolder,
                            secondLeft: 0 });
                    }
                }
            }
        }
    }, {
        key: 'sessionIncrease',
        value: function sessionIncrease() {
            if (!this.state.running) {
                if (this.state.sessionMin < 60) {
                    this.sessionHolder = this.state.sessionMin + 1;
                    this.setState(function (_ref2) {
                        var sessionMin = _ref2.sessionMin;
                        return { sessionMin: sessionMin + 1 };
                    });

                    if (this.state.clockType == 'Session') {
                        this.setState({ minuteLeft: this.sessionHolder,
                            secondLeft: 0 });
                    }
                }
            }
        }
    }, {
        key: 'breakDecrease',
        value: function breakDecrease() {
            if (!this.state.running) {
                if (this.state.breakMin > 1) {
                    this.breakHolder = this.state.breakMin - 1;
                    this.setState(function (_ref3) {
                        var breakMin = _ref3.breakMin;
                        return { breakMin: breakMin - 1 };
                    });

                    if (this.state.clockType == 'Break') {
                        this.setState({ minuteLeft: this.breakHolder,
                            secondLeft: 0 });
                    }
                }
            }
        }
    }, {
        key: 'breakIncrease',
        value: function breakIncrease() {
            if (!this.state.running) {
                if (this.state.breakMin < 60) {
                    this.breakHolder = this.state.breakMin + 1;
                    this.setState(function (_ref4) {
                        var breakMin = _ref4.breakMin;
                        return { breakMin: breakMin + 1 };
                    });

                    if (this.state.clockType == 'Break') {
                        this.setState({ minuteLeft: this.breakHolder,
                            secondLeft: 0 });
                    }
                }
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.setState({ sessionMin: 25, breakMin: 5, running: false, minuteLeft: 25, secondLeft: 0, clockType: 'Session' });
            this.stopSound();
        }
    }, {
        key: 'switchState',
        value: function switchState() {
            this.setState(function (_ref5) {
                var running = _ref5.running;
                return { running: !running };
            });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.breakHolder = this.state.breakMin;
            this.sessionHolder = this.state.sessionMin;
            this.setState({ minuteLeft: this.sessionHolder });
        }
    }, {
        key: 'countSession',
        value: function countSession() {
            var second = this.state.secondLeft,
                minute = this.state.minuteLeft;

            if (this.state.running) {

                if (second > 0) {
                    this.setState(function (_ref6) {
                        var secondLeft = _ref6.secondLeft;
                        return {
                            secondLeft: secondLeft - 1
                        };
                    });
                }

                if (second === 0) {

                    if (minute === 0) {
                        this.playSound();

                        if (this.state.clockType == 'Session') {
                            this.setState({ minuteLeft: this.breakHolder, clockType: 'Break' });
                        } else {
                            this.setState({ minuteLeft: this.sessionHolder, clockType: 'Session' });
                        }
                    } else {

                        this.setState(function (_ref7) {
                            var minuteLeft = _ref7.minuteLeft;
                            return {
                                minuteLeft: minuteLeft - 1,
                                secondLeft: 59

                            };
                        });
                    }
                }
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.myInterval = setInterval(this.countSession, 1000);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { id: 'container' },
                React.createElement(
                    'p',
                    { id: 'title' },
                    'POMODORO CLOCK'
                ),
                React.createElement(
                    'div',
                    { id: 'components' },
                    React.createElement(SessionAdjust, { increase: this.sessionIncrease.bind(this), decrease: this.sessionDecrease.bind(this), sessionMin: this.state.sessionMin }),
                    React.createElement(Display, { minuteLeft: this.state.minuteLeft, secondLeft: this.state.secondLeft, clockType: this.state.clockType, sessionMin: this.state.sessionMin, 'default': this.state.default }),
                    React.createElement(BreakAdjust, { increase: this.breakIncrease.bind(this), decrease: this.breakDecrease.bind(this), breakMin: this.state.breakMin })
                ),
                React.createElement(Control, { reset: this.reset.bind(this), switchState: this.switchState.bind(this), running: this.state.running }),
                React.createElement('audio', { src: url, id: 'beep' })
            );
        }
    }]);

    return App;
}(React.Component);

var SessionAdjust = function SessionAdjust(props) {

    return React.createElement(
        'div',
        { className: 'adjust' },
        React.createElement(
            'p',
            { id: 'session-label' },
            'Session Length'
        ),
        React.createElement(
            'div',
            { onClick: props.increase, id: 'session-increment' },
            React.createElement('i', { className: 'fas fa-caret-up' })
        ),
        React.createElement(
            'div',
            { id: 'session-length' },
            props.sessionMin
        ),
        React.createElement(
            'div',
            { onClick: props.decrease, id: 'session-decrement' },
            React.createElement('i', { className: 'fas fa-caret-down' })
        )
    );
};

var BreakAdjust = function BreakAdjust(props) {

    return React.createElement(
        'div',
        { className: 'adjust' },
        React.createElement(
            'p',
            { id: 'break-label' },
            'Break Length'
        ),
        React.createElement(
            'div',
            { onClick: props.increase, id: 'break-increment' },
            React.createElement('i', { 'class': 'fas fa-caret-up' })
        ),
        React.createElement(
            'div',
            { id: 'break-length' },
            props.breakMin
        ),
        React.createElement(
            'div',
            { onClick: props.decrease, id: 'break-decrement' },
            React.createElement('i', { 'class': 'fas fa-caret-down' })
        )
    );
};

var Control = function Control(props) {
    return React.createElement(
        'div',
        { id: 'control' },
        React.createElement(
            'div',
            { onClick: props.switchState, id: 'start_stop' },
            props.running ? React.createElement('i', { className: 'fas fa-pause' }) : React.createElement('i', { 'class': 'fas fa-play' })
        ),
        React.createElement(
            'div',
            { onClick: props.reset, id: 'reset' },
            React.createElement('i', { className: 'fas fa-undo-alt' })
        )
    );
};

var Display = function Display(props) {

    return React.createElement(
        'div',
        { id: 'display' },
        React.createElement(
            'p',
            { id: 'timer-label' },
            'On: ',
            props.clockType
        ),
        React.createElement(
            'p',
            { id: 'time-left' },
            props.minuteLeft < 10 ? '0' + props.minuteLeft : props.minuteLeft,
            ':',
            props.secondLeft < 10 ? '0' + props.secondLeft : props.secondLeft
        )
    );
};
ReactDOM.render(React.createElement(App, null), document.querySelector('#App'));

var url = 'https://freesound.org/people/Freezeman/sounds/153213/download/153213__freezeman__beep1.wav';