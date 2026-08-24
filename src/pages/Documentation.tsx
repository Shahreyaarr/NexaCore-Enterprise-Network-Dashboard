import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { FileText, Download, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";

export function Documentation() {
  const [downloadedDoc, setDownloadedDoc] = useState<string | null>(null);

  const docs = [
    { title: "Network Overview", type: "Architecture", date: "24 Aug 2026" },
    { title: "IP Address Plan", type: "IPAM", date: "24 Aug 2026" },
    { title: "VLAN Topology Design", type: "Layer 2", date: "24 Aug 2026" },
    { title: "OSPF Routing Strategy", type: "Layer 3", date: "24 Aug 2026" },
    { title: "Security Policy (ACLs & Port Sec)", type: "Security", date: "24 Aug 2026" },
    { title: "Wireless Design Guidelines", type: "Wireless", date: "24 Aug 2026" },
    { title: "Incident Response Playbook", type: "Operations", date: "24 Aug 2026" },
  ];

  const changes = [
    { id: "CHG-001", date: "24 Aug 2026", change: "Created VLAN 20 for IT department.", eng: "Network Administrator", reason: "Departmental segmentation.", impact: "Low", status: "Completed" },
    { id: "CHG-002", date: "23 Aug 2026", change: "Implemented OSPF Area 0.", eng: "Senior Network Engineer", reason: "Dynamic routing requirement.", impact: "High", status: "Completed" },
    { id: "CHG-003", date: "22 Aug 2026", change: "Applied ACL 110 to Server VLAN.", eng: "Security Engineer", reason: "Restrict DB access to Web Server only.", impact: "Medium", status: "Completed" },
  ];

  const handleDownload = (docTitle: string) => {
    // Generate mock text content based on the title
    const content = `NexaCore Enterprise Network Documentation\n\nTitle: ${docTitle}\nGenerated: ${new Date().toLocaleString()}\n\nThis is an auto-generated confidential document containing configuration and architecture details for ${docTitle}.`;
    
    // Create a Blob from the content
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    // Create an invisible anchor to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = `${docTitle.replace(/\s+/g, "_").toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show brief feedback
    setDownloadedDoc(docTitle);
    setTimeout(() => setDownloadedDoc(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Documentation & Change Management</h2>
        <p className="text-[var(--color-text-secondary)]">Official network documentation and change logs.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Network Documentation Library</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {docs.map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded text-blue-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">{doc.title}</div>
                    <div className="text-xs text-gray-500">{doc.type} • Updated: {doc.date}</div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleDownload(doc.title)}
                  title={`Download ${doc.title}`}
                >
                  {downloadedDoc === doc.title ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Download className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Network Change Log</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {changes.map((c, i) => (
              <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-gray-700">{c.id}</span>
                  <span className="text-xs text-gray-500">{c.date}</span>
                </div>
                <div className="p-4 text-sm space-y-2">
                  <div><strong className="text-gray-700">Change:</strong> {c.change}</div>
                  <div><strong className="text-gray-700">Reason:</strong> {c.reason}</div>
                  <div className="flex justify-between mt-2 pt-2 border-t">
                    <div className="text-xs text-gray-500">By: {c.eng}</div>
                    <div className="text-xs font-medium text-green-600">{c.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
