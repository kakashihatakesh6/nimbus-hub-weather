/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import WeatherHour from '@/components/WeatherHour';

export default function Home() {

  const [data, setData] = useState();
  const [cwdata, setCwdata] = useState(null);
  const [inputvalue, setinputvalue] = useState('')
  const [isLoading, setIsloading] = useState(false)
  const [error, seterror] = useState()
  const [weather, setWeather] = useState('')
  const [dataStatus, setDataStatus] = useState(false)
  const [backgroundImage2, setbackgroundImage2] = useState(`/background/clear.jpg`);
  const [showBox, setShowBox] = useState(true);
  const [wtime, setWTime] = useState();
  const [wdate, setWDate] = useState();
  const [clockData, setClockData] = useState("");


  useEffect(() => {

    const currentDateTime = () => {

      const currentTime = new Date().toLocaleTimeString().split(":");
      const currentDate = new Date().toDateString();

      const objClock = {
        time: `${currentTime[0]}:${currentTime[1]} ${currentTime[2].split(" ")[1]}`,
        date: currentDate
      }
      setClockData(objClock);

    }

    currentDateTime()

    // Calling Every Second
    setInterval(currentDateTime, 1000);

  }, [])

  const handleOnchange = (e) => {
    setinputvalue(e.target.value)
  }

  // User Submit
  const handleKeyPress = (e) => {
    if (e.key == "Enter" && inputvalue !== "") {

      // Fetching data from API
      fetchWeatherData();

    }
  }

  // Fetching Data Function
  const fetchWeatherData = async () => {

    const cityName = inputvalue;

    const objFetch = {
      appid: "cd8990ee519781a0bc6968e77b06a2bc",
      city: cityName,
      units: "metric",
      cnt: "10"
    }

    try {

      // Start Loading
      setIsloading(true)

      const urlCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${objFetch.city}&units=${objFetch.units}&appid=${objFetch.appid}`;
      const url3Hour = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${objFetch.units}&appid=${objFetch.appid}&cnt=${objFetch.cnt}`;

      // Fetching weather data from api 
      const [cwdata, data] = await Promise.all([
        fetch(urlCurrentWeather).then(res => res.json()),
        fetch(url3Hour).then(res => res.json())
      ])

      // Processing data 
      if (cwdata.cod === "404") {
        setIsloading(false)
        setDataStatus(false)
        throw new Error(data.message);
      }

      setData(data)
      setCwdata(cwdata)

      // Set Values
      setWeather(cwdata.weather[0].main)
      setbackgroundImage2(`/background/${weather}.jpg?${new Date().getTime()}`);

      // Stop Loading
      setDataStatus(true)
      setIsloading(false)
      setShowBox(false)

    } catch (error) {
      seterror("Please enter a valid city name");
      setDataStatus(false)
    }

  }

  return (
    <>
      <Head>
        <title>Nimbus Hub</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="weather-favicon.png" />
      </Head>

      <main className={`${styles.homeMain}`} id='home-main' style={{ backgroundImage: `url(${backgroundImage2})` }}>


        <section className={styles.weatherSection} id='weather-section'>

          <div className="row input-container justify-content-center">
            <div className="container d-flex flex-column align-items-center">

              {/*========= GREETING MESSAGE=========== */}
              <h3 className={styles.welcomeText}>Greetings, &nbsp;<span>Weather Enthusiast!</span></h3>

              {/*============ {INPUT TAG} =============== */}
              <div className={styles.searchContainer}>
                <input type="text" className={`search-input ${styles.searchInput}`} value={inputvalue} onChange={handleOnchange}
                  placeholder="Enter your city name" name='city' aria-label="city" onKeyDown={handleKeyPress} required />
                <span><i className="bi bi-search" ></i></span>
              </div>

              {/* Error Message */}
              {error && !dataStatus && !isLoading && <p className={styles.errorMessage}>{error}</p>}

            </div>
          </div>

          {/* ============= {TIME CONTAINER} ================= */}
          <div className="row " >
            <div className={`container ${styles.timeContainer}`} style={{ display: `${!dataStatus ? "flex" : "none"}` }}>
              <span><p className="display-2 my-3" id='current-time'>{clockData.time}</p></span>
              <h3 className="mb-0" id='current-date'>{clockData.date}</h3>
            </div>
          </div>

        </section> {/* End of section  */}


        {/*===============  {WEATHER BOX} ============  */}
        <div className="weatherDiv" id='weather-hour'>

          {isLoading && <div className={`spinner-border ${styles.loadingIcon}`} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>}

          {dataStatus && !isLoading && <WeatherHour data={data} cwdata={cwdata} showBox={showBox} weather={weather} clockData={clockData} />}

        </div>


      </main> {/* End of main  */}


      {/* ======= {Footer} ======= */}
      <footer className={styles.footer} id="footer">


        <div className={styles.footerTitle}>
          <h3>Nimbus-Hub</h3>
          <p>Lorem ipsum, dolor sit elit. Saepe, sit. Error ex maiores voluptates a.</p>
        </div>

        <div className={styles.copyrightBox}>
          <div className={`${styles.credits} text-center`}>
            Designed by <a href="">Nikhil</a>
          </div>
          <div className={styles.copyright}>
            Copyright &copy; <strong><span>Nimbus-Hub</span></strong>. All Rights Reserved
          </div>
        </div>

        <div className={styles.socialLinks}>
          <a href="https://github.com/kakashihatakesh6" className="twitter"><i className="bi bi-twitter"></i></a>
          <a href="https://github.com/kakashihatakesh6" className="facebook"><i className="bi bi-facebook"></i></a>
          <a href="https://github.com/kakashihatakesh6" className="linkedin"><i className="bi bi-linkedin"></i></a>
          <a href="https://github.com/kakashihatakesh6" className="instagram"><i className="bi bi-instagram"></i></a>
          <a href="https://github.com/kakashihatakesh6" className="google-plus"><i className="bi bi-github"></i></a>
          <a href="https://github.com/kakashihatakesh6" className="facebook"><i className="bi bi-skype"></i></a>
        </div>


      </footer>
      {/*<!-- End Footer --> */}




    </>
  )
}
