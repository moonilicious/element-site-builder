
import { useEffect, useState, CSSProperties } from "react";
import { WebsiteElement } from "@/types/elements";
import { ElementType } from "@/types/elements";

export const WebsitePreview = () => {
  const [elements, setElements] = useState<WebsiteElement[]>([]);

  useEffect(() => {
    // Retrieve elements from session storage
    const storedElements = sessionStorage.getItem("previewElements");
    if (storedElements) {
      setElements(JSON.parse(storedElements));
    }
  }, []);

  // Sort the elements by Y position to ensure natural top-to-bottom flow
  const sortedElements = [...elements].sort((a, b) => a.position.y - b.position.y);

  const renderElementContent = (element: WebsiteElement) => {
    const style: CSSProperties = { 
      ...element.style as CSSProperties,
      position: "absolute",
      left: `${element.position.x}px`,
      top: `${element.position.y}px`,
      width: element.size.width,
      height: element.size.height,
    };
    
    switch (element.type) {
      case ElementType.Heading:
        return <h1 style={style}>{element.content}</h1>;
      
      case ElementType.Subtitle:
        return <h2 style={style}>{element.content}</h2>;
        
      case ElementType.Paragraph:
        return <p style={style}>{element.content}</p>;
        
      case ElementType.Image:
        return (
          <img
            src={element.content}
            alt="Website element"
            style={style}
            className="object-cover"
          />
        );
        
      case ElementType.List:
        return (
          <ul style={style}>
            {element.content.split('\n').map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
        
      case ElementType.Table:
        const rows = element.content.split('\n');
        return (
          <div style={style}>
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
          <nav style={style} className="flex items-center justify-center">
            <ul className="flex space-x-4">
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
          <audio controls style={style}>
            <source src={element.content} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="absolute top-4 left-4 z-10">
        <button 
          onClick={() => window.close()} 
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
        >
          Close Preview
        </button>
      </div>
      
      <div className="w-full min-h-screen relative">
        {sortedElements.map((element) => (
          <div key={element.id}>
            {renderElementContent(element)}
          </div>
        ))}
      </div>
    </div>
  );
};
