import { useCallback, useEffect, useMemo, useState } from "react";
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

import "reactflow/dist/style.css";
import { Box, Paper, Slide, Typography } from "@mui/material";
import StepNode from "./Nodes/StepNode";
import StepMenu from "./StepMenu"; 
import { Step } from "../../types/Step";

export default function ChatFlows(){
  

  // First off, I'm gonna start loading the Flow...

  const [flow, setFlow] = useState([]);
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);

  useEffect(() => {
    const fetchFlowData = async () => {

      // setFlow([]);

      // Then I'm going to create the nodes based on this flow data.

      // setNodes([]);
    }
    fetchFlowData();
  }, [])

  /* Adding the Node Type

  You can add a new node type to React Flow by adding it to the nodeTypes prop. 
  It's important that the nodeTypes are memoized or defined outside of the component. 
  Otherwise React creates a new object on every render which leads to performance issues and bugs.

  */

  const nodeTypes = useMemo(() => ({ step: StepNode }), []);

  const newInitialNodes: Node[] = FlowsData[0].steps.map((step) => {
    return {
      id: step.id,
      type: 'step', // After defining your new node type, you can use it by using the type node option.
      data: {
        label: 'node',
        lastStepId: step.lastStepId !== undefined ? step.lastStepId : null,
        messages: [...step.messages],
        options: step.options !== undefined ? [...step.options] : null
      },
      position: { x: step.NodeXPosition, y: step.NodeYPosition}
    }
  })
  
  const initialEdges: Edge[] = [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e1-3", source: "1", target: "3" }
  ];



  const [nodes, setNodes, onNodesChange] = useNodesState(newInitialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );
  
  

  const [selectedNode, setSelectedNode] = useState<Node>();

  const handleChangeSelectedNode = (props: Node) => {
    // setSelectedNode({...props})
  }

  const [open, setOpen] = useState(true);

  return (
    <Box sx={{height: '90vh', width: '100%', margin: 0}}>
    <StepMenu open={open} selectedStep={selectedStep}/>
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