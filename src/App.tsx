import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Overview } from "./pages/Overview";
import { DeviceInventory } from "./pages/DeviceInventory";
import { VlanManagement } from "./pages/VlanManagement";
import { Ipam } from "./pages/Ipam";
import { Routing } from "./pages/Routing";
import { DataCenter } from "./pages/DataCenter";
import { Topology } from "./pages/Topology";
import { Wireless } from "./pages/Wireless";
import { Security } from "./pages/Security";
import { AclVisualizer } from "./pages/AclVisualizer";
import { Monitoring } from "./pages/Monitoring";
import { Troubleshooting } from "./pages/Troubleshooting";
import { Alerts } from "./pages/Alerts";
import { CommandReference } from "./pages/CommandReference";
import { Documentation } from "./pages/Documentation";
import { CCNAMap } from "./pages/CCNAMap";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Overview />} />
          <Route path="topology" element={<Topology />} />
          <Route path="devices" element={<DeviceInventory />} />
          <Route path="vlans" element={<VlanManagement />} />
          <Route path="ipam" element={<Ipam />} />
          <Route path="routing" element={<Routing />} />
          <Route path="servers" element={<DataCenter />} />
          <Route path="wireless" element={<Wireless />} />
          <Route path="security" element={<Security />} />
          <Route path="acl" element={<AclVisualizer />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="troubleshooting" element={<Troubleshooting />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="commands" element={<CommandReference />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="ccna" element={<CCNAMap />} />
          <Route path="*" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold mb-2">404 - Not Found</h2><p className="text-[var(--color-text-secondary)]">The requested network module does not exist.</p></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
