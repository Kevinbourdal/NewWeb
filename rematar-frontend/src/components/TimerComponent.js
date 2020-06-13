import React, { Component } from 'react'
import { Alert } from 'reactstrap';

export default class Timer extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        // let parse_start = this.props.start.split('-')
        // let parse_end = this.props.end.split('-')
        this.state = {
            started: this.props.start > Date.now(),
            days: this.props.start.days,
            hour: this.props.start.hours,
            minutes: this.props.start.minutes,
            seconds: this.props.start.seconds,
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                    this.setState(
                        {'started': !this.state.started}
                    )
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { days, hour, minutes, seconds } = this.state
        return (

                <Alert color={this.state.started ? "success" : "danger"} className="text-center" >
                    Tiempo restante:
                    { minutes === 0 && seconds === 0
                        ? <h1>Finalizado!</h1>
                        : <h4 className="text-black-50">{days} dias - {hour}:{minutes < 10? `0${minutes}`:minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h4>
                    }
                </Alert>



        )
    }
}

/*<Toast className="text-center">
                    <ToastHeader>

                    </ToastHeader>
                    <ToastBody>

                    </ToastBody>
                </Toast>

 */