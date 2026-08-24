import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { InfoPanel } from "../components/ui/InfoPanel";
import { mockVlans } from "../data/networkData";
import { Network, Server, Users, User, ShieldAlert, Cpu } from "lucide-react";

export function VlanManagement() {
  
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
                  <TableRow key={vlan.id} className="cursor-pointer">
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
            <h3 className="font-semibold mb-4 text-lg">Selected VLAN Details</h3>
            <div className="text-[var(--color-text-secondary)] text-sm italic">
              Select a VLAN from the table to view its detailed configuration, DHCP scopes, and applied access control policies.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
