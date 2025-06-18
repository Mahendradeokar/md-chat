import Sidebar from "~/components/layout-sidebar/sidebar";
import MessageInput from "~/components/message-input";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-background flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <main className="bg-background flex h-full flex-1 flex-col">
        {children}
        {/* Message Input Area */}
        <MessageInput />
      </main>
    </div>
  );
}
