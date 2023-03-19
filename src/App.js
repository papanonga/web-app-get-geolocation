import React, { useEffect, useState } from "react";
import * as loadingData from "./loading.json";
import * as successData from "./success.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import "./App.css";

import axios from "axios";
const clockIOendpointUrl = ''  // endpoint url write location 
const configsAxios = {
    headers: {
        'Content-Type': 'application/json'
    }
}


const sendLocationToWebhook = async (payload) => {
    console.log(`fetching payload : ${payload}`)
    const result = await axios.post(clockIOendpointUrl, JSON.stringify(payload), configsAxios)
    console.log(result)
    return

}

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: successData.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};



const liff = window.liff

const liffId = ''   // LIFF Id

const lineLiffInit = async () => {
    await liff.init({ liffId: `${liffId}` }).catch(err => { throw err });
    if (liff.isLoggedIn()) {
        let fetchProfile = liff.getProfile();
        return fetchProfile
    } else {
        liff.login()
    }
}


function App() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isSendLocation, setIsSendLocation] = useState(true)
    const [userProfile, setUserProfile] = useState({
        name: '',
        userId: '',
        pictureUrl: ''
    })

    const [location, setLocation] = useState(undefined)

    useEffect(() => {
        setTimeout(() => {
            fetch("https://jsonplaceholder.typicode.com/posts")
                .then(response => response.json())
                .then(json => {
                    setLoading(true);
                    setTimeout(() => {
                        setSuccess(true);
                    }, 1000);
                });
        }, 1500);

        const fetchProfile = lineLiffInit()
        fetchProfile.then(op => {

            setUserProfile({
                name: op.displayName,
                userId: op.userId,
                pictureUrl: op.pictureUrl
            })

            navigator.geolocation.getCurrentPosition(position => {
                setLocation(`${position.coords.latitude},${position.coords.longitude}`)
                setIsSendLocation(false)
            })

        })


    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {!success ? (
                    <FadeIn>
                        <div style={{ display: "flex", flexDirection: 'column' }}>
                            {!loading ? (
                                <div>
                                    <h3>        Loading </h3>
                                    <Lottie options={defaultOptions} height={200} width={200} />

                                </div>
                            ) : (
                                <Lottie options={defaultOptions2} height={200} width={200} />
                            )}
                        </div>
                    </FadeIn>
                ) : (
                    <div>
                        <h1>Fetch Success</h1>
                        <p> User id : {userProfile.userId} </p>
                        <p> location : {location} </p>
                        <img alt="pic" src={userProfile.pictureUrl} width={250} height={250} />
                        {console.log(` undefine multiply bool : ${true && undefined}`)}
                        <br></br>
                        <button style={{ width: "200px", height: "50px", marginTop: '50px', borderRadius: 5, marginBottom: '50px' }} disabled={isSendLocation} onClick={() => {
                            const payload = {
                                userId: userProfile.userId,
                                location: location
                            }
                            setIsSendLocation(true)
                            console.log(`Button status : ${!(isSendLocation && location)}`)
                            sendLocationToWebhook(payload)
                                .then(() => {
                                    setLocation(undefined)
                                    alert(JSON.stringify(`Already sent the location`))
                                    liff.closeWindow()
                                })
                        }} > send location</button>
                    </div>

                )}
            </header>
        </div>
    );
}

export default App;