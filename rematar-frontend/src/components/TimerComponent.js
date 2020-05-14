import React, { Component } from 'react'
import { Alert, ToastHeader, Toast, ToastBody } from 'reactstrap';

export default class Timer extends Component {
    state = {
        days: 20,
        hour: 15,
        minutes: 30,
        seconds: 0,
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

                <Alert color="success" className="text-center">
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