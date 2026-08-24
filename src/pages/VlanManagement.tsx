import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { InfoPanel } from "../components/ui/InfoPanel";
import { mockVlans } from "../data/networkData";
import { Network, Server, Users, User, ShieldAlert, Cpu } from "lucide-react";
import { useState } from "react";
import { Modal } from "../components/ui/modal";
import type { Vlan } from "../types/network";

export function VlanManagement() {
  const [selectedVlan, setSelectedVlan] = useState<Vlan | null>(null);
  
  const getIconForVlan = (id: number) => {
    switch (id) {
      case 10: return <Users className="h-4 w-4" />;
      case 20: return <Cpu className="h-4 w-4" />;
      case 30: return <ShieldAlert className="h-4 w-4" />;
      case 40: return <Network className="h-4 w-4" />;
      case 50: return <Server className="h-4 w-4" />;
      case 60: return <User className="h-4 w-4" />;
      default: return <Network className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">VLAN Management</h2>
          <p className="text-[var(--color-text-secondary)]">Virtual LAN Segmentation and Subnet mapping.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>VLAN ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Network</TableHead>
                  <TableHead>Gateway</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockVlans.map((vlan) => (
                  <TableRow 
                    key={vlan.id} 
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedVlan(vlan)}
                  >
                    <TableCell className="font-semibold text-gray-900">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-[var(--color-primary)]">
                          {getIconForVlan(vlan.id)}
                        </div>
                        {vlan.id}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{vlan.name}</TableCell>
                    <TableCell className="font-mono text-xs">{vlan.network}</TableCell>
                    <TableCell className="font-mono text-xs">{vlan.gateway}</TableCell>
                    <TableCell>
                      <Badge variant={vlan.status === "Active" ? "success" : vlan.status === "Restricted" ? "warning" : "default"}>
                        {vlan.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <div className="space-y-6">
          <InfoPanel title="What is a VLAN?">
            <p>A Virtual LAN (VLAN) logically separates devices into different broadcast domains, even when they share the same physical switching infrastructure.</p>
            <p className="mt-2 font-semibold">Why use it?</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li><strong>Security:</strong> Isolates sensitive traffic (e.g., Finance).</li>
              <li><strong>Performance:</strong> Reduces broadcast traffic on the network.</li>
              <li><strong>Management:</strong> Groups users logically by function rather than physical location.</li>
            </ul>
          </InfoPanel>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 text-lg">Detailed Inspection</h3>
            <div className="text-[var(--color-text-secondary)] text-sm italic">
              Click on any VLAN in the table to open a detailed modal showing subnet boundaries, DHCP allocations, and assigned physical ports.
            </div>
          </Card>
        </div>
      </div>

      <Modal 
        isOpen={selectedVlan !== null} 
        onClose={() => setSelectedVlan(null)} 
        title={`VLAN Details: ${selectedVlan?.name} (VLAN ${selectedVlan?.id})`}
      >
        {selectedVlan && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Network Address (/24)</div>
                <div className="font-mono font-medium">{selectedVlan.network}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Default Gateway</div>
                <div className="font-mono font-medium">{selectedVlan.gateway}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Broadcast Address</div>
                <div className="font-mono font-medium">{selectedVlan.network.replace('.0/24', '.255')}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Total Devices Connected</div>
                <div className="font-medium">{selectedVlan.devicesCount} active MACs</div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3 border-b pb-2">Assigned Switch Ports</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded border">
                  <span className="font-mono text-xs font-semibold">SW-CORE-01</span>
                  <span className="font-mono text-xs">Gi1/0/1 - Gi1/0/4</span>
                </div>
                <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded border">
                  <span className="font-mono text-xs font-semibold">SW-ACCESS-02</span>
                  <span className="font-mono text-xs">Fa0/1 - Fa0/24</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3 border-b pb-2">VLAN Description & Policy</h4>
              <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded border border-blue-100">
                {selectedVlan.description}
                <br/><br/>
                <strong>Access Control:</strong> {selectedVlan.status === "Restricted" ? "Inbound traffic restricted via ACL 102. Only explicit established connections permitted." : "Standard inter-VLAN routing permitted via Core Switch."}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
