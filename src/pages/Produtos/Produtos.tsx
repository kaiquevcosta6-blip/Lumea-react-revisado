import './Produtos.css'
import { useEffect, useState } from 'react'
import { getSkinCare } from '../../services/SkinCareServices'
import type { SkinCare } from '../../types/SkinCare'
import CardProduto from '../../components/CardProduto/CardProduto'
import Carrossel from '../../components/Carrossel/Carrossel'
import Header from '../../components/Header/Header'
import { useLocation, useParams } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import { removeAccents, normalizeCategory } from '../../utils/normalize'

export default function Produtos() {
    const [skinCare, setSkinCare] = useState<SkinCare[]>([]);
    const location = useLocation();
    const { categoria } = useParams<{ categoria: string }>();


    const parametrosPesquisados = new URLSearchParams(location.search);
    const termo_pesquisado = parametrosPesquisados.get('query');

    const fetchSkincare = async () => {
        try {
            const dados = await getSkinCare();
            // console.log("Lista de Produtos vinda da API: ", dados);
            if (categoria && categoria.toLowerCase() !== 'pesquisa') {
                const categoriaNormalizada = normalizeCategory(categoria);
                const dados_filtrados = dados.filter(sk => 
                    sk.categorias.some(cat => normalizeCategory(cat) === categoriaNormalizada)
                );
                console.log("Dados filtrados por categoria: ", dados_filtrados);
                setSkinCare(dados_filtrados);
            }
            else if (termo_pesquisado) {
                const queryNormalizada = removeAccents(termo_pesquisado);
                const dados_filtrados = dados.filter(sk =>
                    removeAccents(sk.nome).includes(queryNormalizada) ||
                    removeAccents(sk.descricao).includes(queryNormalizada) ||
                    sk.categorias.some(cat => removeAccents(cat).includes(queryNormalizada))
                );
                console.log("Dados filtrados por busca: ", dados_filtrados);
                setSkinCare(dados_filtrados);
            } else {
                // Filtra para exibir apenas produtos da categoria Skin Care como padrão
                const dadosSkinCare = dados.filter(sk =>
                    sk.categorias.some(cat => normalizeCategory(cat) === 'skincare')
                );
                setSkinCare(dadosSkinCare);
            }
        } catch (error) {
            console.error("Erro ao executar getSkinCare: ", error);
        }
    }

    useEffect(() => {
        fetchSkincare();
        console.log("Termo pesquisado: ", termo_pesquisado);
        console.log("Categoria: ", categoria);
    }, [termo_pesquisado, categoria])

    return (
        <>
            <Header />
            <main>
                <Carrossel />
                <h1 className="acessivel">produtos de skin care</h1>
                <div className="titulo">

                    <span>
                        {
                            categoria && categoria.toLowerCase() !== 'pesquisa'
                            ? (
                                categoria.toLowerCase() === 'corpo&banho'
                                ? 'Corpo & Banho'
                                : categoria.toLowerCase() === 'frangacias' || categoria.toLowerCase() === 'fragrancias'
                                ? 'Fragâncias'
                                : categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase()
                              )
                            : termo_pesquisado
                            ? `Resultados para: "${termo_pesquisado}"`
                            : "Skin Care"
                        }
                    </span>
                    < hr />
                </div>

                <section className="cards">
                    {
                        skinCare.map((sk: SkinCare) => (
                            <CardProduto
                                key={sk.id}
                                nome={sk.nome}
                                descricao={sk.descricao}
                                preco={sk.preco}
                                imagem={sk.imagens[0] ?? ""}
                            />
                        ))
                    }
                    {
                        skinCare.length == 0 &&
                        <div className='Error404'><h3>O termo pesquisado não foi encontrado</h3>
                        </div>
                    }
                </section>

            </main>
            <Footer />
        </>
    )
}