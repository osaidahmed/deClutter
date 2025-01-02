/*
Side bar for keeping track of different lists of the users websites along with the ability to add new lists, delete lists, view lists, and add tags 
*/
"use client";
import { useState } from "react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className = "flex h-screen">
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? "w-80" : "w-24"} bg-sidebar text-white h-screen p-4`}>
                <button onClick={toggleSidebar} className="bg-sidebar-500 text-white p-2 rounded-md mb-4">{isOpen ? "Collapse" : "Expand"}</button>
                {isOpen && (
                    <div>
                        <h2 className="text-xl">Lists</h2>
                        <ul>
                            
                        </ul>
                    </div>
                )}
            </div> 
        </div>
    );
};

export default Sidebar;