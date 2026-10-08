import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { technicians } from '@/data/demo';

interface TechnicianFilterProps {
  onChange: (technicianIds: string[]) => void;
  selectedTechnicians: string[];
}

export function TechnicianFilter({ onChange, selectedTechnicians }: TechnicianFilterProps) {
  const handleTechnicianToggle = (technicianId: string) => {
    const newSelection = selectedTechnicians.includes(technicianId)
      ? selectedTechnicians.filter(id => id !== technicianId)
      : [...selectedTechnicians, technicianId];
    
    onChange(newSelection);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Technicians</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {technicians.map((technician) => (
            <div key={technician.id} className="flex items-center space-x-2">
              <Checkbox
                id={`technician-${technician.id}`}
                checked={selectedTechnicians.includes(technician.id)}
                onCheckedChange={() => handleTechnicianToggle(technician.id)}
              />
              <div className={cn("h-3 w-3 rounded-full", technician.color)} />
              <Label
                htmlFor={`technician-${technician.id}`}
                className="flex-1 cursor-pointer text-sm font-medium"
              >
                {technician.name}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}