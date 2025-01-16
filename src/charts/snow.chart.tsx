import { useEffect, useState } from "react";
import { PlainObject, VegaLite } from "react-vega";
import spec from "./specs/snow.spec.json"
import { Box, CircularProgress, Typography } from "@mui/material";

function SnowChart({ stations }: { stations: any[] }) {

    // const STATIONDATA_URL = "https://three050-abschlussarbeit-backend.onrender.com/api/";
    const STATIONDATA_URL = "http://127.0.0.1:8000/api/";

    const [loading, setLoading] = useState<boolean>(true)
    const [snow, setSnow] = useState<PlainObject>({})

    useEffect(() => {
        updateSpec();
    }, []);

    async function updateSpec() {
        setLoading(true);

        if (stations.length !== 0 && stations !== undefined) {
            var snow: any[] = []

            for (var station of stations) {
                var query = STATIONDATA_URL + "snow/station/" + station["station_code"] + "?year=2022"
                var stationSnow = await fetchSnow(query)
                snow = snow.concat(stationSnow)
            }

            setSnow({
                table: snow
            })

            setLoading(false)
        }
    }

    async function fetchSnow(query: string) {
        var responsedata = await fetch(query);
        var jsondata = await responsedata.json();
        return jsondata
    }

    return (
        <>
            <div>
                {loading && <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>}

                {!loading && <VegaLite spec={spec} data={snow}></VegaLite>}
            </div>
        </>
    )
}

export default SnowChart
