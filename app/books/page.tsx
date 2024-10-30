import fs from 'fs';
import path from 'path';
import Link from 'next/link';


type Book = {
    id: string;
    title: string;
    author: string;
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
                    <div key={book.id} className="dark:bg-white rounded-lg shadow-md p-4">
                        <Link href={`/books/${book.id}`}>
                            <h2 className="font-semibold">{book.title}</h2>
                        </Link>
                        <p>Auteur : {book.author}</p>
                        <p>Type de livre : {book.type}</p>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={book.img} alt={book.title} title={book.title}/>
                    </div>
                ))}
            </div>
        </>
    );
}