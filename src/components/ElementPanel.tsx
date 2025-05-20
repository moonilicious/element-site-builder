
import { Button } from "@/components/ui/button";
import { 
  Heading1, 
  Text, 
  ImageIcon, 
  ListOrdered, 
  Table as TableIcon, 
  Layers,
  BookText,
  AudioLines
} from "lucide-react";
import { ElementType } from "@/types/elements";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ElementPanelProps {
  onAddElement: (type: ElementType) => void;
}

export const ElementPanel = ({ onAddElement }: ElementPanelProps) => {
  const elements = [
    { type: ElementType.Heading, icon: Heading1, label: "Heading" },
    { type: ElementType.Subtitle, icon: BookText, label: "Subtitle" },
    { type: ElementType.Paragraph, icon: Text, label: "Paragraph" },
    { type: ElementType.Image, icon: ImageIcon, label: "Image" },
    { type: ElementType.List, icon: ListOrdered, label: "List" },
    { type: ElementType.Table, icon: TableIcon, label: "Table" },
    { type: ElementType.Navbar, icon: Layers, label: "Navbar" },
    { type: ElementType.Audio, icon: AudioLines, label: "Audio" },
  ];

  return (
    <div className="w-64 border-r border-gray-200 bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Elements</h2>
        <p className="text-sm text-gray-500 mt-1">Drag elements to the canvas</p>
      </div>
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="p-4 grid grid-cols-2 gap-2">
          {elements.map((element) => (
            <Button
              key={element.type}
              variant="outline"
              className="flex flex-col items-center justify-center h-20 p-2"
              onClick={() => onAddElement(element.type)}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("element", element.type);
              }}
            >
              <element.icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{element.label}</span>
            </Button>
          ))}
        </div>
        <Separator />
        <div className="p-4">
          <h3 className="font-medium mb-2 text-sm">Instructions</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Drag elements onto the canvas</li>
            <li>• Click to select and edit elements</li>
            <li>• Use the right panel to style elements</li>
          </ul>
        </div>
      </ScrollArea>
    </div>
  );
};
