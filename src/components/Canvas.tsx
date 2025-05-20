
import React, { useRef } from "react";
import { ElementType, WebsiteElement } from "@/types/elements";
import { CanvasElement } from "./CanvasElement";

interface CanvasProps {
  elements: WebsiteElement[];
  selectedElement: WebsiteElement | null;
  onElementUpdate: (element: WebsiteElement) => void;
  onElementSelect: (element: WebsiteElement | null) => void;
  onElementDelete: (id: string) => void;
}

export const Canvas = ({
  elements,
  selectedElement,
  onElementUpdate,
  onElementSelect,
  onElementDelete,
}: CanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      onElementSelect(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData("element") as ElementType;
    
    if (elementType && canvasRef.current) {
      const canvasBounds = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - canvasBounds.left;
      const y = e.clientY - canvasBounds.top;
      
      // Create a new element at drop position
      const newElement: WebsiteElement = {
        id: `element-${Date.now()}`,
        type: elementType,
        position: { x, y },
        size: { width: 200, height: elementType === ElementType.Image ? 150 : 'auto' },
        content: getDefaultContent(elementType),
        style: getDefaultStyle(elementType),
      };
      
      onElementUpdate(newElement);
      onElementSelect(newElement);
    }
  };

  return (
    <div className="flex-1 relative overflow-auto bg-gray-100">
      <div 
        ref={canvasRef}
        className="w-full h-full min-h-[calc(100vh-4rem)] relative p-4"
        onClick={handleCanvasClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="w-full h-full min-h-[800px] bg-white shadow-md relative">
          {elements.map((element) => (
            <CanvasElement
              key={element.id}
              element={element}
              isSelected={selectedElement?.id === element.id}
              onUpdate={onElementUpdate}
              onSelect={() => onElementSelect(element)}
              onDelete={() => onElementDelete(element.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function getDefaultContent(type: ElementType): string {
  switch (type) {
    case ElementType.Heading:
      return "Add Your Heading";
    case ElementType.Paragraph:
      return "Add your paragraph text here. Click to edit.";
    case ElementType.Image:
      return "https://placehold.co/600x400";
    case ElementType.Subtitle:
      return "Add Your Subtitle";
    case ElementType.List:
      return "Item 1\nItem 2\nItem 3";
    case ElementType.Table:
      return "Header 1,Header 2,Header 3\nRow 1 Col 1,Row 1 Col 2,Row 1 Col 3\nRow 2 Col 1,Row 2 Col 2,Row 2 Col 3";
    case ElementType.Navbar:
      return "Home,About,Services,Contact";
    case ElementType.Audio:
      return "https://example.com/audio-file.mp3";
    default:
      return "";
  }
}

function getDefaultStyle(type: ElementType): Record<string, string> {
  switch (type) {
    case ElementType.Heading:
      return { 
        fontSize: "2rem", 
        fontWeight: "bold",
        color: "#333333" 
      };
    case ElementType.Subtitle:
      return { 
        fontSize: "1.5rem", 
        fontWeight: "600",
        color: "#555555" 
      };
    case ElementType.Paragraph:
      return { 
        fontSize: "1rem",
        lineHeight: "1.5",
        color: "#666666"
      };
    case ElementType.Image:
      return {
        border: "none",
        borderRadius: "0"
      };
    case ElementType.Navbar:
      return {
        backgroundColor: "#f8f9fa",
        padding: "15px",
        textAlign: "center",
        width: "100%"
      };
    default:
      return {};
  }
}
