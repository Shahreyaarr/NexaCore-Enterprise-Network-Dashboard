import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { InfoPanel } from "../components/ui/InfoPanel";
import { mockServers } from "../data/networkData";
import { Server as ServerIcon, Cpu, HardDrive, MemoryStick } from "lucide-react";

export function DataCenter() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Data Center Infrastructure</h2>
          <p className="text-[var(--color-text-secondary)]">Server and services health monitoring.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {mockServers.map(server => (
          <Card key={server.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50/50 pb-4 border-b border-[var(--color-border)] flex flex-row items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ServerIcon className="h-5 w-5 text-gray-500" />
                  {server.name}
                </CardTitle>
                <div className="text-sm text-gray-500 font-mono">{server.ip} • VLAN {server.vlan}</div>
              </div>
              <Badge variant={server.status === "Operational" ? "success" : "warning"}>
                {server.status}
              </Badge>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-xs text-gray-500 flex items-center gap-1"><Cpu className="h-3 w-3"/> CPU</div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                  <div className={`h-1.5 rounded-full ${server.cpu > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${server.cpu}%` }}></div>
                </div>
                <div className="text-sm font-semibold">{server.cpu}%</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-gray-500 flex items-center gap-1"><MemoryStick className="h-3 w-3"/> Memory</div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                  <div className={`h-1.5 rounded-full ${server.memory > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${server.memory}%` }}></div>
                </div>
                <div className="text-sm font-semibold">{server.memory}%</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-gray-500 flex items-center gap-1"><HardDrive className="h-3 w-3"/> Storage</div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                  <div className={`h-1.5 rounded-full ${server.storage > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${server.storage}%` }}></div>
                </div>
                <div className="text-sm font-semibold">{server.storage}%</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-gray-500">Uptime</div>
                <div className="text-sm font-semibold mt-2">{server.uptime}</div>
              </div>
              
              <div className="col-span-2 mt-2 pt-4 border-t border-[var(--color-border)]">
                <div className="text-xs text-gray-500 mb-2">Hosted Services</div>
                <div className="flex flex-wrap gap-2">
                  {server.services.map(srv => (
                    <Badge key={srv} variant="outline" className="text-xs bg-gray-50">{srv}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <InfoPanel title="Data Center Networking">
        <p>Servers are typically placed in their own isolated VLAN (VLAN 50) and positioned behind a firewall. This architecture is known as a DMZ (Demilitarized Zone) or an internal server farm, depending on their exposure to the internet.</p>
        <p className="mt-2">By isolating servers, we can implement strict <strong>Access Control Lists (ACLs)</strong> limiting which departments can reach specific services (e.g., only HR can reach the payroll service on the web server).</p>
      </InfoPanel>
    </div>
  );
}
