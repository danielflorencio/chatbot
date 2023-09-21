import { Button, TextField, Typography } from "@mui/material";
import { Option } from "../../types/Step";

export default function NextStepConfig({option}: {option: Option }){
    return(
        <>
            {
                !!option.referenceNextStepId ? 
                (
                    <TextField
                    label='Next step CTA'
                    sx={{width: '49%'}}
                    disabled
                    size="small"
                    />
                )
                :
                (
                    <Button 
                    variant='outlined'
                    color='success'
                    sx={{width: '49%'}}
                    size='small'
                    >
                        Create New Step
                    </Button>
                )
            }
        </>
    )
}