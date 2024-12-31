import List from "./list";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className = "text-2xl">Home</h1>

      <List />
    </div>
  );
}
