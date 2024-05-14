import React, { useEffect, useState } from 'react'
import Pie from './Pie'
import Parliament from './Parliament'
import Bar from './Bar'
import Barpol from './Barpol'
import Map from './Map'
import RacChart from './RacChart'
import img1 from './Jsoft.png'
import img2 from './jsoft-initial.png'
import './Login-Custom.css'
import { Link, useNavigate } from 'react-router-dom';
import post from '../Utility/APIHandle'
import API from '../Utility/API'

const Main = () => {
    const navigate = useNavigate()
    const [count, setcount] = useState('')
    const [flag, setflag] = useState(true)
    const [login, setLogin] = useState({
        "LoginID": "",
        "PassWord": ""
    })
    useEffect(() => {
        if (count === '') {
            setTimeout(() => {
                setcount(0)
            }, 3500);
        } else {
            if (count < 6) {
                if (count === 1 || count === 4) {
                    setTimeout(() => {
                        setcount(count + 1)
                    }, 4000);
                } else {
                    setTimeout(() => {
                        setcount(count + 1)
                    }, 1500);
                }
            } else {
                setflag(false)
            }
        }
    }, [count])


    function handleLogin() {
        post(login, API.login, {}, "post").then((res) => {
         
            if (res.data === undefined) {
                alert(res.Error)
            } else {
                if (res.data.HasError === false) {
                    if (res.data.UserName === undefined) {
                        alert(res.data.Message)
                    } else {
                        localStorage.setItem('username', res.data.UserName.UserName)
                        navigate('/Home', { replace: true })
                    }
                } else {
                    alert(res.data.Message)
                }
            }
        })


    }

    function handleoninputChange(e) {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    return (

        <body class="welcome">
            <span id="splash-overlay" class="splash"></span>
            <span id="welcome" class="z-depth-4"><img src={img1} alt="Trulli" width="100%" height="100%" /></span>

            <main class="valign-wrapper">
                <span class="container grey-text text-lighten-1 ">
                    {count !== '' &&
                        <div class="container">
                            <div class="login-box">
                                <img src={img2} alt="Avatar" class="avatar" />
                                <h2>Login</h2>
                                <form>
                                    <div class="user-box dd">
                                        <input type="text" name="LoginID" required onChange={handleoninputChange} />
                                        <label>Username</label>
                                    </div>
                                    <div class="user-box">
                                        <input type="password" name="PassWord" required onChange={handleoninputChange} />
                                        <label>Password</label>
                                    </div>

                                    <Link id='Log' onClick={handleLogin}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        LOGIN
                                    </Link>

                                </form>
                            </div>
                        </div>
                    }
                    {flag === true ? count === 0 ? <Pie /> : count === 1 ? <Parliament /> : count === 2 ? <Bar /> : count === 3 ? <Barpol /> : count === 4 ? <Map /> : count === 5 ? <RacChart /> : null : <Bar />}


                </span>
            </main>

        </body>





    )
}

export default Main