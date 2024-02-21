import React, { useState } from "react"
import { useEffect } from "react"
import { componentMounted } from "react"
import logo from "../assests/images/background1.jpg"



function SearchWeather() {
    const [search, setsearch] = useState("Karachi")
    const [data, setdata] = useState([])
    const [Input, setInput] = useState("")
    let temperature = (data.main.temp - 273.15).toFixed(2);
    let temperature_min = (data.main.temp_min - 273.15).toFixed(2);
    let temperature_max = (data.main.temp_max - 273.15).toFixed(2);

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=1d7d012881cd8ccf1947aaa2e1e30d5a`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setdata(data)
                })
        }

        fetchWeather();
    }, [])


    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default", { month: "long" })
    let day = d.toLocaleString("default", { weekday: "long" })

    let time = d.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setsearch(Input);
        console.log(Input)
    }



    let emoji = null;
    if (typeof data.main != "undefined") {
        if (data.weather[0].main == "Clouds") {
            emoji = "fa-cloud"
        }
        else if (data.weather[0].main == "Thunderstorm") {
            emoji = "fa-bolt"
        }
        else if (data.weather[0].main == "Drizzle") {
            emoji = "fa-cloud-rain"
        }
        else if (data.weather[0].main == "Rain") {
            emoji = "fa-cloud-shower-heavy"
        }
        else if (data.weather[0].main == "Snow") {
            emoji = "fa-snow-flake"
        }
        else {
            emoji = "fa-smog"
        }
    }
    else {
        return (
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card text-white text-center">
                            <img src={logo} class="card-img" alt="..." />
                            <div className="card-img-overlay">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-4 w-75 mx-auto ">
                                        <input type="search"
                                            class="form-control"
                                            placeholder="Search City"
                                            aria-label="Search City"
                                            name="search"
                                            value={Input}
                                            onChange={(e) => setInput(e.target.value)}
                                            required

                                            aria-describedby="basic-addon2" />
                                        <button type="submit" class="input-group-text" id="basic-addon2"><i className="fas fa-search"></i></button>
                                    </div>
                                </form>
                                <div className="bg-dark bg-opacity-50 py-3 ">
                                    <h2 className="card-title">{data.name}</h2>
                                    <h4 className="card-text lead "> {day}, {month} {date}, {year}</h4>
                                    <br>
                                    </br>
                                    {time}
                                    <hr />
                                    <i className={`fas ${emoji} fa-4x`}></i>
                                    <h1 className="fw-bolder mb-5">{temperature} &deg;C</h1>
                                    <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                                    <p className="lead">{temperature_min} &deg;C | {temperature_max} &deg;C</p>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchWeather