import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { InfoPanel } from "../components/ui/InfoPanel";
import { Terminal } from "lucide-react";

export function CommandReference() {
  const categories = [
    {
      title: "Interface",
      commands: [
        { cmd: "show ip interface brief", desc: "Quickly displays interface status and assigned IP addresses." },
        { cmd: "show interfaces", desc: "Displays detailed interface statistics, including MAC addresses and MTU." },
      ]
    },
    {
      title: "VLAN & Switching",
      commands: [
        { cmd: "show vlan brief", desc: "Lists all VLANs and the switch ports assigned to them." },
        { cmd: "show interfaces trunk", desc: "Shows which ports are operating as trunks and allowed VLANs." },
        { cmd: "show mac address-table", desc: "Displays the MAC address table used for Layer 2 forwarding." }
      ]
    },
    {
      title: "Routing",
      commands: [
        { cmd: "show ip route", desc: "Displays the IPv4 routing table." },
        { cmd: "show ip ospf neighbor", desc: "Lists all established OSPF neighbor relationships." },
        { cmd: "show ip protocols", desc: "Displays parameters and state of active routing protocols." }
      ]
    },
    {
      title: "Connectivity & Security",
      commands: [
        { cmd: "ping <ip>", desc: "Sends ICMP echo requests to verify connectivity." },
        { cmd: "traceroute <ip>", desc: "Discovers the path packets take to a destination." },
        { cmd: "show access-lists", desc: "Displays all configured ACLs and their match statistics." }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Cisco Command Reference</h2>
        <p className="text-[var(--color-text-secondary)]">Essential IOS commands for managing and troubleshooting the infrastructure.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {categories.map((cat, i) => (
            <Card key={i}>
              <CardHeader className="bg-gray-50 border-b border-[var(--color-border)] py-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-gray-500" />
                  {cat.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {cat.commands.map((c, j) => (
                  <div key={j} className="border border-gray-100 rounded-md p-3 bg-white shadow-sm">
                    <div className="font-mono text-sm text-[var(--color-primary)] font-bold mb-1 bg-gray-50 p-1.5 rounded inline-block">
                      {c.cmd}
                    </div>
                    <p className="text-sm text-gray-700 ml-1"><strong>Purpose:</strong> {c.desc}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <InfoPanel title="Privilege Levels in Cisco IOS">
            <p><strong>User EXEC Mode (`&gt;`)</strong><br/>Limited examination of router. Cannot change configuration.</p>
            <p className="mt-2"><strong>Privileged EXEC Mode (`#`)</strong><br/>Detailed examination of router. Reached by typing `enable`.</p>
            <p className="mt-2"><strong>Global Configuration Mode (`(config)#`)</strong><br/>Commands affect the entire system. Reached by typing `configure terminal`.</p>
          </InfoPanel>
        </div>
      </div>
    </div>
  );
}
