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
            height: `${!!props.data.heightMultiplier ? `${(props.data.heightMultiplier + 1)*60}px` : '60px'}`, 
            minWidth: '200px', 
            paddingX: 3,
            paddingY: 1,
            border: `${props.selected ? '1px solid blue' : '1px solid #000'}`, 
            backgroundColor: '#fff', 
            borderRadius: 8, 
            display: 'flex', 
            cursor: 'pointer',
            justifyContent: 'center'
            }}>
            
            <Typography variant='body1'>{props.data.nodeTitle}</Typography>

            {/* {props.data.options &&
                props.data.options.map((option: any, index: number) => (
                    <Handle 
                    key={index}
                    id={`right-handle-stepId${props.id}-optionId-${index}`} 
                    type="source" 
                    style={{width: 8, height: 8, bottom: index*8}} 
                    position={Position.Right}
                    />
                ))
            } */}

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