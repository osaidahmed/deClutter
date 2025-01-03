/*
Manage a list of websites that the user appends to the list. 
Dynamic array of items where each item is an object storing website information
*/

"use client";
import { useState } from "react";

interface Website {
    name: string;
    url: string;
    tag: string;
}

const List = () => {
    const [websites, setWebsites] = useState<Website[]>([]);
    const [name, setName] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [tag, setTag] = useState<string>("");

    const addWebsite = () => { 
        setWebsites([...websites, { name, url, tag }]);
        setName("");
        setUrl("");
        setTag("");
    };
    return (
        <div className="flex flex-col space-y-4">
            <div>
                <h2 className = "text-2xl text-center mb-4">Lists</h2>
                <input type = "text" value = {name} onChange = {(e) => setName(e.target.value)} placeholder="Name"/>
                <input type = "text" value = {url} onChange = {(e) => setUrl(e.target.value)} placeholder="URL"/>
                <input type = "text" value = {tag} onChange = {(e) => setTag(e.target.value)} placeholder="Tag"/>

                <button onClick = {addWebsite} className="transition-all duration-300 hover:bg-gray-200"> Add Website</button>
            </div>

            <ul>
                {websites.map((website, index) => (
                    <li key = {index} className="mb-2 grid grid-cols-2 gap-10">
                        <a className="underline hover:underline-offset-4 " href = {website.url}>{website.name}</a>
                        <span className="ml-4 text-gray-500"> {website.tag}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;