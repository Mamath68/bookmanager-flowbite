import fs from 'fs';
import path from 'path';

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

export default async function BookDetailPage({params}: { params: { id: string } }) {
    // Attendre la résolution de params
    const {id} = params;
    const books = await getBooks();
    const book = books.find((book) => book.id === id);

    if (!book) {
        return <div>Book not found</div>;
    }

    return (
        <div>
            <h1 className="dark:text-white">{book.title}</h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={book.img} alt={book.title} title={book.title}/>
            <p className="dark:text-white">Auteur : {book.author}</p>
            {book.original_author ? <>
                <p className="dark:text-white">Auteur Originel : {book.original_author}</p>
            </> : null}
            {book.illustrator ? <>
                <p className="dark:text-white">Illustrateur/Dessinateur: {book.illustrator}</p>
            </> : null}
            <p className="dark:text-white">Type de Livre : {book.type}</p>
            <p className="dark:text-white">Genre : {book.genre}</p>
            <p className="dark:text-white">Publication Originel en : {book.published_vo}</p>
            <p className="dark:text-white">Publication Française en : {book.published_vf}</p>
            <p className="dark:text-white">Dernière sortie Originel en : {book.end_publication_vo}</p>
            <p className="dark:text-white">Dernière sortie Française en : {book.end_publication_vf}</p>
            <p className="dark:text-white">Quantité possédé : {book.quantite_possede}</p>
            <p className="dark:text-white">Volumes possédé : {book.volumes_possede}</p>
            <p className="dark:text-white">Volumes total sortie en VO : {book.volumes_total_vo}</p>
            <p className="dark:text-white">Volumes total sortie en VF : {book.volumes_total_vf}</p>
            <p className="dark:text-white">Status de publication VO : {book.status_vo}</p>
            <p className="dark:text-white">Status de publication VF : {book.status_vf}</p>
            {book.commentaire ? <>
                <p className="dark:text-white">Commentaire : {book.commentaire}</p>
            </> : null}
        </div>
    );
}
