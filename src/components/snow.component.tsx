import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SelectedMap from '../maps/selected.map';
import { Alert, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import SnowChart from '../charts/snow.chart';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/de';

function SnowComponent({ selectedStations, startDate, setStartDate, endDate, setEndDate }: { selectedStations: any[], startDate: Dayjs, setStartDate: any, endDate: Dayjs, setEndDate: any }) {

    return (
        <>
            {selectedStations.length !== 0 && selectedStations !== undefined && <div>
                <Typography variant="h2">Schneehöhendiagramm</Typography>
                <div>
                    <SnowChart stations={selectedStations} startDate={startDate} endDate={endDate}></SnowChart>
                </div>
            </div>}

            <div>

                <Typography variant="h2">Datumsintervall</Typography>
                <Typography variant="body1">Auswahl des Interessenszeitraum.</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                    <DatePicker value={startDate} onChange={(startDate => { if (startDate !== null) { setStartDate(startDate) } })} label="Startdatum" />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                    <DatePicker value={endDate} onChange={(endDate => { if (endDate !== null) { setEndDate(endDate) } })} label="Enddatum" />
                </LocalizationProvider>
            </div>


            {selectedStations.length !== 0 && selectedStations !== undefined &&
                <div>
                    <Typography variant="h2">Ausgewählte Stationen</Typography>
                    <Typography variant="body1">Übersicht der ausgewählten Stationen.</Typography>
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
