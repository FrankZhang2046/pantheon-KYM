import React, {useEffect, useState} from 'react';
import firebase from 'firebase';

const LoggedIn = props => {
    useEffect(()=>{
        setTimeout(()=>{
            console.log(`getCurrentUserProfile triggered`)
            getCurrentUserProfile()
        }, 5000)
    }, [])

    const [displayName, registerDisplayName] = useState();
    const [displayEmail, registerDisplayEmail] = useState();

    const getCurrentUserProfile = () => {
        const user = firebase.auth().currentUser;
        if (user !== null) {
            registerDisplayName(user.displayName);
            registerDisplayEmail(user.email);
        }
    }

    return (
        <div>
            congratulations! You have been logged in!
            <div>Greetings {displayName}, your email is: {displayEmail}</div>
            <button onClick={()=>{getCurrentUserProfile()}}>GET USER INFO</button>
        </div>
    )
}

export default LoggedIn;
