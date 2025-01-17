import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function StationComponent({ station }: { station: any }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button startIcon={<InfoOutlinedIcon/>} onClick={handleOpen}></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {station["label"]}<br />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Kürzel: {station["station_code"]}<br />
                        Netzwerk: {station["network"]}<br />
                        Höhe: {station["elevation"]} m.ü.M<br />
                        Längengrad: {station["lat"]}<br />
                        Breitengrad: {station["lon"]}


                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default StationComponent
