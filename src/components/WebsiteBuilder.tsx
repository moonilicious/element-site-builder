
import { useState } from "react";
import { ElementPanel } from "./ElementPanel";
import { Canvas } from "./Canvas";
import { EditorSettings } from "./EditorSettings";
import { PreviewButton } from "./PreviewButton";
import { ElementType, WebsiteElement } from "@/types/elements";

export const WebsiteBuilder = () => {
  const [elements, setElements] = useState<WebsiteElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<WebsiteElement | null>(null);

  const handleAddElement = (type: ElementType) => {
    const newElement: WebsiteElement = {
      id: `element-${Date.now()}`,
      type,
      position: { x: 50, y: 50 },
      size: { width: 200, height: type === ElementType.Image ? 150 : 'auto' },
      content: getDefaultContent(type),
      style: getDefaultStyle(type),
    };

    setElements([...elements, newElement]);
    setSelectedElement(newElement);
  };

  const handleElementUpdate = (updatedElement: WebsiteElement) => {
    setElements(elements.map(el => 
      el.id === updatedElement.id ? updatedElement : el
    ));
    if (selectedElement?.id === updatedElement.id) {
      setSelectedElement(updatedElement);
    }
  };

  const handleElementSelect = (element: WebsiteElement | null) => {
    setSelectedElement(element);
  };

  const handleElementDelete = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    if (selectedElement?.id === id) {
      setSelectedElement(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end items-center p-2 border-b">
        <PreviewButton elements={elements} />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <ElementPanel onAddElement={handleAddElement} />
        <Canvas
          elements={elements}
          selectedElement={selectedElement}
          onElementUpdate={handleElementUpdate}
          onElementSelect={handleElementSelect}
          onElementDelete={handleElementDelete}
        />
        <EditorSettings 
          selectedElement={selectedElement} 
          onElementUpdate={handleElementUpdate} 
          onElementDelete={handleElementDelete}
        />
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
