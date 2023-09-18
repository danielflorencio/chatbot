import { Box, Typography } from "@mui/material";
import { Handle, NodeProps, Position } from "reactflow";

export default function StepNode(
    props: NodeProps,
    {

    }:
    {

    }
    ){

        return(
        <Box sx={{
            minHeight: '80px', 
            minWidth: '200px', 
            paddingX: 3,
            paddingY: 1,
            border: `${props.selected ? '1px solid blue' : '1px solid #000'}`, 
            backgroundColor: '#fff', 
            borderRadius: 8, 
            display: 'grid', 
            cursor: 'pointer',
            placeItems: 'center'}}>
            
            <Typography variant='body1'>{props.data.messages[0].content}</Typography>

            {props.data.options &&
                props.data.options.map((option: any, index: number) => (
                    <Handle 
                    key={index}
                    id={`right-handle-stepId${props.id}-optionId-${index}`} 
                    type="source" 
                    style={{width: 8, height: 8, bottom: index*8}} 
                    position={Position.Right}
                    />
                ))
            }

            {
                props.data.lastStepId &&
                <Handle
                    type='target'
                    style={{width: 8, height: 8}}
                    position={Position.Left} 
                />
            }
            
        </Box>
    )
}