import type { Device, Vlan, RouteEntry, ServerDetails } from "../types/network";

export const mockVlans: Vlan[] = [
  { id: 1, name: "Default", network: "192.168.1.0/24", gateway: "192.168.1.1", devicesCount: 2, purpose: "Unused/Native", status: "Active", description: "Default VLAN for unassigned ports." },
  { id: 10, name: "HR", network: "192.168.10.0/24", gateway: "192.168.10.1", devicesCount: 8, purpose: "Human Resources", status: "Active", description: "Segment for HR workstations and local printers." },
  { id: 20, name: "IT", network: "192.168.20.0/24", gateway: "192.168.20.1", devicesCount: 12, purpose: "Information Technology", status: "Active", description: "IT administration and management segment." },
  { id: 30, name: "Finance", network: "192.168.30.0/24", gateway: "192.168.30.1", devicesCount: 7, purpose: "Finance Dept", status: "Active", description: "Highly restricted segment for financial systems." },
  { id: 40, name: "Management", network: "192.168.40.0/24", gateway: "192.168.40.1", devicesCount: 4, purpose: "Network Management", status: "Active", description: "In-band management for network devices." },
  { id: 50, name: "Servers", network: "192.168.50.0/24", gateway: "192.168.50.1", devicesCount: 6, purpose: "Data Center", status: "Active", description: "Server infrastructure." },
  { id: 60, name: "Guest", network: "192.168.60.0/24", gateway: "192.168.60.1", devicesCount: 10, purpose: "Guest Wi-Fi", status: "Restricted", description: "Internet-only access for guests." },
];

export const mockDevices: Device[] = [
  { id: "RTR-EDGE-01", hostname: "RTR-EDGE-01", type: "Router", vendor: "Cisco", model: "ISR 4331", ip: "10.0.0.1", mac: "00:1A:2B:3C:4D:5E", location: "MDF-Rack1", vlan: 40, status: "Online", firmware: "IOS XE 17.3", lastSeen: "Just now", owner: "NetOps" },
  { id: "FW-CORE-01", hostname: "FW-CORE-01", type: "Firewall", vendor: "Cisco", model: "Firepower 2110", ip: "10.0.0.2", mac: "00:1A:2B:3C:4D:5F", location: "MDF-Rack1", vlan: 40, status: "Online", firmware: "FTD 7.0", lastSeen: "Just now", owner: "SecOps" },
  { id: "SW-CORE-01", hostname: "SW-CORE-01", type: "Switch", vendor: "Cisco", model: "Catalyst 9300", ip: "192.168.40.2", mac: "00:1A:2B:3C:4D:60", location: "MDF-Rack2", vlan: 40, status: "Online", firmware: "IOS XE 17.6", lastSeen: "Just now", owner: "NetOps" },
  { id: "SW-ACC-HR", hostname: "SW-ACC-HR", type: "Switch", vendor: "Cisco", model: "Catalyst 9200", ip: "192.168.40.3", mac: "00:1A:2B:3C:4D:61", location: "IDF-Floor1", vlan: 40, status: "Online", firmware: "IOS XE 17.6", lastSeen: "Just now", owner: "NetOps" },
  { id: "SW-ACC-IT", hostname: "SW-ACC-IT", type: "Switch", vendor: "Cisco", model: "Catalyst 9200", ip: "192.168.40.4", mac: "00:1A:2B:3C:4D:62", location: "IDF-Floor2", vlan: 40, status: "Warning", firmware: "IOS XE 17.3", lastSeen: "2 mins ago", owner: "NetOps" },
  { id: "SRV-WEB-01", hostname: "SRV-WEB-01", type: "Server", vendor: "Dell", model: "PowerEdge R740", ip: "192.168.50.10", mac: "00:1A:2B:3C:4D:63", location: "DC-Rack1", vlan: 50, status: "Online", firmware: "Ubuntu 22.04", lastSeen: "Just now", owner: "SysOps" },
  { id: "SRV-DNS-01", hostname: "SRV-DNS-01", type: "Server", vendor: "Dell", model: "PowerEdge R640", ip: "192.168.50.11", mac: "00:1A:2B:3C:4D:64", location: "DC-Rack1", vlan: 50, status: "Online", firmware: "Windows Server 2022", lastSeen: "Just now", owner: "SysOps" },
  { id: "AP-FL1-01", hostname: "AP-FL1-01", type: "Access Point", vendor: "Cisco", model: "Aironet 3802I", ip: "192.168.40.10", mac: "00:1A:2B:3C:4D:65", location: "Ceiling-F1-North", vlan: 40, status: "Online", firmware: "8.10", lastSeen: "Just now", owner: "NetOps" },
  { id: "AP-FL1-02", hostname: "AP-FL1-02", type: "Access Point", vendor: "Cisco", model: "Aironet 3802I", ip: "192.168.40.11", mac: "00:1A:2B:3C:4D:66", location: "Ceiling-F1-South", vlan: 40, status: "Offline", firmware: "8.10", lastSeen: "1 hr ago", owner: "NetOps" },
  // Adding clients
  { id: "PC-HR-01", hostname: "PC-HR-01", type: "Client", vendor: "Lenovo", model: "ThinkPad T14", ip: "192.168.10.15", mac: "AA:BB:CC:DD:EE:01", location: "Desk H-12", vlan: 10, status: "Online", firmware: "Win 11", lastSeen: "Just now", owner: "J. Smith" },
  { id: "PC-IT-01", hostname: "PC-IT-01", type: "Client", vendor: "Apple", model: "MacBook Pro", ip: "192.168.20.15", mac: "AA:BB:CC:DD:EE:02", location: "Desk I-04", vlan: 20, status: "Online", firmware: "macOS 14", lastSeen: "Just now", owner: "A. Turing" },
];

export const mockRoutes: RouteEntry[] = [
  { destination: "0.0.0.0/0", nextHop: "10.0.0.1", interface: "Gi0/0", protocol: "Static", metric: 1, status: "Active" },
  { destination: "192.168.10.0/24", nextHop: "Direct", interface: "Vlan10", protocol: "Connected", metric: 0, status: "Active" },
  { destination: "192.168.20.0/24", nextHop: "Direct", interface: "Vlan20", protocol: "Connected", metric: 0, status: "Active" },
  { destination: "192.168.30.0/24", nextHop: "Direct", interface: "Vlan30", protocol: "Connected", metric: 0, status: "Active" },
  { destination: "10.0.0.0/30", nextHop: "Direct", interface: "Gi0/1", protocol: "Connected", metric: 0, status: "Active" },
  { destination: "172.16.0.0/16", nextHop: "10.0.0.1", interface: "Gi0/1", protocol: "OSPF", metric: 20, status: "Active" },
];

export const mockServers: ServerDetails[] = [
  { id: "SRV-WEB", name: "Web Server (Intranet)", ip: "192.168.50.10", status: "Operational", cpu: 32, memory: 58, storage: 45, uptime: "99.98%", vlan: 50, services: ["HTTP", "HTTPS", "SSH"] },
  { id: "SRV-DNS", name: "DNS/DHCP Server", ip: "192.168.50.11", status: "Operational", cpu: 15, memory: 40, storage: 20, uptime: "99.99%", vlan: 50, services: ["DNS", "DHCP", "NTP"] },
  { id: "SRV-FILE", name: "Corporate File Server", ip: "192.168.50.13", status: "Operational", cpu: 45, memory: 75, storage: 82, uptime: "99.95%", vlan: 50, services: ["SMB", "NFS", "FTP"] },
  { id: "SRV-AUTH", name: "Radius / AD Server", ip: "192.168.50.14", status: "Degraded", cpu: 88, memory: 92, storage: 60, uptime: "99.90%", vlan: 50, services: ["LDAP", "RADIUS", "Kerberos"] },
];
