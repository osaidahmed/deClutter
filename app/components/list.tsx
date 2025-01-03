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
    const [name, setName] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [tag, setTag] = useState<string>("");
    const [websites, setWebsites] = useState<{ [key: string]: Website[] }>({});

    // Load websites on mount
    useEffect(() => {
        const loadWebsites = () => {
            try {
                const data = localStorage.getItem("websites");
                console.log("Raw localStorage data:", data);

                if (data) {
                    const savedWebsites = JSON.parse(data);
                    // Ensure the structure is correct
                    if (typeof savedWebsites === 'object') {
                        setWebsites(savedWebsites);
                    } else {
                        console.error("Invalid data structure in localStorage");
                        setWebsites({ [pageId]: [] });
                    }
                } else {
                    setWebsites({ [pageId]: [] });
                }
            } catch (error) {
                console.error("Error loading websites:", error);
                setWebsites({ [pageId]: [] });
            }
        };

        loadWebsites();
    }, [pageId]);

    const addWebsite = () => {
        if (!pageId || !name || !url) return;

        const updatedWebsites = {
            ...websites,
            [pageId]: [...(websites[pageId] || []), { name, url, tag }]
        };

        try {
            localStorage.setItem("websites", JSON.stringify(updatedWebsites));
            setWebsites(updatedWebsites);
            setName("");
            setUrl("");
            setTag("");
        } catch (error) {
            console.error("Error saving website:", error);
        }
    };

    // Debug current state
    useEffect(() => {
        console.log("Current pageId:", pageId);
        console.log("Current websites state:", websites);
        console.log("Current page websites:", websites[pageId]);
    }, [websites, pageId]);

    return (
        <div className="flex flex-col space-y-4">
            <div>
                <h2 className="text-2xl text-center mb-4">Lists for {pageId}</h2>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border p-2 mr-2"/>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" className="border p-2 mr-2"/>
                <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Tag" className="border p-2 mr-2"/>
                <button onClick={addWebsite}className="transition-all duration-300 hover:bg-gray-200 text-white px-4 py-2 rounded">Add Website</button>
            </div>
            
            {websites[pageId] && websites[pageId].length > 0 ? (
                <div>
                    {websites[pageId].map((website, index) => (
                        <div key={index} className="border p-2 mb-2">
                            <a className="underline hover:underline-offset-4 " href = {website.url}>{website.name}</a>
                            <span className="ml-4 text-gray-500">{website.tag}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No websites added yet.</p>
            )}
        </div>
    );
};

export default List;