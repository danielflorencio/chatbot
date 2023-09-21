import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { useState } from "react";

export default function AddResponseButton(){
    
    const [open, setOpen] = useState<boolean>(false);
    const [newResponse, setNewResponse] = useState<string>('');

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <>
            <Button variant='outlined' onClick={handleClickOpen}>Add new response</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <TextField
                    type='text'
                    label='New response'
                    value={newResponse}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type='submit'>Add Response</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}