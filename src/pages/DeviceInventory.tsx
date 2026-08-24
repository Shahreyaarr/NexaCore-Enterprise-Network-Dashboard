import { useState } from "react";
import { Card } from "../components/ui/card";
import { Search, Filter, Download, Server, Cpu, Network, Settings } from "lucide-react";
import { mockDevices } from "../data/networkData";
import type { DeviceStatus, Device } from "../types/network";
import { Modal } from "../components/ui/modal";

export function DeviceInventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<DeviceStatus | "All">("All");
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = device.hostname.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          device.ip.includes(searchTerm);
    const matchesStatus = statusFilter === "All" || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Device Inventory</h2>
          <p className="text-[var(--color-text-secondary)]">Manage and monitor all network assets.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-border)] rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by hostname or IP..." 
              className="w-full pl-10 pr-4 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select 
              className="border border-[var(--color-border)] rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as DeviceStatus | "All")}
            >
              <option value="All">All Status</option>
              <option value="Online">Online</option>
              <option value="Warning">Warning</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-[var(--color-border)]">
              <tr>
                <th className="px-6 py-3 font-medium">Hostname</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">IP Address</th>
                <th className="px-6 py-3 font-medium">MAC Address</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device) => (
                <tr 
                  key={device.id} 
                  className="border-b border-[var(--color-border)] last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedDevice(device)}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{device.hostname}</td>
                  <td className="px-6 py-4 text-gray-500">{device.type}</td>
                  <td className="px-6 py-4 font-mono text-xs">{device.ip}</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{device.mac}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      device.status === 'Online' ? 'bg-green-50 text-green-700 border-green-200' :
                      device.status === 'Warning' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      device.status === 'Offline' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-gray-50 text-gray-700 border-gray-200'
                    }`}>
                      {device.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDevices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No devices found matching your criteria.
            </div>
          )}
        </div>
      </Card>

      <Modal 
        isOpen={selectedDevice !== null} 
        onClose={() => setSelectedDevice(null)} 
        title={`Device Details: ${selectedDevice?.hostname}`}
      >
        {selectedDevice && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded text-blue-600"><Server className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs text-gray-500">IP Address</div>
                  <div className="font-mono text-sm font-medium">{selectedDevice.ip}</div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded text-purple-600"><Network className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs text-gray-500">MAC Address</div>
                  <div className="font-mono text-sm font-medium">{selectedDevice.mac}</div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded text-green-600"><Cpu className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs text-gray-500">Type</div>
                  <div className="text-sm font-medium">{selectedDevice.type}</div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded text-orange-600"><Settings className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="text-sm font-medium">{selectedDevice.location}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3 border-b pb-2">Management Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded border">
                  <span className="text-xs text-gray-500">VLAN ID</span>
                  <span className="font-medium">{selectedDevice.vlan}</span>
                </div>
                <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded border">
                  <span className="text-xs text-gray-500">Status</span>
                  <span className={selectedDevice.status === "Online" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{selectedDevice.status}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
