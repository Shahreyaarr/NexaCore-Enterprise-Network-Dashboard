import { Info } from "lucide-react";

export function InfoPanel({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Info className="h-5 w-5 text-[var(--color-primary)]" />
        <h4 className="font-semibold text-blue-900">{title}</h4>
      </div>
      <div className="text-sm text-blue-800 space-y-2">
        {children}
      </div>
    </div>
  );
}
