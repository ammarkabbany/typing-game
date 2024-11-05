import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit?: string;
}

/**
 * Reusable card component for displaying statistics
 */
export default function StatCard({ icon: Icon, label, value, unit = "" }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-primary/10 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold">
            {value}{unit}
          </p>
        </div>
      </div>
    </Card>
  );
}