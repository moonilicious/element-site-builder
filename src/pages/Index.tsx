
import { useState } from "react";
import { WebsiteBuilder } from "@/components/WebsiteBuilder";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <WebsiteBuilder />
    </div>
  );
};

export default Index;
