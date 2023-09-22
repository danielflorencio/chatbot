import { Box, Typography } from "@mui/material";
import { Handle, NodeProps, Position } from "reactflow";

export default function OptionNode(
    props: NodeProps,
    {

    }:
    {
        
    }
){
    return(
        <Box sx={{
        minHeight: '40px', 
        minWidth: '100px', 
        paddingX: 3,
        paddingY: 1,
        border: `${props.selected ? '1px solid blue' : '1px solid #000'}`, 
        backgroundColor: '#fff', 
        borderRadius: 8, 
        display: 'grid', 
        cursor: 'pointer',
        placeItems: 'center'}}>
            <Typography variant='body1'>{props.data.optionCTA}</Typography>
            <Handle 
            id=''
            style={{width: 8, height: 8}}
            position={Position.Right}
            type='source'
            />
        </Box>
    )
}