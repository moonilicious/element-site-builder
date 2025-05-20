
import { useState, useEffect, useRef } from "react";
import { ElementType, WebsiteElement } from "@/types/elements";
import { Rnd } from "react-rnd";
import { cn } from "@/lib/utils";

interface CanvasElementProps {
  element: WebsiteElement;
  isSelected: boolean;
  onUpdate: (element: WebsiteElement) => void;
  onSelect: () => void;
  onDelete: () => void;
}

export const CanvasElement = ({
  element,
  isSelected,
  onUpdate,
  onSelect,
  onDelete,
}: CanvasElementProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const editableRef = useRef<HTMLDivElement>(null);

  // Enable editing mode automatically when element is selected and is a text-based element
  useEffect(() => {
    const isTextElement = [
      ElementType.Heading, 
      ElementType.Paragraph, 
      ElementType.Subtitle,
      ElementType.List
    ].includes(element.type);
    
    if (isSelected && isTextElement) {
      // Short delay to ensure element is properly selected before editing
      const timer = setTimeout(() => {
        setIsEditing(true);
        if (editableRef.current) {
          editableRef.current.focus();
        }
      }, 100);
      
      return () => clearTimeout(timer);
    } else if (!isSelected) {
      setIsEditing(false);
    }
  }, [isSelected, element.type]);

  const handleResizeStop = (e: any, direction: any, ref: HTMLElement, delta: any) => {
    onUpdate({
      ...element,
      size: {
        width: ref.style.width,
        height: ref.style.height
      }
    });
  };

  const handleDragStop = (e: any, d: any) => {
    onUpdate({
      ...element,
      position: { x: d.x, y: d.y }
    });
  };

  const handleContentChange = () => {
    if (editableRef.current) {
      onUpdate({
        ...element,
        content: editableRef.current.innerText
      });
    }
  };

  const handleDoubleClick = () => {
    if (element.type !== ElementType.Image && element.type !== ElementType.Audio) {
      setIsEditing(true);
      setTimeout(() => {
        if (editableRef.current) {
          editableRef.current.focus();
          document.execCommand('selectAll', false, undefined);
        }
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
    if (e.key === 'Delete' && isSelected && !isEditing) {
      onDelete();
    }
  };

  const renderElementContent = () => {
    const style = { ...element.style };
    
    switch (element.type) {
      case ElementType.Heading:
        return (
          <h1
            ref={editableRef}
            contentEditable={isEditing}
            onBlur={handleContentChange}
            suppressContentEditableWarning={true}
            style={style}
            className="outline-none w-full h-full m-0"
          >
            {element.content}
          </h1>
        );
      
      case ElementType.Subtitle:
        return (
          <h2
            ref={editableRef}
            contentEditable={isEditing}
            onBlur={handleContentChange}
            suppressContentEditableWarning={true}
            style={style}
            className="outline-none w-full h-full m-0"
          >
            {element.content}
          </h2>
        );
        
      case ElementType.Paragraph:
        return (
          <p
            ref={editableRef}
            contentEditable={isEditing}
            onBlur={handleContentChange}
            suppressContentEditableWarning={true}
            style={style}
            className="outline-none w-full h-full m-0"
          >
            {element.content}
          </p>
        );
        
      case ElementType.Image:
        return (
          <img
            src={element.content}
            alt="Website element"
            className="w-full h-full object-cover"
            style={style}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format";
            }}
          />
        );
        
      case ElementType.List:
        return (
          <div
            ref={editableRef}
            contentEditable={isEditing}
            onBlur={handleContentChange}
            suppressContentEditableWarning={true}
            style={style}
            className="outline-none w-full h-full"
          >
            <ul className="pl-5 m-0">
              {element.content.split('\n').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        );
        
      case ElementType.Table:
        const rows = element.content.split('\n');
        return (
          <div 
            className="w-full h-full overflow-auto" 
            style={style}
          >
            <table className="w-full border-collapse">
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.split(',').map((cell, cellIndex) => (
                      rowIndex === 0 ? (
                        <th 
                          key={cellIndex}
                          className="border border-gray-300 p-2 bg-gray-100"
                        >
                          {cell}
                        </th>
                      ) : (
                        <td 
                          key={cellIndex}
                          className="border border-gray-300 p-2"
                        >
                          {cell}
                        </td>
                      )
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        
      case ElementType.Navbar:
        const links = element.content.split(',');
        return (
          <nav
            style={style}
            className="w-full flex items-center justify-center"
          >
            <ul className="flex space-x-4 p-0 m-0 list-none">
              {links.map((link, index) => (
                <li key={index} className="hover:text-blue-600 cursor-pointer">
                  {link}
                </li>
              ))}
            </ul>
          </nav>
        );
        
      case ElementType.Audio:
        return (
          <audio
            controls
            className="w-full h-full"
            style={style}
          >
            <source src={element.content} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        );
        
      default:
        return null;
    }
  };

  return (
    <Rnd
      position={{ x: element.position.x, y: element.position.y }}
      size={{ 
        width: element.size.width,
        height: element.size.height
      }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      enableResizing={isSelected}
      disableDragging={isEditing}
      className={cn(
        "relative bg-transparent",
        isSelected && "outline outline-2 outline-blue-500"
      )}
      bounds="parent"
    >
      <div className="w-full h-full">
        {renderElementContent()}
      </div>
      
      {isSelected && (
        <div className="absolute -top-6 right-0 bg-blue-500 text-white text-xs py-1 px-2 rounded-t flex items-center">
          {element.type}
        </div>
      )}

      {!isSelected && (
        <div className="absolute inset-0 cursor-move hover:bg-blue-100/20" onClick={onSelect}></div>
      )}
    </Rnd>
  );
};
