import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { InfoPanel } from "../components/ui/InfoPanel";
import { mockServers } from "../data/networkData";
import { Server as ServerIcon, Cpu, HardDrive, MemoryStick, Activity } from "lucide-react";
import { useState } from "react";
import { Modal } from "../components/ui/modal";
import type { ServerDetails } from "../types/network";

export function DataCenter() {
  const [selectedServer, setSelectedServer] = useState<ServerDetails | null>(null);
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
          <Card 
            key={server.id} 
            className="overflow-hidden cursor-pointer hover:border-[var(--color-primary)] transition-all hover:shadow-md group"
            onClick={() => setSelectedServer(server)}
          >
            <CardHeader className="bg-gray-50/50 pb-4 border-b border-[var(--color-border)] flex flex-row items-start justify-between group-hover:bg-blue-50/30 transition-colors">
              <div className="space-y-1">
                <CardTitle className="text-lg flex items-center gap-2 group-hover:text-[var(--color-primary)] transition-colors">
                  <ServerIcon className="h-5 w-5 text-gray-500 group-hover:text-[var(--color-primary)] transition-colors" />
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

      <Modal 
        isOpen={selectedServer !== null} 
        onClose={() => setSelectedServer(null)} 
        title={`Server Diagnostics: ${selectedServer?.name}`}
      >
        {selectedServer && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                <Activity className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold text-gray-900">{selectedServer.cpu}%</div>
                <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Avg CPU (24h)</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                <MemoryStick className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold text-gray-900">{selectedServer.memory}%</div>
                <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Avg RAM (24h)</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                <HardDrive className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold text-gray-900">{selectedServer.storage}%</div>
                <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Disk Usage</div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3 border-b pb-2">Service Health Status</h4>
              <div className="space-y-2 border border-gray-200 rounded-md overflow-hidden">
                {selectedServer.services.map((srv, idx) => (
                  <div key={srv} className={`flex justify-between items-center p-3 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="font-medium text-sm text-gray-700">{srv}</span>
                    </div>
                    <span className="text-xs text-green-700 font-semibold bg-green-100 px-2 py-1 rounded">RUNNING</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3 border-b pb-2">Recent System Logs</h4>
              <div className="bg-slate-900 rounded-md p-4 font-mono text-xs text-green-400 h-32 overflow-y-auto">
                <div>[10:42:01] INFO  System health check passed.</div>
                <div>[10:45:12] WARN  High CPU usage spike detected (89%).</div>
                <div>[10:45:15] INFO  CPU usage normalized.</div>
                <div>[11:00:00] INFO  Scheduled backup initiated.</div>
                <div>[11:05:22] INFO  Backup completed successfully.</div>
                <div>[11:15:30] DEBUG Connected clients: 1,245.</div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <InfoPanel title="Data Center Networking">
        <p>Servers are typically placed in their own isolated VLAN (VLAN 50) and positioned behind a firewall. This architecture is known as a DMZ (Demilitarized Zone) or an internal server farm, depending on their exposure to the internet.</p>
        <p className="mt-2">By isolating servers, we can implement strict <strong>Access Control Lists (ACLs)</strong> limiting which departments can reach specific services (e.g., only HR can reach the payroll service on the web server).</p>
      </InfoPanel>
    </div>
  );
}
