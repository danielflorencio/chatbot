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
  useReactFlow,
  useOnSelectionChange,
} from "reactflow";
import { FlowsData } from "../../data/flows";

import "reactflow/dist/style.css";
import { Box } from "@mui/material";
import StepNode from "./Nodes/StepNode";
import StepMenu from "./StepMenu"; 
import { Step } from "../../types/Step";
import OptionNode from "./Nodes/OptionNode";
import { generateUUID } from "../../helpers/uuidGenerator";

// With the getNode() function I can possibly get the node I have currently selected... 
// For the functionality I'm trying to build right now... 
// I should probably build something using the getNode() function together with the Toolbar Component from the library.
// https://reactflow.dev/docs/api/react-flow-instance/#nodes-and-edges

const newFirstNode: Node = {
  id: '0',
  type: 'step',
  data: {
    label: 'node',
    lastStepId: null, 
    nodeTitle: 'Hey',
    messages: [...FlowsData[0].steps[0].messages],
    options: FlowsData[0].steps[0].options !== undefined ? [...FlowsData[0].steps[0].options] : null
  },
  position: {x: FlowsData[0].steps[0].NodeXPosition, y: FlowsData[0].steps[0].NodeYPosition}
}

let newInitialNodes: Node[] = [newFirstNode];

export default function ChatFlow(){
  
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);

  useEffect(() => {
    const fetchFlowData = async () => {
    }
    fetchFlowData();
  }, [])

  const nodeTypes = useMemo(() => ({ step: StepNode , option: OptionNode}), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(newInitialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {

  }, [])
  
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const [open, setOpen] = useState(true);

  function SelectionChangeLogger() {
    useOnSelectionChange({
      onChange: ({ nodes, edges }) => {
        console.log('changed selection', nodes, edges)
        if(nodes.length === 1 && nodes[0].type === 'step'){
            const newSelectedStep: Step = {
              id: nodes[0].id, 
              conditionType: 'choice',
              messages: [],
              NodeXPosition: nodes[0].position.x,
              NodeYPosition: nodes[0].position.y
            }

            // This function looks into all the loaded steps of the current flow...
            // Then it compares the current selected node's id with all the step's id's in the flow. 

            if(newSelectedStep){
              setSelectedStep(newSelectedStep);   
            } 
        } else{
          setSelectedStep(null);
        }
    },
    });
  
    return null;
  }

  SelectionChangeLogger();

  const addNewStep = (lastStepId: string) => {
    const lastNode: Node<any, string | undefined> | undefined = nodes.find((node) => node.id === lastStepId);
    if(lastNode){

      const newNodeId = generateUUID();

      const newChildNode: Node = {
        id: generateUUID(),
        position: {x: 0, y: 20},
        type: 'option',
        data: {
          label: 'node',
          optionCTA: 'CTA',
          referenceNextStepId: newNodeId
        },
        extent: 'parent',
        parentNode: lastNode.id
      }

      const newNode: Node = {
        id: newNodeId,
        position: {x: lastNode.position.x + 300, y: lastNode.position.y},
        type: 'step',
        data: {
          label: 'node',
          nodeTitle: 'node 2',
          lastStepId: lastStepId,
          messages: [],
          options: [],
        }
      }

      const newEdge: Edge = {
        id: edges.length.toString(),
        source: newChildNode.id,
        target: newNode.id,
        zIndex: 999999999999999999
      }

      let newNodesState: Node[] = [...nodes];
    
      newNodesState[nodes.length - 1] = {
        ...newNodesState[nodes.length - 1],
        data: {
          ...newNodesState[nodes.length - 1].data, 
          height: lastNode.data.options.length
        }
      }

      setEdges([...edges, newEdge])
      setNodes([...newNodesState, newChildNode, newNode])
    }
  }

  const addNewChoice = (parentNodeId: string) => {

  }

  return (
    <Box sx={{height: '90vh', width: '100%', margin: 0}}>
        {!!selectedStep ? <StepMenu open={open} selectedStep={selectedStep} addNewStep={addNewStep} /> : null}
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