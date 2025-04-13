import { useEffect, useState } from 'react'
import { statisticStore } from '../../store/statisticStore';
import './timer.css'
export default function Timer() {

    const [time, setTime] = useState<number>(0)
 
    const { winner, isStarted, setDuration} = statisticStore()

    useEffect(() => {

        const record = setInterval(() => {
            if (winner === "" && isStarted) {
                setTime(prev => prev + 1)

            } else if (winner) {
                setDuration(time)
                setTime(0)
                clearInterval(record)

            } else  {
                setDuration(0)
                setTime(0)
                clearInterval(record)

            }

        }, 1000);

        return () => {
            clearInterval(record)
        }
    }, [winner, isStarted])


    return (
        <div className='timer'>
            <h1>{time}</h1>
        </div>
    )
}
