
import { WebsiteBuilder } from "@/components/WebsiteBuilder";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <WebsiteBuilder />
      </div>
    </div>
  );
};

export default Index;
