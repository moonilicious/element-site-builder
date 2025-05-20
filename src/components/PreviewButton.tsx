
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WebsiteElement } from "@/types/elements";

interface PreviewButtonProps {
  elements: WebsiteElement[];
}

export const PreviewButton = ({ elements }: PreviewButtonProps) => {
  const handlePreview = () => {
    // Store the elements in session storage to retrieve them in the preview page
    sessionStorage.setItem("previewElements", JSON.stringify(elements));
    
    // Open a new tab with the preview page
    window.open("/preview", "_blank");
  };

  return (
    <Button 
      onClick={handlePreview} 
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
    >
      <Eye className="w-4 h-4" />
      <span>Preview</span>
    </Button>
  );
};
