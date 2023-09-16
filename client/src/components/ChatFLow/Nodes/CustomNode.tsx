import { Box, Typography } from "@mui/material";
import { Handle, NodeProps, Position } from "reactflow";

export default function CustomNode(
    props: NodeProps,
    {
        setSelectedNode
    }:
    {
        setSelectedNode: (node: NodeProps) => void,
    }
    ){

        console.log('Node Props: ', props)

        
    
        return(
        <Box sx={{
            minHeight: '80px', 
            width: '200px', 
            // border: '2px solid #000',
            border: `${props.selected ? '1px solid blue' : '1px solid #000'}`, 
            backgroundColor: '#fff', 
            borderRadius: 8, 
            display: 'grid', 
            cursor: 'pointer',
            placeItems: 'center'}}>
            <Typography variant='body1'>Node Title</Typography>
            <Typography>{props.data.messages[0].content}</Typography>
            <Handle id='left' type='target' style={{width: 8, height: 8}} position={Position.Left}/>
            <Handle id='right' type='source' style={{width: 8, height: 8}} position={Position.Right}/>
        </Box>
    )
}