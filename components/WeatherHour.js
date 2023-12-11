/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from 'react'
import styles from '@/styles/WeatherHour.module.css'

const WeatherHour = (props) => {
  const [isActive, setisActive] = useState()

  const myRef = useRef();

  // console.log(myRef.current)


  const { data, cwdata, showBox, weather } = props;
  // console.log("Weather hour")
  // console.log(data, cwdata, isActive)



  return (
    <div>

      {data && cwdata && <div className={`card my-2 container ${styles.weatherBox} ${isActive ? `${styles.active}` : ''}`} style={{visibility: `${showBox}? "visible": "hidden"`}} id="weather-box" ref={myRef}>

        <div className={`${styles.cardBody} weatherDetails row`} id='card-body'>

            <div className="col-lg-5 col-md-12">

              <h4 className="mb-1 sfw-normal" style={{ fontSize: "30px" }}>{data.city.name}, {data.city.country}</h4>

              <h4 style={{ fontSize: "61px" }}>{parseInt(cwdata.main.temp)}°C</h4>

              <p>Max: <strong>{parseInt(cwdata.main.temp_max)}°C</strong>, Min: <strong>{parseInt(cwdata.main.temp_min)}°C</strong></p>

            </div>

            <div className="col-lg-3 col-md-12 d-flex flex-column align-items-start justify-content-center">

              {/* <p className="mb-2">Cut: <strong>{parseInt(cwdata.main.temp)}°C</strong></p> */}
              <p><i class="bi bi-wind"></i> <strong>{parseInt((cwdata.wind.speed)*1.60)} km/hr</strong></p>
              <p><i class="bi bi-droplet-fill"></i> <strong>{parseInt(cwdata.main.humidity)}%</strong></p>
              <p><i class="bi bi-moisture"></i> <strong>{parseInt(cwdata.wind.speed)}h</strong></p>

            </div>

            <div className="weatherImage col-lg-3 col-md-12 d-flex flex-column align-items-center justify-content-center ">
              <img src={`/diff-weather/${weather}.png`} alt="" id='weather-icon' width="96px" height="96px" />
              <h4 style={{ fontSize: "25px", fontFamily: `'IBM Plex Mono', "monospace"`, fontWeight: "bold", padding: "10px" }}>{cwdata.weather[0].main}</h4>
            </div>

          </div>


        </div>
      }

    </div>
  )
}

export default WeatherHour