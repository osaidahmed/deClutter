import List from "./list";
import Sidebar from "./sidebar";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col items-center flex-1 h-screen">
        <h1 className = "text-2xl font-medium">Home</h1>
        <List />
      </div>
    </div>
  );
}
