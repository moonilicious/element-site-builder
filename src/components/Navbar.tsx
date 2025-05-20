
import { Button } from "@/components/ui/button";
import { Undo, Redo, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Navbar = () => {
  const { toast } = useToast();
  
  const handleExport = () => {
    toast({
      title: "Coming soon",
      description: "Export functionality will be available in the next update.",
    });
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-blue-600">WebBuilder</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Redo className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <FileImage className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};
