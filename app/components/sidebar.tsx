"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [pageName, setPagename] = useState<string>("");
    const [pages, setPages] = useState<string[]>([]);

    // Load the pages from the localStorage on mount
    useEffect(() => {
        const savedPages = JSON.parse(localStorage.getItem("pages") || "[]");
        setPages(savedPages);
    }, []);

    // Save pages to localStorage when pages state change
    useEffect(() => {
        localStorage.setItem("pages", JSON.stringify(pages));
    }, [pages]);

    // Function to toggle the sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Function to add a new sidebar entry. A new entry is a route to a new list of websites that the user will store
    const addSidebarEntry = () => {
        if (pageName) {
            setPages([...pages, pageName]);
            localStorage.setItem("pages", JSON.stringify(pages));
            router.push(`/lists/${pageName}`);
            setPagename("");
        }
    };

    return (
        <div className="flex h-screen">
            <div className={`relative transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"} bg-sidebar text-white h-screen p-4 w-80`}>
                {isOpen && (
                    <div className="mt-16">
                        <div className="flex items-center mb-4">
                            <input type="text" value={pageName} onChange={(e) => setPagename(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter" && pageName.trim()) {addSidebarEntry();}}} placeholder="Add a Page" className="p-2 rounded-md text-black mr-4 flex-grow"/>
                            <button onClick={addSidebarEntry} className="transition-all duration-300 bg-primary hover:bg-gray-200 text-white p-2 rounded-md">
                                <svg className="w-6 h-6 text-white hover:text-gray-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <h2 className="text-xl mb-4">Pages</h2>
                        <ul>
                            {pages.map((page, index) => (
                                <li key={index} className="mb-2 text-black underline hover:underline-offset-4 hover:text-primary">
                                    <a href={`/lists/${page}`}>{page}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <button onClick={toggleSidebar} className="fixed top-4 left-4 transition-all duration-300 bg-primary hover:bg-gray-200 p-2 rounded-md z-10">{isOpen ? "Collapse" : "Expand"}</button>
        </div>
    );
};

export default Sidebar;