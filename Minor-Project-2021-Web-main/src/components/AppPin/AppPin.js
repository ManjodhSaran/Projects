import React, { useState } from 'react'
import './AppPin.css'
const AppPin = () => {
    const [pin, setPin] = useState("1325");
    return (
        pin !== "1325" && <div className="appPin">
            <div className="appPin__container">
                <input
                    type="password"
                    placeholder="Enter Pin"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                />
            </div>
        </div>
    )
}
export default AppPin