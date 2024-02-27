import React, {useEffect, useState} from 'react';

export default (props : { start: number | null, expiration : number | null, onExpire ?: () => void }) => {
    const { expiration, onExpire, start } = props
    const [timer, setTimer] = useState(100)

    useEffect(() => {
        if (expiration === null || start === null) {
            return
        }

        const started = start
        const interval = setInterval(() => {
            const val = 100 * ((expiration - Date.now()) / (expiration - started))
            if (val <= 0) onExpire?.()
            setTimer(val)
        }, 20)
        return () => clearInterval(interval)
    }, [expiration, onExpire])

    if (expiration === null) {
        return null
    }


    return (
        <progress id="file" value={timer} max={100}></progress>
    )
}