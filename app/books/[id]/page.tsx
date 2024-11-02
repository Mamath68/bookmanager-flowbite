import fs from 'fs';
import path from 'path';
import { Metadata } from "next";

type Book = {
    id: string;
    title: string;
    author: string;
    original_author: string;
    illustrator: string;
    img: string;
    type: string;
    genre: string;
    published_vf: number;
    published_vo: number;
    end_publication_vf: number;
    end_publication_vo: number;
    quantite_possede: number;
    volumes_possede: string;
    volumes_total_vo: number;
    volumes_total_vf: number;
    status_vo: string;
    status_vf: string;
    commentaire: string;
};

async function getBooks() {
    const filePath = path.join(process.cwd(), 'public', 'books.json');
    const jsonData = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(jsonData) as Book[];
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = await params;
    const books = await getBooks();
    const book = books.find((book) => book.id === id);

    return {
        title: book ? book.title : 'Livre non trouvé',
    };
}

export default async function BookDetailPage({ params }: { params: { id: string } }) {
    // Attendre la résolution de params
    const { id } = await params; // Attendre la résolution de params.id
    const books = await getBooks();
    const book = books.find((book) => book.id === id);

    if (!book) {
        return <div>Book not found</div>;
    }

    return (
        <>
            <div className="flex flex-col md:flex-row mt-8 mb-3 min-h-[480px]">
                <div className="flex-grow w-full md:w-3/10 p-12">
                    <div className="text-center md:text-start">
                        <figure>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={book.img}
                                alt={book.title}
                                title={book.title}
                                className="max-w-md w-full rounded-2xl min-h-[456.48px] min-w-80 h-full"
                            />
                        </figure>
                    </div>
                </div>
                <div className="w-full flex-grow md:w-7/10 p-3 mt-[4%]">
                    <div className="mb-4">
                        <h1 className="text-center underline dark:text-white">
                            {book.title}
                        </h1>
                    </div>
                    <ul className="grid grid-cols-2 md:grid-cols-3 pl-0 max-w-[950px] gap-3">
                        <li className="list-none min-w-40 text-left p-1.5 block rounded-md text-white bg-[#7d3e12]">
                            <span className="text-cyan-500 font-bold underline text-sm">
                                Auteur
                            </span>
                            <span className="flex items-center ml-0">
                                <a href="#" target="_blank" className="text-inherit no-underline m-1 hover:underline">
                                    {book.author}
                                </a>
                            </span>
                        </li>
                        {book.original_author &&
                            <li className="list-none min-w-40 text-left p-1.5 block rounded-md text-white bg-[#7d3e12]">
                                <span className="text-cyan-500 font-bold underline text-sm">
                                    Histoire Original
                                </span>
                                <span className="flex items-center ml-0">
                                    <a href="#" target="_blank" className="text-inherit no-underline m-1 hover:underline">
                                        {book.original_author}
                                    </a>
                                </span>
                            </li>
                        }
                        {book.illustrator &&
                            <li className="list-none min-w-40 text-left p-1.5 block rounded-md text-white bg-[#7d3e12]">
                                <span className="text-cyan-500 font-bold underline text-sm">
                                    Illustrateur
                                </span>
                                <span className="flex items-center ml-0">
                                    <a href="#" target="_blank" className="text-inherit no-underline m-1 hover:underline">
                                        {book.illustrator}
                                    </a>
                                </span>
                            </li>
                        }
                        <li className="list-none min-w-40 text-left p-1.5 block rounded-md text-white bg-[#7d3e12]">
                            <span className="text-cyan-500 font-bold underline text-sm">
                                Type de Livre
                            </span>
                            <span className="flex items-center ml-0">
                                <a href="#" target="_blank" className="text-inherit no-underline m-1 hover:underline">
                                    {book.type}
                                </a>
                            </span>
                        </li>
                        <li className="list-none min-w-40 text-left p-1.5 block rounded-md text-white bg-[#7d3e12]">
                            <span className="text-cyan-500 font-bold underline text-sm">
                                Genre du Livre
                            </span>
                            <span className="flex items-center ml-0">
                                <a href="#" target="_blank" className="text-inherit no-underline m-1 hover:underline">
                                    {book.genre}
                                </a>
                            </span>
                        </li>
                        <li className="list-none min-w-40 text-left p-1.5 block rounded-md text-white bg-[#7d3e12]">
                            <span className="text-cyan-500 font-bold underline text-sm">
                                Publication Originel
                            </span>
                            <span className="flex items-center ml-0">
                                <a href="#" target="_blank" className="text-inherit no-underline m-1 hover:underline">
                                    {book.published_vo}
                                </a>
                            </span>
                        </li>
                        <li className="list-none min-w-40 text-left p-1.5 block rounded-md text-white bg-[#7d3e12]">
                            <span className="text-cyan-500 font-bold underline text-sm">
                                Publication Française
                            </span>
                            <span className="flex items-center ml-0">
                                <a href="#" target="_blank" className="text-inherit no-underline m-1 hover:underline">
                                    {book.published_vf}
                                </a>
                            </span>
                        </li>
                        <li className="list-none min-w-40 text-left p-1.5 block rounded-md text-white bg-[#7d3e12]">
                            <span className="text-cyan-500 font-bold underline text-sm">
                                Dernière sortie Originel
                            </span>
                            <span className="flex items-center ml-0">
                                <a href="#" target="_blank" className="text-inherit no-underline m-1 hover:underline">
                                    {book.end_publication_vo}
                                </a>
                            </span>
                        </li>
                        <li className="list-none min-w-40 text-left p-1.5 block rounded-md text-white bg-[#7d3e12]">
                            <span className="text-cyan-500 font-bold underline text-sm">
                                Dernière Publication Française
                            </span>
                            <span className="flex items-center ml-0">
                                <a href="#" target="_blank" className="text-inherit no-underline m-1 hover:underline">
                                    {book.end_publication_vf}
                                </a>
                            </span>
                        </li>
                        <li className="list-none min-w-40 text-left p-1.5 block rounded-md text-white bg-[#7d3e12]">
                            <span className="text-cyan-500 font-bold underline text-sm">
                                Quantité Possédé
                            </span>
                            <span className="flex items-center ml-0">
                                <a href="#" target="_blank" className="text-inherit no-underline m-1 hover:underline">
                                    {book.quantite_possede}
                                </a>
                            </span>
                        </li>
                        <li className="list-none min-w-40 text-left p-1.5 block rounded-md text-white bg-[#7d3e12]">
                            <span className="text-cyan-500 font-bold underline text-sm">
                                Volumes Possédé
                            </span>
                            <span className="flex items-center ml-0">
                                <a href="#" target="_blank" className="text-inherit no-underline m-1 hover:underline">
                                    {book.volumes_possede}
                                </a>
                            </span>
                        </li>
                        <li className="list-none min-w-40 text-left p-1.5 block rounded-md text-white bg-[#7d3e12]">
                            <span className="text-cyan-500 font-bold underline text-sm">
                                Volumes total sortie en VO
                            </span>
                            <span className="flex items-center ml-0">
                                <a href="#" target="_blank" className="text-inherit no-underline m-1 hover:underline">
                                    {book.volumes_total_vo}
                                </a>
                            </span>
                        </li>
                        <li className="list-none min-w-40 text-left p-1.5 block rounded-md text-white bg-[#7d3e12]">
                            <span className="text-cyan-500 font-bold underline text-sm">
                                Volumes total sortie en VF
                            </span>
                            <span className="flex items-center ml-0">
                                <a href="#" target="_blank" className="text-inherit no-underline m-1 hover:underline">
                                    {book.volumes_total_vf}
                                </a>
                            </span>
                        </li>
                        <li className="list-none min-w-40 text-left p-1.5 block rounded-md text-white bg-[#7d3e12]">
                            <span className="text-cyan-500 font-bold underline text-sm">
                                Status des publications en VO
                            </span>
                            <span className="flex items-center ml-0">
                                <a href="#" target="_blank" className="text-inherit no-underline m-1 hover:underline">
                                    {book.status_vo}
                                </a>
                            </span>
                        </li>
                        <li className="list-none min-w-40 text-left p-1.5 block rounded-md text-white bg-[#7d3e12]">
                            <span className="text-cyan-500 font-bold underline text-sm">
                                Status des publications en VF
                            </span>
                            <span className="flex items-center ml-0">
                                <a href="#" target="_blank" className="text-inherit no-underline m-1 hover:underline">
                                    {book.status_vf}
                                </a>
                            </span>
                        </li>
                    </ul>
                    {book.commentaire && (
                        <>
                            <hr className="m-4" />
                            <div>
                                <p>
                                    <strong>Monster Effect:</strong>
                                    {book.commentaire}
                                </p>
                            </div>
                            <hr className="m-4" />
                        </>
                    )}
                </div>
            </div >
        </>
    )
        ;
}
