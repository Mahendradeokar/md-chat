import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

export default function ChatInterface() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar />
      <MainContent />
    </div>
  );
}
