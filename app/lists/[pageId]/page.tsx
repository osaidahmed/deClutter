'use client';

import { useParams } from 'next/navigation';
import List from '@/app/components/list';
import Sidebar from '@/app/components/sidebar';

export default function ListPage() {
    const params = useParams();
    const pageId = params.pageId as string;

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col items-center flex-1 h-screen mt-16">
                <List pageId={pageId} />
            </div>
        </div>
    );
}