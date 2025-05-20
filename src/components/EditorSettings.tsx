
import { useState } from "react";
import { WebsiteElement } from "@/types/elements";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditorSettingsProps {
  selectedElement: WebsiteElement | null;
  onElementUpdate: (element: WebsiteElement) => void;
  onElementDelete: (id: string) => void;
}

export const EditorSettings = ({
  selectedElement,
  onElementUpdate,
  onElementDelete,
}: EditorSettingsProps) => {
  const [tab, setTab] = useState("content");

  if (!selectedElement) {
    return (
      <div className="w-64 border-l border-gray-200 bg-white p-4">
        <p className="text-gray-500 text-center mt-8">
          Select an element to edit its properties
        </p>
      </div>
    );
  }

  const handleContentChange = (content: string) => {
    onElementUpdate({
      ...selectedElement,
      content,
    });
  };

  const handleStyleChange = (property: string, value: string) => {
    onElementUpdate({
      ...selectedElement,
      style: {
        ...selectedElement.style,
        [property]: value,
      },
    });
  };

  const handlePositionChange = (axis: 'x' | 'y', value: number) => {
    onElementUpdate({
      ...selectedElement,
      position: {
        ...selectedElement.position,
        [axis]: value,
      },
    });
  };

  const handleSizeChange = (dimension: 'width' | 'height', value: string) => {
    onElementUpdate({
      ...selectedElement,
      size: {
        ...selectedElement.size,
        [dimension]: value,
      },
    });
  };

  return (
    <div className="w-64 border-l border-gray-200 bg-white flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Element Settings</h2>
        <p className="text-sm text-gray-500">{selectedElement.type}</p>
      </div>
      
      <Tabs value={tab} onValueChange={setTab} className="flex-1 flex flex-col">
        <div className="border-b">
          <TabsList className="w-full">
            <TabsTrigger value="content" className="flex-1">Content</TabsTrigger>
            <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
            <TabsTrigger value="position" className="flex-1">Position</TabsTrigger>
          </TabsList>
        </div>
        
        <ScrollArea className="flex-1">
          <TabsContent value="content" className="p-4 space-y-4">
            <div>
              <Label htmlFor="element-content">Content</Label>
              <textarea
                id="element-content"
                className="w-full min-h-[150px] p-2 border rounded mt-1"
                value={selectedElement.content}
                onChange={(e) => handleContentChange(e.target.value)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="style" className="p-4 space-y-4">
            <div>
              <Label htmlFor="font-size">Font Size</Label>
              <Input
                id="font-size"
                type="text"
                value={selectedElement.style.fontSize || ""}
                onChange={(e) => handleStyleChange("fontSize", e.target.value)}
                placeholder="e.g. 16px or 1.5rem"
              />
            </div>
            
            <div>
              <Label htmlFor="font-weight">Font Weight</Label>
              <Input
                id="font-weight"
                type="text"
                value={selectedElement.style.fontWeight || ""}
                onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
                placeholder="e.g. normal, bold, 600"
              />
            </div>
            
            <div>
              <Label htmlFor="color">Text Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="color"
                  type="color"
                  className="w-10 h-10 p-1"
                  value={selectedElement.style.color || "#000000"}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                />
                <Input
                  type="text"
                  className="flex-1"
                  value={selectedElement.style.color || ""}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="bg-color">Background Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="bg-color"
                  type="color"
                  className="w-10 h-10 p-1"
                  value={selectedElement.style.backgroundColor || "#ffffff"}
                  onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                />
                <Input
                  type="text"
                  className="flex-1"
                  value={selectedElement.style.backgroundColor || ""}
                  onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                  placeholder="transparent"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="padding">Padding</Label>
              <Input
                id="padding"
                type="text"
                value={selectedElement.style.padding || ""}
                onChange={(e) => handleStyleChange("padding", e.target.value)}
                placeholder="e.g. 10px or 1rem"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="position" className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="position-x">X Position</Label>
                <Input
                  id="position-x"
                  type="number"
                  value={selectedElement.position.x}
                  onChange={(e) => handlePositionChange("x", parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="position-y">Y Position</Label>
                <Input
                  id="position-y"
                  type="number"
                  value={selectedElement.position.y}
                  onChange={(e) => handlePositionChange("y", parseInt(e.target.value))}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  type="text"
                  value={selectedElement.size.width}
                  onChange={(e) => handleSizeChange("width", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  type="text"
                  value={selectedElement.size.height || "auto"}
                  onChange={(e) => handleSizeChange("height", e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
      
      <div className="border-t p-4">
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={() => onElementDelete(selectedElement.id)}
        >
          Delete Element
        </Button>
      </div>
    </div>
  );
};
