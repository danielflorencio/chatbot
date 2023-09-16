import { useCallback, useState } from "react";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  ConnectionMode,
  NodeProps
} from "reactflow";
import { FlowsData } from "../../data/flows";
import CustomNode from "./Nodes/CustomNode";

import "reactflow/dist/style.css";
import { Box, Paper, Slide, Typography } from "@mui/material";
import StepNode from "./Nodes/StepNode";

// const initialNodes: Node[] = [
//   {
//     id: "1",
//     type: "custom",
//     data: { label: "Node 1" },
//     position: { x: 200, y: 100 },
//     selectable: true
//   },
//   { id: "2", type: 'custom', data: { label: "Node 2" }, position: { x: 500, y: 50 } },
//   { id: "3", type: 'custom', data: { label: "Node 3" }, position: { x: 500, y: 150 } },
//   // {
//     // id: "4",
//     // type: "custom",
//     // data: { label: "Custom Node" },
//     // position: { x: 400, y: 200 }
//   // }
// ];

// const initialEdges: Edge[] = [
//   { id: "e1-2", source: "1", target: "2", animated: true },
//   { id: "e1-3", source: "1", target: "3" }
// ];

const nodeTypes = {
  custom: CustomNode,
  step: StepNode
};

export default function ChatFlows(){

  const newInitialNodes: Node[] = FlowsData[0].steps.map((step) => {
    return {
      id: step.id,
      type: 'custom',
      data: {
        label: 'node',
        messages: [...step.messages],
        options: step.options !== undefined ? [...step.options] : null
      },
      position: { x: step.NodeXPosition, y: step.NodeYPosition}
    }
  })

  // const newInitialEdges: Edge[] = 

  // const initialNodes: Node[] = [
  //   {
  //     id: "1",
  //     type: "custom",
  //     data: { label: "Node 1" },
  //     position: { x: 200, y: 100 },
  //     selectable: true
  //   },
  //   { id: "2", type: 'custom', data: { label: "Node 2" }, position: { x: 500, y: 50 } },
  //   { id: "3", type: 'custom', data: { label: "Node 3" }, position: { x: 500, y: 150 } },
  // ];
  
  const initialEdges: Edge[] = [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e1-3", source: "1", target: "3" }
  ];



  const [nodes, , onNodesChange] = useNodesState(newInitialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );
  
  const [selectedNode, setSelectedNode] = useState<Node>();

  const handleChangeSelectedNode = (props: NodeProps) => {
    // setSelectedNode({...props})
  }

  const [open, setOpen] = useState(true);

  return (
    <Box sx={{height: '90vh', width: '100%', margin: 0}}>
      <Box sx={{position: 'absolute', right: 0, margnRight: 3, height: '90vh', display: 'flex', alignItems: 'center', zIndex: 1}}>    
        <Slide in={open}>
          <Box component={Paper} elevation={3} sx={{display: 'flex', flexDirection: 'column', minHeight: 400, minWidth: 350, borderRadius: 8, padding: 2}}>
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

    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      connectionMode={ConnectionMode.Loose}
      style={{border: '1px solid #ccc', height: '100%', width: '100%', zIndex: 0}}
    >
      <Background 
        gap={12}
        size={1.5}
        color="#ccc"
      />
      <Controls/>
    </ReactFlow>
    </Box>
  );
};