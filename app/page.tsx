import List from "./list";
import Sidebar from "./sidebar";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col items-center flex-1 h-screen mt-16">
        <List />
      </div>
    </div>
  );
}
