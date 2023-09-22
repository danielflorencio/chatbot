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
    // options: FlowsData[0].steps[0].options !== undefined ? [...FlowsData[0].steps[0].options] : null
    options: FlowsData[0].steps[0].options !== undefined ? [...FlowsData[0].steps[0].options] : null
  },
  position: {x: FlowsData[0].steps[0].NodeXPosition, y: FlowsData[0].steps[0].NodeYPosition}
}

let newInitialNodes: Node[] = [newFirstNode];

// let NodeCounter = 1;

// FlowsData[0].steps.map((step, stepIndex) => {
//   if(step.options){
//     step.options.map((option, optionIndex) => {
//       const newNode: Node = {
//         id: NodeCounter.toString(),
//         type: 'option',
//         data: {
//           label: 'node',
//           referenceNextStepId: option.referenceNextStepId,
//           cta: option.optionCTA, 
//         },
//         parentNode: step.id,
//         extent: 'parent',
//         // position: { x: (step.NodeXPosition + step.NodeXPosition/2),  y: (step.NodeYPosition + optionIndex*20)}
//         position: { x: 0,  y: 0}
//       }
//       NodeCounter++;
//       newInitialNodes.push(newNode);
//     })
//   } else{
//     const newNode: Node = {
//       id: NodeCounter.toString(),
//       type: 'step',
//       data: {
//         label: 'node',
//         lastStepId: step.lastStepId !== undefined ? step.lastStepId : null,
//         messages: [...step.messages],
//         options: step.options !== undefined ? [...step.options] : null
//       },
//       position: { x: step.NodeXPosition, y: step.NodeYPosition}
//     }
//     NodeCounter++;
//     newInitialNodes.push(newNode);
//   }
// })


export default function ChatFlow(){
  
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

  const nodeTypes = useMemo(() => ({ step: StepNode , option: OptionNode}), []);

  let indexCounter: number = 0;

  


  // const newInitialNodes: Node[] = FlowsData[0].steps.map((step, index) => {

  //   if(FlowsData[0].steps[index - 1].options !== undefined){
  //     indexCounter++
  //     return{
  //       id: indexCounter.toString(),
  //       type: 'option', // After defining your new node type, you can use it by using the type node option.
  //       data: {
  //         label: 'node',
  //         lastStepId: step.lastStepId !== undefined ? step.lastStepId : null,
  //         messages: [...step.messages],
  //         options: step.options !== undefined ? [...step.options] : null
  //       },
  //       extent: 'parent',
  //       parentNode: '1',
  //       position: { x: 10, y: indexCounter*80}
  //     }
  //   } else{
  //     return {
  //       // id: step.id,
  //       id: index.toString(),
  //       type: 'step', // After defining your new node type, you can use it by using the type node option.
  //       data: {
  //         label: 'node',
  //         lastStepId: step.lastStepId !== undefined ? step.lastStepId : null,
  //         messages: [...step.messages],
  //         options: step.options !== undefined ? [...step.options] : null
  //       },
  //       position: { x: step.NodeXPosition, y: step.NodeYPosition}
  //     }
  //   }
  // })










  // const newInitialNodes: Node[] = FlowsData[0].steps.map((step, index) => {

  //   if(FlowsData[0].steps[index - 1].options !== undefined){
  //     indexCounter++
  //     return{
  //       id: indexCounter.toString(),
  //       type: 'option', // After defining your new node type, you can use it by using the type node option.
  //       data: {
  //         label: 'node',
  //         lastStepId: step.lastStepId !== undefined ? step.lastStepId : null,
  //         messages: [...step.messages],
  //         options: step.options !== undefined ? [...step.options] : null
  //       },
  //       extent: 'parent',
  //       parentNode: '1',
  //       position: { x: 10, y: indexCounter*80}
  //     }
  //   } else{
  //     return {
  //       // id: step.id,
  //       id: index.toString(),
  //       type: 'step', // After defining your new node type, you can use it by using the type node option.
  //       data: {
  //         label: 'node',
  //         lastStepId: step.lastStepId !== undefined ? step.lastStepId : null,
  //         messages: [...step.messages],
  //         options: step.options !== undefined ? [...step.options] : null
  //       },
  //       position: { x: step.NodeXPosition, y: step.NodeYPosition}
  //     }
  //   }
  // })

  
  const initialEdges: Edge[] = [
    // { id: "e1-2", source: "1", target: "2", animated: true },
    // { id: "e1-3", source: "1", target: "3" }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(newInitialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    // let newParentNode = nodes[0];

    // let newFirstChildNode: Node = {
      // ...nodes[1],
      // extent: 'parent',
      // parentNode: '1'
    // };

    // let newSecondChildNode: Node = {
      // ...nodes[2],
      // extent: 'parent',
      // parentNode: '1'
    // };

    // setNodes([newParentNode, newFirstChildNode, newSecondChildNode])
  }, [])
  
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );


  const [selectedNode, setSelectedNode] = useState<Node>();

  const handleChangeSelectedNode = (props: Node) => {
    // setSelectedNode({...props})
  }

  const [open, setOpen] = useState(true);

  const reactFlowInstance = useReactFlow();

//   console.log('GET NODES: ', reactFlowInstance.getNodes());
  

  function SelectionChangeLogger() {
    useOnSelectionChange({
      onChange: ({ nodes, edges }) => {
        console.log('changed selection', nodes, edges)
        if(nodes.length === 1){
            const newSelectedStep: Step = {
              id: nodes[0].id, 
              conditionType: 'choice',
              messages: [],
              NodeXPosition: nodes[0].position.x,
              NodeYPosition: nodes[0].position.y
            }

            // FlowsData[0].steps.find((step) => step.id === nodes[0].id) 
            
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

      const newChildNode: Node = {
        id: (Number(lastNode.id) + 1).toString(),
        position: {x: 0, y: 20},
        type: 'option',
        data: {
          label: 'node',
          optionCTA: 'CTA',
          referenceNextStepId: (Number(lastNode.id) + 2).toString()
        },
        extent: 'parent',
        parentNode: lastNode.id
      }

      const newNode: Node = {
        id: (Number(lastNode.id) + 2).toString(),
        position: {x: lastNode.position.x + 300, y: lastNode.position.y},
        type: 'step',
        data: {
          label: 'node',
          nodeTitle: 'node 2',
          lastStepId: lastStepId,
          messages: [],
          options: []
        }
      }

      const newEdge: Edge = {
        id: edges.length.toString(),
        source: newChildNode.id,
        target: newNode.id,
        zIndex: 999999999999999999
      }

      setEdges([...edges, newEdge])
      setNodes([...nodes, newChildNode, newNode])
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