import fs from 'fs';
import path from 'path';
import Link from 'next/link';


type Book = {
    id: string;
    title: string;
    type: string;
    img: string;
};

async function getBooks() {
    const filePath = path.join(process.cwd(), 'public', 'books.json');
    const jsonData = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(jsonData) as Book[];
}

export default async function BooksPage() {
    const books = await getBooks();

    return (
        <>
            <h1 className="dark:text-white">Ma Collection de Livres</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {books.map((book) => (
                    <div key={book.id} className="p-4 bg-white rounded shadow text-center">
                        <Link href={`/books/${book.id}`}>
                            <h2 className="mt-2">
                                {book.title}
                            </h2>
                        </Link>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={book.img} alt={book.title} title={book.title} className="object-cover w-full h-auto" />
                    </div>
                ))}
            </div>
        </>
    );
}