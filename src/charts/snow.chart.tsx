import { useEffect, useState } from "react";
import { PlainObject, VegaLite } from "react-vega";
import spec from "./specs/snow.spec.json"
import { Box, CircularProgress } from "@mui/material";
import { Dayjs } from "dayjs";

function SnowChart({ stations, startDate, endDate }: { stations: any[], startDate: Dayjs, endDate: Dayjs }) {

    // const STATIONDATA_URL = "https://three050-abschlussarbeit-backend.onrender.com/api/";
    const STATIONDATA_URL = "http://127.0.0.1:8000/api/";

    const [loading, setLoading] = useState<boolean>(true)
    const [snow, setSnow] = useState<PlainObject>({})

    useEffect(() => {
        updateSpec();
    }, []);

    useEffect(() => {
        updateSpec();
    }, [startDate, endDate]);

    async function updateSpec() {
        setLoading(true);

        if (stations.length !== 0 && stations !== undefined) {
            var snow: any[] = []

            for (var station of stations) {
                var query = STATIONDATA_URL + "snow/station/" + station["station_code"] + "?startDate=" + startDate.format("YYYY-MM-DD") + "&endDate=" + endDate.format("YYYY-MM-DD")
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

                {!loading && <VegaLite spec={spec} data={snow} width={window.innerWidth * 0.8} height={window.innerHeight / 2}></VegaLite>}
            </div>
        </>
    )
}

export default SnowChart
