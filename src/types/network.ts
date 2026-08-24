export type DeviceStatus = "Online" | "Warning" | "Offline";
export type DeviceType = "Router" | "Switch" | "Firewall" | "Server" | "Access Point" | "Client";

export interface Device {
  id: string;
  hostname: string;
  type: DeviceType;
  vendor: string;
  model: string;
  ip: string;
  mac: string;
  location: string;
  vlan: number;
  status: DeviceStatus;
  firmware: string;
  lastSeen: string;
  owner: string;
}

export interface Vlan {
  id: number;
  name: string;
  network: string;
  gateway: string;
  devicesCount: number;
  purpose: string;
  status: "Active" | "Restricted" | "Inactive";
  description: string;
}

export interface RouteEntry {
  destination: string;
  nextHop: string;
  interface: string;
  protocol: "Connected" | "Static" | "OSPF" | "BGP";
  metric: number;
  status: "Active" | "Inactive";
}

export interface ServerDetails {
  id: string;
  name: string;
  ip: string;
  status: "Operational" | "Degraded" | "Offline";
  cpu: number;
  memory: number;
  storage: number;
  uptime: string;
  vlan: number;
  services: string[];
}
