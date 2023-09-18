import { Box, Paper, Slide, Typography } from "@mui/material";
import { Step } from "../../types/Step";
import { useStore } from "reactflow";

export default function StepMenu(
    {
        open,
        selectedStep
    }:
    {
        open: boolean,
        selectedStep: Step | null
    }
){

    console.log('selectedStep: ', selectedStep)

    return(
        <Box sx={{position: 'absolute', right: 8, height: '90vh', display: 'flex', alignItems: 'center', zIndex: 1}}>    
            <Slide in={open}>
                <Box component={Paper} elevation={3} sx={{display: 'flex', flexDirection: 'column', minHeight: 500, minWidth: 380, borderRadius: 6, padding: 2}}>
                    <Typography>Em caso PIZZA: </Typography>
                    <Box>
                    <Typography>Enviar opções: </Typography>
                    <Box>
                        <Typography>Opção 1</Typography>
                    </Box>
                    <Box>
                        <Typography>Opção 2</Typography>
                    </Box>
                    <Box>
                        <Typography>Opção 3</Typography>
                    </Box>
                    </Box>  
            </Box>
            </Slide>
        </Box>
    )
}