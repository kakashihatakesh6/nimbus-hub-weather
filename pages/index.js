/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import WeatherHour from '@/components/WeatherHour';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
  const [clockData, setClockData] = useState("");

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);


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

  // Changing background image imediately to avoid delay on image changing
  useEffect(() => {
    if (weather !== '') {
      setbackgroundImage2(`/background/${weather}.jpg`);
    }
  }, [weather])

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

  // Clicking on search icon
  const handleClick = () => {
    if (inputvalue !== "") {
      fetchWeatherData();
    }
    else {
      seterror("Please Enter the City Name");
      setDataStatus(false)
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

      // Show toast message
      setTimeout(() => {
        showToastGreetings(weather)

      }, 1000);


    } catch (error) {
      seterror("Please enter a valid city name");
      setDataStatus(false)
      toast('🌞 Please Enter the right credentials!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    }

  }

  const showToastGreetings = (message) => {
    const Greetings = {
      clear: '🌞 Bask in the warmth of a cloudless sky today. Perfect for outdoor adventures!',
      clouds: '⛅ A mix of sun and clouds awaits you today. Perfect weather for a leisurely stroll!',
      mist: '💨 The world is shrouded in mist, lending an air of mystery to the surroundings. Take it slow and enjoy the ethereal beauty!',
      fog: '🌞 A veil of fog blankets the landscape, creating an enchanting ambiance. Embrace the tranquil atmosphere!"',
      rain: "☔ It's a rainy day outside, but don't let that dampen your spirits! Embrace the cozy atmosphere indoors.",
      haze: '🌞 Through the haze, find beauty in the subtle dance of light and shadow. Stay safe, embrace the moment, and remember: clarity follows every mist.',
      smoke: '🌞 Through the haze, find beauty in the subtle dance of light and shadow. Stay safe, embrace the moment, and remember: clarity follows every mist.',
      snow: '🌞 The world is dressed in a pristine blanket of snow, transforming it into a winter wonderland',
      thuderstorm: '⚡Listen to the symphony of thunder and rain as nature puts on a dramatic show outside.'
    }

    console.log(weather)
    toast(Greetings.smoke, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  }

  const handleMyLocation = () => {
    fetchGeoData();
  }

  useEffect(() => {
    // Check if the Geolocation API is supported by the browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          // fetchLocationData(position.coords.latitude, position.coords.longitude);
        },
        // Error callback
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchGeoData = async () => {
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

      const urlCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${parseFloat(latitude).toFixed(2)}&lon=${parseFloat(longitude).toFixed(2)}&units=${objFetch.units}&appid=${objFetch.appid}`;
      const url3Hour = `https://api.openweathermap.org/data/2.5/forecast?lat=${parseFloat(latitude).toFixed(2)}&lon=${parseFloat(longitude).toFixed(2)}&units=${objFetch.units}&appid=${objFetch.appid}&cnt=${objFetch.cnt}`;

      // Fetching weather data from api 
      const [cwdata, data] = await Promise.all([
        fetch(urlCurrentWeather).then(res => res.json()),
        fetch(url3Hour).then(res => res.json())
      ])
      console.log("CWD=>", cwdata);
      console.log("CWD=>", data);


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

      // Show toast message
      setTimeout(() => {
        showToastGreetings(weather)

      }, 1000);


    } catch (error) {
      seterror("Please enter a valid city name");
      setDataStatus(false)
      toast('🌞 Please Enter the right credentials!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
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

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />

      <main className={`${styles.homeMain}`} id='home-main' style={{ backgroundImage: `url(${backgroundImage2})` }}>


        <section className={styles.weatherSection} id='weather-section'>

          <div className="row input-container justify-content-center">
            <div className="container d-flex flex-column justify-content-center align-items-center">

              {/*========= GREETING MESSAGE=========== */}
              <div className={styles.welcomeText} >
                <h3>Greetings, &nbsp;<span>Weather Enthusiast!</span></h3>
              </div>

              {/*============ {INPUT TAG} =============== */}
              <div className={styles.searchBox}>

                <div className={styles.searchContainer}>
                  <input type="text" className={`search-input ${styles.searchInput}`} value={inputvalue} onChange={handleOnchange}
                    placeholder="Enter your city name" name='city' aria-label="city" onKeyDown={handleKeyPress} required />
                  <span ><i onClick={handleClick} className="bi bi-search cursor-pointer"></i></span>
                </div>

                <div className={styles.location} onClick={handleMyLocation}>
                  <i className="bi bi-crosshair"></i>
                </div>

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


        {/*===============  { WEATHER BOX } ============*/}
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
