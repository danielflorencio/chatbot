import { Box, Divider, Typography } from "@mui/material";
import { Handle, NodeProps, Position } from "reactflow";

export default function StepNode(props: NodeProps){
    return(
        <Box sx={{minHeight: '80px', width: '200px', border: '2px solid black', borderRadius: 1, backgroundColor: 'white', padding: 0.6}}>
            <Typography variant="body2" sx={{border: '1px solid gray', borderRadius: 1}}>Message's first paragraph</Typography>
            <Divider sx={{marginY: 1}} orientation="horizontal"/>

            <Box sx={{display: 'flex', flexDirection: 'column', gap: 0.6}}>
                <Typography variant="body2" sx={{border: '1px solid gray', borderRadius: 1, '&:hover': {border: '1px solid blue'}}}>{props.data.label}</Typography>
                <Typography variant="body2" sx={{border: '1px solid gray', borderRadius: 1, '&:hover': {border: '1px solid blue'}}}>Condition two</Typography>
                <Typography variant="body2" sx={{border: '1px solid gray', borderRadius: 1, '&:hover': {border: '1px solid blue'}}}>Condition three</Typography>
            </Box>
            <Handle id='right' type='source' position={Position.Right}/>
            <Handle id='left' type='source' position={Position.Left}/>
        </Box>
    )
}