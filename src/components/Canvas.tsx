
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
      
      // Define default sizes based on element type
      let defaultWidth = 200;
      let defaultHeight: string | number = 'auto';
      
      switch (elementType) {
        case ElementType.Heading:
          defaultWidth = 300;
          break;
        case ElementType.Subtitle:
          defaultWidth = 250;
          break;
        case ElementType.Paragraph:
          defaultWidth = 400;
          break;
        case ElementType.Image:
          defaultWidth = 300;
          defaultHeight = 200;
          break;
        case ElementType.List:
          defaultWidth = 250;
          break;
        case ElementType.Table:
          defaultWidth = 400;
          defaultHeight = 200;
          break;
        case ElementType.Navbar:
          defaultWidth = 600;
          break;
        case ElementType.Audio:
          defaultWidth = 300;
          break;
      }
      
      // Create a new element at drop position
      const newElement: WebsiteElement = {
        id: `element-${Date.now()}`,
        type: elementType,
        position: { x, y },
        size: { width: defaultWidth, height: defaultHeight },
        content: getDefaultContent(elementType),
        style: getDefaultStyle(elementType),
      };
      
      // Add the new element and automatically select it
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
      return "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format";
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
        color: "#333333",
        padding: "10px",
        backgroundColor: "transparent"
      };
    case ElementType.Subtitle:
      return { 
        fontSize: "1.5rem", 
        fontWeight: "600",
        color: "#555555",
        padding: "8px",
        backgroundColor: "transparent" 
      };
    case ElementType.Paragraph:
      return { 
        fontSize: "1rem",
        lineHeight: "1.5",
        color: "#666666",
        padding: "10px",
        backgroundColor: "transparent"
      };
    case ElementType.Image:
      return {
        border: "1px solid #eaeaea",
        borderRadius: "4px",
        padding: "4px"
      };
    case ElementType.List:
      return {
        fontSize: "1rem",
        lineHeight: "1.6",
        color: "#666666",
        padding: "10px",
        backgroundColor: "transparent"
      };
    case ElementType.Table:
      return {
        border: "1px solid #eaeaea",
        padding: "0",
        backgroundColor: "#ffffff"
      };
    case ElementType.Navbar:
      return {
        backgroundColor: "#f8f9fa",
        padding: "15px",
        textAlign: "center",
        width: "100%",
        borderRadius: "4px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      };
    case ElementType.Audio:
      return {
        border: "1px solid #eaeaea",
        borderRadius: "4px",
        padding: "10px",
        backgroundColor: "#f9f9f9"
      };
    default:
      return {};
  }
}
