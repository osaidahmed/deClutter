/*
Manage a list of websites that the user appends to the list. 
Dynamic array of items where each item is an object storing website information
*/

"use client";
import { useState, useEffect } from "react";

interface Website {
    name: string;
    url: string;
    tag: string;
}

interface ListProps {
    pageId: string;
}


const List = ({ pageId }: ListProps) => {
    const [name, setName] = useState<string>(""); // Add a name to the website
    const [url, setUrl] = useState<string>(""); // Add a URL to the website
    const [tag, setTag] = useState<string>(""); // Add a tag to the website
    const [websites, setWebsites] = useState<{ [key: string]: Website[] }>({});

    // Load the websites from the local storage
    useEffect(() => {
        const savedWebsites = JSON.parse(localStorage.getItem("websites") || "{}");
        setWebsites(savedWebsites);
    }, []);

    //  Save the websites to the local storage
    useEffect(() => {
        localStorage.setItem("websites", JSON.stringify(websites));
    }, [websites]);

    // If the pageId is not in the websites object, add it
    useEffect(() => {
        if (pageId && !websites[pageId]) {
            setWebsites((prev) => ({
                ...prev,
                [pageId]: [],
            }));
        }
    }, [pageId, websites]);

    // Function to add a website to the list
    const addWebsite = () => {
        if (pageId && name && url) {
            setWebsites((prev) => ({
                ...prev,
                [pageId]: [...(prev[pageId] || []), { name, url, tag }],
            }));
            setName("");
            setUrl("");
            setTag("");
        }
    };
    return (
        <div className="flex flex-col space-y-4">
            <div>
                <h2 className = "text-2xl text-center mb-4">Lists for {pageId}</h2>
                <input type = "text" value = {name} onChange = {(e) => setName(e.target.value)} placeholder="Name"/>
                <input type = "text" value = {url} onChange = {(e) => setUrl(e.target.value)} placeholder="URL"/>
                <input type = "text" value = {tag} onChange = {(e) => setTag(e.target.value)} placeholder="Tag"/>

                <button onClick = {addWebsite} className="transition-all duration-300 hover:bg-gray-200"> Add Website</button>
            </div>

            <ul className="mt-4">
                    {websites[pageId]?.map((website, index) => (
                        <li key={index} className="mb-2 grid grid-cols-2 gap-10">
                        <a 
                            href={website.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="underline hover:underline-offset-4"
                        >
                            {website.name}
                        </a>
                        <span className="ml-4 text-gray-500">{website.tag}</span>
                    </li>
                    ))}
                </ul>
        </div>
    );
};

export default List;