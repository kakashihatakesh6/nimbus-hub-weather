/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react'
import styles from '@/styles/WeatherHour.module.css'

const WeatherHour = (props) => {

  const { data, cwdata, showBox, weather, clockData } = props;

  return (
    
    <div className={styles.weatherHour}>

      {/*=========== Card Container ==============*/}
      {data && cwdata && <div className={`card my-2 container ${styles.weatherBox} `} id="weather-box" style={{ visibility: `${showBox}? "hidden": "visible"` }}>

        {/*=============== Time Badgs ================*/}
        <div className={styles.timeSpan}>
          <span>
            {clockData.date} <strong> {clockData.time}</strong>
          </span>
        </div>

        {/*=============== Card Body ================*/}
        <div className={`${styles.cardBody} weatherDetails row`} id='card-body'>
          
          {/* col-1  */}
          <div className="col-lg-5 col-md-12 text-center">
            <h4 className="mb-1 sfw-normal" style={{ fontSize: "30px" }}>{data.city.name}, {data.city.country}</h4>
            <h4 style={{ fontSize: "61px" }}>{parseInt(cwdata.main.temp)}°C</h4>
            <p>Max: <strong>{parseInt(cwdata.main.temp_max)}°C</strong>,
             Min: <strong>{parseInt(cwdata.main.temp_min)}°C</strong></p>
          </div>

          {/* col-2  */}
          <div className={`${styles.windData} col-lg-3 col-md-12 d-flex flex-column align-items-start justify-content-center`}>
            <p><i className="bi bi-wind"></i> <strong>{parseInt((cwdata.wind.speed) * 1.60)} km/hr</strong></p>
            <p><i className="bi bi-droplet-fill"></i> <strong>{parseInt(cwdata.main.humidity)}%</strong></p>
            <p><i className="bi bi-moisture"></i> <strong>{parseInt(cwdata.wind.speed)}h</strong></p>
          </div>

          {/* col-3  */}
          <div className={`${styles.weatherImage} col-lg-3 col-md-12 d-flex flex-column align-items-center justify-content-center`}>
            <img src={`/diff-weather/${weather}.png`} alt="" id='weather-icon' width="96px" height="96px" />
            <h4 style={{ fontSize: "25px", fontFamily: `'IBM Plex Mono', "monospace"`, fontWeight: "bold", padding: "10px" }}>{cwdata.weather[0].main}</h4>
          </div>

        </div>

        {/*================ Period Data ================ */}
        <div className={`${styles.weatherTime}`}>

          {/* Left arrow */
          <i class="bi bi-caret-left pt-4"></i> }
          <div className={`${styles.slideContainer}`}>

            {data.list.map(item => {

              return <div key={item.dt} className={`${styles.weatherTimeItem}`}>
                <h5><strong>{parseInt(item.main.temp)}°C</strong></h5>
                <h6><strong>{item.dt_txt.split(" ")[1].slice(0, 5)}</strong></h6>
              </div>

            })

            }

          </div>
          <i class="bi bi-caret-right-fill pt-4"></i> 
          {/* Right arrow */}

        </div>


      </div>

      }

    </div>
  )
}

export default WeatherHour