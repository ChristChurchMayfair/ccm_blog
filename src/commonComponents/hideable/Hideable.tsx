import React, { useState, PropsWithChildren, useEffect } from "react"
import Cookies from 'universal-cookie';
import './Hideable.css';
import moment from "moment";

export var Hideable: React.FC<PropsWithChildren<{uniqueIdentifier: string}>> = (props) => {
    const [closed, setClosed] = useState(true);
    let cookieKey = `hide-${props.uniqueIdentifier}`    
    const cookies = new Cookies();

    useEffect(() => {
        let cookieValue = cookies.get(cookieKey)
        console.log(cookieKey)
        console.log(cookieValue)

        if (cookieValue != "true") {
            console.log("Cookie set - setting closed to true")
            setClosed(false)
        }
    });

    var setHidden = (event:any) => {
        console.log("Setting the cookie to hide the hideable!")
        cookies.set(cookieKey, 'true', { path: '/', expires: moment().add(1, 'year').toDate() });
        setClosed(true);
    }

    var className = "hideable visible";
    if (closed) {
        var className = " hideable";
    }

    return(
        <div className={className}>
            <a href="#" className="closeButton" onClick={setHidden}></a>
            {props.children}
        </div>
    )
}