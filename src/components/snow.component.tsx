import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SelectedMap from '../maps/selected.map';
import { Alert, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers';
import SnowChart from '../charts/snow.chart';

function SnowComponent({ selectedStations }: { selectedStations: any[] }) {

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker label="Basic date picker" />
            </LocalizationProvider>

            {selectedStations.length !== 0 && selectedStations !== undefined && <div>
                <Typography variant="h2">Schneehöhendiagramm</Typography>
                <div>
                    <SnowChart stations={selectedStations}></SnowChart>
                </div>
            </div>}

            {selectedStations.length !== 0 && selectedStations !== undefined &&
                <div>
                    <Typography variant="h2">Ausgewählte Stationen</Typography>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Station</TableCell>
                                    <TableCell>Kürzel</TableCell>
                                    <TableCell>Breitengrad</TableCell>
                                    <TableCell>Längengrad</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {selectedStations.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item["label"]}</TableCell>
                                        <TableCell>{item["station_code"]}</TableCell>
                                        <TableCell>{item["lat"]}</TableCell>
                                        <TableCell>{item["lon"]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <SelectedMap stations={selectedStations}></SelectedMap>


                </div>
            }

            {(selectedStations.length === 0 || selectedStations === undefined) && <div>
                <Alert variant="filled" severity="info">
                    Bitte wählen Sie mindestens eine Station aus!
                </Alert>
            </div>}
        </>
    )
}

export default SnowComponent
