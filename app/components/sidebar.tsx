"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Dropdown menu interface
interface DropdownMenuProps {
    isOpen: boolean;
    onDelete: () => void;
    onRename: () => void;
    onClickOutside: () => void;
}

// Dropdown menu component
const DropdownMenu = ({isOpen, onDelete, onRename, onClickOutside}: DropdownMenuProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close the dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClickOutside();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClickOutside]);

    if (!isOpen) return null;

    return (
        <div ref={dropdownRef} className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transition ease-out duration-100">
            <div className="py-1" role="none">
                <button onClick={onRename} className="bg-transparent block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">Rename</button>
            </div>
            <div className="py-1" role="none">
                <button onClick={onDelete} className="bg-transparent block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">Delete</button>
            </div>
        </div>
    );
};

const Sidebar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [pageName, setPagename] = useState<string>("");
    const [pages, setPages] = useState<string[]>([]);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

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

    // Function to delete a page from the sidebar
    const deletePage = (index: number) => {
        const pageToDelete = pages[index];
        const updatedPages = pages.filter((_, i) => i !== index);
        
        // Update state
        setPages(updatedPages);
        
        // Update localStorage
        localStorage.setItem("pages", JSON.stringify(updatedPages));
        
        // Close dropdown
        setActiveDropdown(null);
        
        // If on the deleted page, redirect to home
        if (window.location.pathname === `/lists/${pageToDelete}`) {
            router.push('/');
        }
    };

    // Function to delete a page from the sidebar
    const renamePage = (index: number) => {
        setActiveDropdown(null);
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
                        <div>
                            <ul>
                                {pages.map((page, index) => (
                                    <li key={index} className="flow-root mb-2 text-black underline hover:underline-offset-4 hover:text-primary">
                                        <a href={`/lists/${page}`} className="float-left">{page}</a>
                                        <button onClick={() => setActiveDropdown(activeDropdown === index ? null : index)} className= "rounded-full bg-transparent float-right inline-flex items-center rounded-md hover:bg-gray-50 px-2 py-1">
                                            <svg className="w-4 h-4 text-black" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                                            </svg>
                                        </button>
                                        <DropdownMenu isOpen={activeDropdown === index} onDelete={() => deletePage(index)} onRename={() => renamePage(index)} onClickOutside={() => setActiveDropdown(null)}/>
                                    </li>
                                ))}
                            </ul>         
                        </div> 
                    </div>
                )}
            </div>
            <button onClick={toggleSidebar} className="fixed top-4 left-4 transition-all duration-300 bg-primary hover:bg-gray-200 p-2 rounded-md z-10">{isOpen ? "Collapse" : "Expand"}</button>
        </div>
    );
};

export default Sidebar;