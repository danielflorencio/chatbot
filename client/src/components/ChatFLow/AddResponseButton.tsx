import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import React, { useState } from "react";

export default function AddResponseButton(
    {
        handleAddNewResponse
    }:
    {
        handleAddNewResponse: (newResponse: string) => void
    }
){
    
    const [open, setOpen] = useState<boolean>(false);
    const [newResponse, setNewResponse] = useState<string>('');

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddNewResponse(newResponse);
        setNewResponse('');
    }

    return(
        <>
            <Button variant='outlined' onClick={handleClickOpen}>Add new response</Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={(e) => handleSubmit(e)}>
                <DialogContent>
                    <TextField
                    type='text'
                    label='New response'
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type='submit'>Add Response</Button>
                </DialogActions>
                </form>
            </Dialog>
        </>
    )
}