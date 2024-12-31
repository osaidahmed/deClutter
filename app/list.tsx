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
        <div>
            <h2 className = "text-xl">Lists</h2>
            <input type = "text" value = {name} onChange = {(e) => setName(e.target.value)} placeholder="Name"/>
            <input type = "text" value = {url} onChange = {(e) => setUrl(e.target.value)} placeholder="URL"/>
            <input type = "text" value = {tag} onChange = {(e) => setTag(e.target.value)} placeholder="Tag"/>

            <button onClick = {addWebsite}> Add Website</button>
        </div>
    );
};

export default List;