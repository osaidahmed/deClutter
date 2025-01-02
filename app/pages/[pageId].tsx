import { useRouter } from "next/router";
import { useState} from "react";

const ListPage = () => {
    const router = useRouter();
    const {pageId} = router.query;
    
    const [pages, setPage] = useState<string[]>([]);

    const addPage = (page: string) => {
        setPage([...pages, page]);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Pages: </h1>
            <input type="text" placeholder="Add a Page" onKeyPress={(e) => {
                if (e.key === "Enter") {
                    addPage(e.currentTarget.value);
                    e.currentTarget.value = "";
                }
            }}/>
            <ul>
                {pages.map((page, index) => (
                    <li key={index} className="mb-2">{page}</li>
                ))}
            </ul>
        </div>
    )
}

export default ListPage;