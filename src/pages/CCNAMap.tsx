import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { GraduationCap, ArrowDown } from "lucide-react";
import { InfoPanel } from "../components/ui/InfoPanel";

export function CCNAMap() {
  const concepts = [
    { ccna: "Subnetting", dashboard: "IP Address Management", proof: "IPv4 schema allocating specific /24 subnets efficiently." },
    { ccna: "VLAN", dashboard: "VLAN Management", proof: "Logical segmentation of HR, IT, Finance, and Servers." },
    { ccna: "OSPF", dashboard: "Routing", proof: "Dynamic routing table showing routes learned via OSPF." },
    { ccna: "ACL", dashboard: "Security / ACL Visualizer", proof: "Inbound Extended ACL restricting Guest and Finance access." },
    { ccna: "DHCP", dashboard: "IPAM & Wireless", proof: "DHCP scopes and Snooping mechanisms to assign IPs safely." },
    { ccna: "SSH & Hardening", dashboard: "Security", proof: "Device management restricted to SSH; Telnet disabled." },
    { ccna: "Troubleshooting", dashboard: "Troubleshooting Lab", proof: "Interactive faults applying bottom-up OSI troubleshooting." },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">CCNA → Practical Implementation</h2>
        <p className="text-[var(--color-text-secondary)]">Mapping certification knowledge to actual enterprise dashboard features.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concepts.map((c, i) => (
              <Card key={i} className="border-[var(--color-primary)] shadow-sm">
                <CardHeader className="bg-blue-50/50 pb-2 border-b">
                  <CardTitle className="text-sm font-bold flex items-center gap-2 text-blue-900">
                    <GraduationCap className="h-4 w-4" />
                    CCNA Concept: {c.ccna}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 flex flex-col items-center text-center space-y-2">
                  <ArrowDown className="h-4 w-4 text-gray-400" />
                  <div className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded w-full">
                    Used in: {c.dashboard}
                  </div>
                  <ArrowDown className="h-4 w-4 text-gray-400" />
                  <div className="text-xs text-gray-600 bg-green-50 border border-green-100 p-2 rounded w-full">
                    <strong>Evidence:</strong> {c.proof}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <InfoPanel title="Project Status">
            <ul className="space-y-2 text-sm font-medium">
              <li className="flex justify-between border-b border-blue-200 pb-1">
                Networking Fundamentals <span className="text-green-600">COMPLETE</span>
              </li>
              <li className="flex justify-between border-b border-blue-200 pb-1">
                IPv4 Addressing <span className="text-green-600">COMPLETE</span>
              </li>
              <li className="flex justify-between border-b border-blue-200 pb-1">
                Subnetting <span className="text-green-600">COMPLETE</span>
              </li>
              <li className="flex justify-between border-b border-blue-200 pb-1">
                VLAN Configuration <span className="text-green-600">COMPLETE</span>
              </li>
              <li className="flex justify-between border-b border-blue-200 pb-1">
                Inter-VLAN Routing <span className="text-green-600">COMPLETE</span>
              </li>
              <li className="flex justify-between border-b border-blue-200 pb-1">
                OSPF <span className="text-green-600">COMPLETE</span>
              </li>
              <li className="flex justify-between border-b border-blue-200 pb-1">
                DHCP <span className="text-green-600">COMPLETE</span>
              </li>
              <li className="flex justify-between border-b border-blue-200 pb-1">
                ACL <span className="text-green-600">COMPLETE</span>
              </li>
              <li className="flex justify-between border-b border-blue-200 pb-1">
                Troubleshooting <span className="text-green-600">COMPLETE</span>
              </li>
            </ul>
          </InfoPanel>
        </div>
      </div>
    </div>
  );
}
