/*
Side bar for keeping track of different lists of the users websites along with the ability to add new lists, delete lists, view lists, and add tags 
*/
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


const Sidebar = () => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(true);
    const [pageName, setPagename] = useState<string>("");
    const [pages, setPages] = useState<string[]>([]);

    // Function to toggle the sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Function to add a new sidebar entry. A new entry is a rout to a new list of websites that the user will store
    const addSidebarEntry = () => {
        if (pageName) {
            setPages([...pages, pageName]);
            //router.push(`/pages/${pageName}`);
            setPagename("");
        }
    };

    return (
        <div className = "flex h-screen">
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? "w-80" : "w-24"} bg-sidebar text-white h-screen p-4`}>
                <button onClick={toggleSidebar} className="transistion-all duration-300 bg-primary hover:bg-gray-200 p-2 rounded-md mb-4">{isOpen ? "Collapse" : "Expand"}</button>
                {isOpen && (
                    <div>
                        <input type="text" value={pageName} onChange={(e) => setPagename(e.target.value)} placeholder="Add a Page" className="p-2 rounded-md mb-4 text-black mr-4"/>
                        <button onClick={addSidebarEntry} className="transistion-all duration-300 bg-primary hover:bg-gray-200 text-white p-2 rounded-md mb-4">
                            <img src="../assets/add.png" className="w-6 h-6"/>
                        </button>
                        <h2 className="text-xl mb-4">Pages</h2>
                        <ul>
                            {pages.map((pages, index) => (
                                <li key= {index} className="mb-2 text-black underline hover:underline-offset-4 hover:text-primary">
                                    <a href={`/pages/${pages}`}>{pages}</a>
                                </li>  
                            ))};
                        </ul>
                    </div>
                )}
            </div> 
        </div>
    );
};

export default Sidebar;