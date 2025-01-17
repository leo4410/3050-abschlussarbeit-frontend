import { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import StationsMap from "../maps/stations.map.tsx"
import Checkbox from '@mui/material/Checkbox';
import SelectionboxComponent from './selectionbox.component.tsx';
import Station from "./station.component.tsx"
import { Box, LinearProgress } from '@mui/material';

const STATIONDATA_URL = "https://three050-abschlussarbeit-backend.onrender.com/api/";
// const STATIONDATA_URL = "http://127.0.0.1:8000/api/";

function StationsComponent({ selectedStations, setSelectedStations }: { selectedStations: any[], setSelectedStations: any }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [stations, setStations] = useState<any[]>([])

  useEffect(() => {
    fetchStations();
  }, []);

  async function fetchStations() {
    setLoading(true);

    var query = STATIONDATA_URL + "stations/"

    var responsedata = await fetch(query);
    var jsondata = await responsedata.json();
    setStations(jsondata)

    setLoading(false)
  }

  return (
    <>
      {loading && <Box  sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>}

      {(!loading && stations !== undefined) &&
        <div>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox


                      inputProps={{
                        'aria-label': 'select all desserts',
                      }}
                    /></TableCell>
                  <TableCell>Station</TableCell>
                  <TableCell>Kürzel</TableCell>
                  <TableCell>Netzwerk</TableCell>
                  <TableCell>Information</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {stations.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <SelectionboxComponent selectedStations={selectedStations} setSelectedStations={setSelectedStations} item={item} />
                    </TableCell>
                    <TableCell>{item["label"]}</TableCell>
                    <TableCell>{item["station_code"]}</TableCell>
                    <TableCell>{item["network"]}</TableCell>
                    <TableCell><Station station={item}></Station></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <StationsMap stations={stations}></StationsMap>
        </div>
      }
    </>
  )
}

export default StationsComponent
