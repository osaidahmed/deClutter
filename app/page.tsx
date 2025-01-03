import Sidebar from "./components/sidebar";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-center mt-16">Welcome to DeClutter</h1>
        <p className="text-center mt-4">DeClutter is a website organization tool that allows you to store and organize your favorite websites.</p>
      </div>
    </div>
  );
}
