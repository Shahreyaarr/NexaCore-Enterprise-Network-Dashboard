import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Search, Filter, Download } from "lucide-react";
import { mockDevices } from "../data/networkData";
import type { DeviceStatus } from "../types/network";

export function DeviceInventory() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const getStatusBadge = (status: DeviceStatus) => {
    switch(status) {
      case "Online": return <Badge variant="success">{status}</Badge>;
      case "Warning": return <Badge variant="warning">{status}</Badge>;
      case "Offline": return <Badge variant="danger">{status}</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const filteredDevices = mockDevices.filter(device => 
    device.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.ip.includes(searchTerm) ||
    device.mac.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Device Inventory</h2>
          <p className="text-[var(--color-text-secondary)]">Complete asset tracking for the enterprise network.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search by hostname, IP, MAC..."
              className="w-full rounded-md border border-[var(--color-border)] bg-gray-50 pl-9 pr-4 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-[var(--color-text-secondary)]">
            Showing {filteredDevices.length} devices
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hostname</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>MAC Address</TableHead>
              <TableHead>VLAN</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDevices.map((device) => (
              <TableRow key={device.id} className="cursor-pointer hover:bg-gray-50">
                <TableCell className="font-medium text-[var(--color-primary)]">{device.hostname}</TableCell>
                <TableCell>{device.type}</TableCell>
                <TableCell className="font-mono text-xs">{device.ip}</TableCell>
                <TableCell className="font-mono text-xs text-gray-500">{device.mac}</TableCell>
                <TableCell>
                  <Badge variant="outline">VLAN {device.vlan}</Badge>
                </TableCell>
                <TableCell>{device.location}</TableCell>
                <TableCell>{getStatusBadge(device.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
