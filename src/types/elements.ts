
export enum ElementType {
  Heading = "Heading",
  Paragraph = "Paragraph",
  Image = "Image",
  List = "List",
  Table = "Table",
  Subtitle = "Subtitle",
  Navbar = "Navbar",
  Audio = "Audio"
}

export interface WebsiteElement {
  id: string;
  type: ElementType;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: string | number;
    height: string | number;
  };
  content: string;
  style: Record<string, string>;
}
