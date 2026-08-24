import { useState, useCallback } from "react";
import { 
  ReactFlow, 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState
} from "@xyflow/react";
import type { Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { InfoPanel } from "../components/ui/InfoPanel";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const initialNodes: Node[] = [
  { id: "internet", position: { x: 400, y: 50 }, data: { label: "Internet" }, style: { background: "#E2E8F0", border: "1px solid #94A3B8", borderRadius: "8px" } },
  { id: "edge", position: { x: 400, y: 150 }, data: { label: "Edge Router (ISR 4331)" }, style: { background: "#fff", border: "2px solid var(--color-primary)", borderRadius: "8px", fontWeight: "bold" } },
  { id: "fw", position: { x: 400, y: 250 }, data: { label: "Firewall (Firepower)" }, style: { background: "#fff", border: "2px solid var(--color-danger)", borderRadius: "8px", fontWeight: "bold" } },
  { id: "core", position: { x: 400, y: 350 }, data: { label: "Core Switch (Cat 9300)" }, style: { background: "#fff", border: "2px solid var(--color-primary)", borderRadius: "8px", fontWeight: "bold" } },
  { id: "sw-hr", position: { x: 200, y: 450 }, data: { label: "HR Switch (VLAN 10)" }, style: { background: "#fff", border: "1px solid #cbd5e1", borderRadius: "8px" } },
  { id: "sw-it", position: { x: 400, y: 450 }, data: { label: "IT Switch (VLAN 20)" }, style: { background: "#fff", border: "1px solid #cbd5e1", borderRadius: "8px" } },
  { id: "sw-fin", position: { x: 600, y: 450 }, data: { label: "Finance Switch (VLAN 30)" }, style: { background: "#fff", border: "1px solid #cbd5e1", borderRadius: "8px" } },
  { id: "dc", position: { x: 650, y: 250 }, data: { label: "Data Center (VLAN 50)" }, style: { background: "#fff", border: "2px solid var(--color-secondary)", borderRadius: "8px", fontWeight: "bold" } },
];

const initialEdges: Edge[] = [
  { id: "e1", source: "internet", target: "edge", animated: true },
  { id: "e2", source: "edge", target: "fw", animated: true },
  { id: "e3", source: "fw", target: "core", animated: true },
  { id: "e4", source: "core", target: "sw-hr", animated: true },
  { id: "e5", source: "core", target: "sw-it", animated: true, style: { stroke: "orange" } },
  { id: "e6", source: "core", target: "sw-fin", animated: true },
  { id: "e7", source: "fw", target: "dc", animated: true },
];

export function Topology() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Network Topology</h2>
        <p className="text-[var(--color-text-secondary)]">Interactive map of the enterprise infrastructure.</p>
      </div>
      
      <div className="flex flex-1 gap-6 min-h-0">
        <div className="flex-1 bg-gray-50 rounded-xl border border-[var(--color-border)] overflow-hidden relative">
          <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            onNodesChange={onNodesChange} 
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            fitView
            attributionPosition="bottom-right"
          >
            <MiniMap />
            <Controls />
            <Background gap={12} size={1} />
          </ReactFlow>
        </div>

        {selectedNode && (
          <div className="w-80 flex-shrink-0 overflow-y-auto">
            <Card>
              <CardHeader>
                <CardTitle>{selectedNode.data.label as string}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="success">Online</Badge>
                  <Badge variant="outline">ID: {selectedNode.id}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm">
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium text-green-600">Operational</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-500">Uptime</span>
                    <span className="font-medium">142 Days, 6 Hrs</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-500">Last Config</span>
                    <span className="font-medium">Yesterday</span>
                  </div>
                </div>

                <InfoPanel title="Device Details">
                  This is a simulated {selectedNode.data.label as string}. In a real network, clicking this would show live interface statistics and routing tables.
                </InfoPanel>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
