import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState({})
  const [tempk,setTemK]=useState(0)
  const[celcius,setCelcius]=useState(true)
  useEffect(()=>{
    
    function success(pos) {
      const crd = pos.coords;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=b95203633d0f67ec25ce3d9230290535`)
      .then(res=>{console.log(res.data),
        setCount(res.data),
        setTemK((res.data.main.temp- 273.15).toFixed(1) )
      })
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error);
  },[])
  
  const cambiar=()=>{
    setCelcius(!celcius);
    
  }
  //`App${count.weather?.[0].icon}`
  console.log(count.weather?.[0].icon)
  return (
    <div className={`App App${count.weather?.[0].icon}`}>
      <div className="contenedor">
        <h2>{count.sys?.country},{count.name}</h2>
        <img src={`https://openweathermap.org/img/wn/${count.weather?.[0].icon}@2x.png`} alt="" />
      <h2>{celcius?tempk:((Number(tempk) + 273.15).toFixed(1))} {celcius?'C°':'F° '}</h2>
      <button className='button' onClick={cambiar}>cambiar</button>
      </div>
      
    </div>
  )
}

export default App
