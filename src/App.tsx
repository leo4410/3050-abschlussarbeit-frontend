import { useState } from 'react'
import StationsComponent from "./components/stations.component.tsx"
import SnowComponent from './components/snow.component.tsx';
import { Button, ButtonGroup, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

function App() {

  const [menu, setMenu] = useState("Schneehöhen")
  const [selectedStations, setSelectedStations] = useState<any[]>([{
    "network": "BEOB",
    "station_code": "1JA0",
    "label": "Jaunpass",
    "active": true,
    "lon": 7.339465,
    "lat": 46.593472,
    "elevation": 1520,
    "type": null
  }, {
    "network": "BEOB",
    "station_code": "1SM0",
    "label": "Saanenmöser",
    "active": true,
    "lon": 7.297512,
    "lat": 46.518764,
    "elevation": 1390,
    "type": null
  }, {
    "network": "IMIS",
    "station_code": "STH1",
    "label": "Stockhorn",
    "active": true,
    "lon": 7.538571,
    "lat": 46.693863,
    "elevation": 2190,
    "type": "WIND"
  },
  ])
  const [startDate, setStartDate] = useState<Dayjs>(dayjs("2024-12-16"))
  const [endDate, setEndDate] = useState<Dayjs>( dayjs("2024-12-22"))

  return (
    <div>
      <Typography variant="h1">Schneehöhen</Typography>
      <Typography variant="body1">Erarbeitet im Rahmen der Abschlussarbeit des Modul 3050 BSc Geomatik FHNW. <br/> Data Source <a href="https://www.slf.ch/de/services-und-produkte/slf-datenservice/">https://www.slf.ch/de/services-und-produkte/slf-datenservice/</a></Typography>
      <p></p>
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        {menu === "Schneehöhen" && <Button value="Schneehöhen" variant="contained" onClick={(event) => { setMenu(event.currentTarget.value) }}>Schneehöhen</Button>}
        {menu !== "Schneehöhen" && <Button value="Schneehöhen" variant="outlined" onClick={(event) => { setMenu(event.currentTarget.value) }}>Schneehöhen</Button>}
        {menu === "Standorte" && <Button value="Standorte" variant="contained" onClick={(event) => { setMenu(event.currentTarget.value) }}>Standorte</Button>}
        {menu !== "Standorte" && <Button value="Standorte" variant="outlined" onClick={(event) => { setMenu(event.currentTarget.value) }}>Standorte</Button>}
      </ButtonGroup>


      {menu === "Schneehöhen" && <SnowComponent selectedStations={selectedStations} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}></SnowComponent>}
      {menu === "Standorte" && <StationsComponent selectedStations={selectedStations} setSelectedStations={setSelectedStations}></StationsComponent>}

    </div>

  )
}

export default App
