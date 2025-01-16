
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SelectedMap from '../maps/selected.map';
import { Alert } from '@mui/material';

function SnowComponent({ selectedStations }: { selectedStations: any[] }) {

    return (
        <>
            {(selectedStations.length === 0 || selectedStations === undefined) && <div>
                <Alert variant="filled" severity="info">
                    Bitte wählen Sie mindestens eine Station aus!
                </Alert>
            </div>}
            {selectedStations.length !== 0 && selectedStations !== undefined &&
                <div>
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
        </>
    )
}

export default SnowComponent
