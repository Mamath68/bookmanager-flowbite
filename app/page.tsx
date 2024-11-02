import React from 'react'
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: 'Home',
    };
}

function Home() {
    return (
        <>
            <h1 className="dark:text-white">Bienvenue dans Ma Bibliothèque</h1>
            <p className="dark:text-white">J&#39;en ai fait plusieurs, mais celle-ci, c&#39;est ma première personnel, fait à la main, propremement,
                et il n&#39;y auras pas de date de péremption, ni d&#39;erreur de lien non sécurisé.</p>

            <p className="dark:text-white">J&#39;ai pris longtemps, mais il est enfin finis, et pret à entrer en service. <br/>
                Juste à temps pour <span className="text-red-800">NOËL</span></p>
        </>
    );
}

export default Home
