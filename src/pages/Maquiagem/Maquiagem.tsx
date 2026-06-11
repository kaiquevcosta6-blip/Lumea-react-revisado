import './Maquiagem.css'
import { useEffect, useState } from "react";
import { getMaquiagem } from '../../services/MaquiagemServices';
import type { Maquiagem } from '../../types/MaquiagemProps';
import CardProduto from '../../components/CardProduto/CardProduto';
import CarrosselMaquiagem from '../../components/Carrossel/CarrosselMaquiagem';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import { removeAccents, normalizeCategory } from '../../utils/normalize';

export default function Maquiagem() {

    const [maquiagem, setMaquiagem] = useState<Maquiagem[]>([]);
    const location = useLocation();

    const parametrosPesquisados = new URLSearchParams(location.search);
    const termo_pesquisado = parametrosPesquisados.get('query');

    const fetchMaquiagem = async () => {
        try {
            const dados = await getMaquiagem();

            // Filtra para exibir apenas os produtos com categoria "maquiagem"
            const dadosMaquiagem = dados.filter(m =>
                m.categorias.some(cat => normalizeCategory(cat) === 'maquiagem')
            );

            if (termo_pesquisado) {
                const queryNormalizada = removeAccents(termo_pesquisado);
                const dados_filtrados = dadosMaquiagem.filter(m =>
                    removeAccents(m.nome).includes(queryNormalizada) ||
                    removeAccents(m.descricao).includes(queryNormalizada) ||
                    m.categorias.some(cat => removeAccents(cat).includes(queryNormalizada))
                );
                setMaquiagem(dados_filtrados);
            } else {
                setMaquiagem(dadosMaquiagem);
            }
        } catch (error) {
            console.error("Erro ao executar getMaquiagem: ", error);
        }
    }

    useEffect(() => {
        fetchMaquiagem();
        console.log("Termo pesquisado: ", termo_pesquisado);

    }, [termo_pesquisado])

    return (
        <>
            <Header />
            <main>
                <CarrosselMaquiagem />
                <section className="container" />
                <h1 className="acessivel">produtos de maquiagem</h1>
                <div className="titulo">
                    <span> {
                        termo_pesquisado ? `Resultados para ${termo_pesquisado}` : "Maquiagem"
                    } </span>
                    <hr />
                </div>

                <section className="cards">
                    {

                        maquiagem.map((m: Maquiagem) => (
                            <CardProduto
                                key={m.id}
                                nome={m.nome}
                                descricao={m.descricao}
                                preco={m.preco}
                                imagem={m.imagens[0] ?? ""}
                            />
                        ))
                    }

                </section>
            </main >
            <Footer />
        </>

    )

}