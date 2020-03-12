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
        _this.countBreak = _this.countBreak.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'sessionDecrease',
        value: function sessionDecrease() {
            if (!this.state.running) {
                if (this.state.sessionMin > 0) {
                    this.setState(function (_ref) {
                        var sessionMin = _ref.sessionMin;
                        return {
                            sessionMin: sessionMin - 1
                        };
                    });
                }
            }
        }
    }, {
        key: 'sessionIncrease',
        value: function sessionIncrease() {
            if (!this.state.running) {
                if (this.state.sessionMin < 60) {
                    this.setState(function (_ref2) {
                        var sessionMin = _ref2.sessionMin;
                        return {
                            sessionMin: sessionMin + 1
                        };
                    });
                }
            }
        }
    }, {
        key: 'breakDecrease',
        value: function breakDecrease() {
            if (!this.state.running) {
                if (this.state.breakMin > 0) {
                    this.setState(function (_ref3) {
                        var breakMin = _ref3.breakMin;
                        return {
                            breakMin: breakMin - 1
                        };
                    });
                }
            }
        }
    }, {
        key: 'breakIncrease',
        value: function breakIncrease() {
            if (!this.state.running) {
                if (this.state.breakMin < 60) {
                    this.setState(function (_ref4) {
                        var breakMin = _ref4.breakMin;
                        return {
                            breakMin: breakMin + 1
                        };
                    });
                }
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.setState({ sessionMin: 25, breakMin: 5, running: false });
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
            var sessionHolder = this.state.sessionMin,
                breakHolder = this.state.breakMin;
            var minute = this.state.sessionMin,
                second = this.state.secondLeft;
        }
    }, {
        key: 'countSession',
        value: function countSession() {

            var minute = this.state.sessionMin,
                second = 0;

            if (this.state.running) {
                if (second > 0) {
                    second = second - 1;
                    this.setState(function (_ref6) {
                        var secondLeft = _ref6.secondLeft;
                        return { secondLeft: second };
                    });
                }

                if (second === 0) {
                    if (minute === 0) {
                        this.countBreak();
                    } else {
                        minute = minute - 1;
                        second = 59;
                        this.setState(function (_ref7) {
                            var minuteLeft = _ref7.minuteLeft;
                            return { minuteLeft: minute, secondLeft: second };
                        });
                    }
                }
            }
        }
    }, {
        key: 'countBreak',
        value: function countBreak() {
            this.setState({ minuteLeft: this.state.breakMin });
            var minute = this.state.minuteLeft,
                second = this.state.secondLeft;

            if (second > 0) {
                this.setState(function (_ref8) {
                    var second = _ref8.second;
                    return { second: second - 1 };
                });
            }

            if (second === 0) {
                if (minute === 0) {
                    this.countSession();
                } else {
                    this.setState(function (_ref9) {
                        var minute = _ref9.minute;
                        return { minute: minute - 1, second: 59 };
                    });
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
                null,
                React.createElement(
                    'p',
                    null,
                    'POMODORO CLOCK'
                ),
                React.createElement(SessionAdjust, { increase: this.sessionIncrease.bind(this), decrease: this.sessionDecrease.bind(this), sessionMin: this.state.sessionMin }),
                React.createElement(BreakAdjust, { increase: this.breakIncrease.bind(this), decrease: this.breakDecrease.bind(this), breakMin: this.state.breakMin }),
                React.createElement(Control, { reset: this.reset.bind(this), switchState: this.switchState.bind(this) }),
                React.createElement(Display, { minuteLeft: this.state.minuteLeft, secondLeft: this.state.secondLeft })
            );
        }
    }]);

    return App;
}(React.Component);

var SessionAdjust = function SessionAdjust(props) {

    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { onClick: props.increase },
            'sessionIncrease'
        ),
        React.createElement(
            'div',
            null,
            props.sessionMin
        ),
        React.createElement(
            'div',
            { onClick: props.decrease },
            'sessionDecrease'
        )
    );
};

var BreakAdjust = function BreakAdjust(props) {

    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { onClick: props.increase },
            'breakIncrease'
        ),
        React.createElement(
            'div',
            null,
            props.breakMin
        ),
        React.createElement(
            'div',
            { onClick: props.decrease },
            'breakDecrease'
        )
    );
};

var Control = function Control(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { onClick: props.switchState },
            'Play/Pause'
        ),
        React.createElement(
            'div',
            { onClick: props.reset },
            'Reset'
        )
    );
};

var Display = function Display(props) {

    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            'Remaining Time: ',
            props.minuteLeft,
            ':',
            props.secondLeft
        )
    );
};
ReactDOM.render(React.createElement(App, null), document.querySelector('#App'));