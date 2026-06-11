import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import './Cadastro.css'
import type { SkinCare } from '../../types/SkinCare'
import { deleteSkinCare, enviarFotoParaAPI, getSkinCare, postSkinCare, putSkinCare } from '../../services/SkinCareServices';
import { formatoServices } from '../../services/formatosServices';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ModalCustomizado from '../../components/ModalCustomizado/ModalCustomizado';
import { NumericFormat } from 'react-number-format';

export default function Cadastro() {

    const [skinCare, setSkinCare] = useState<SkinCare[]>([]);
    const [nomeSkinCare, setNomeSkinCare] = useState<string>("");
    const [categorias, setCategorias] = useState<string>("");
    const [bgImagemInputColor, setBgImagemInputColor] = useState<string>("#E3E6EB");
    const [imagem, setImagem] = useState<File | undefined>();
    const [nomeDaImagem, setNomeDaImagem] = useState<string | undefined>();
    const [preco, setPreco] = useState<number | undefined>(undefined);
    const [descricao, setDescricao] = useState<string>("");
    const [idParaEditar, setIdParaEditar] = useState<string>("");
    const [clicouNaLixeira, setClicouNaLixeira] = useState<boolean>(false);
    const [idParaDeletar, setIdParaDeletar] = useState<string>("");
    const [aposConfirmacaoDeItemRemovido, setAposConfirmacaoDeItemRemovido] = useState<boolean>(false);
    const [propsModalDeErroOuSucesso, setPropsModalDeErroOuSucesso] = useState<{ exibir: boolean; titulo: string; corpo: string; }>({ exibir: false, titulo: "", corpo: "" });

    const topoRef = useRef<HTMLDivElement>(null);

    const focarTopo = () => {
        topoRef.current?.scrollIntoView({ behavior: "smooth" });
        topoRef.current?.focus();
    }

    const abrirModalParaConfirmarDelete = (id: string) => {
        setClicouNaLixeira(true);
        setIdParaDeletar(id)
    }

    const cancelarEdicao = () => {
        limparDados();
        setIdParaEditar("");
    }

    const editarSkinCare = (skinCare: SkinCare) => {
        focarTopo();
        setIdParaEditar(skinCare.id!);

        setNomeSkinCare(skinCare.nome);
        setDescricao(skinCare.descricao ?? "");
        setPreco(skinCare.preco);
        setCategorias(skinCare.categorias.join(", "));

        setImagem(undefined);
        setNomeDaImagem(skinCare.imagens[0]);

        setBgImagemInputColor("#ffffff");
    };

    const fecharModalConfirmacaoDelete = () => {
        setClicouNaLixeira(false);
    }

    const exibirModalDeErroOuSucesso = (titulo: string, corpo: string) => {
        setPropsModalDeErroOuSucesso({ exibir: true, titulo, corpo });
    };

    const removerItemAposConfirmacao = async (id: string) => {
        try {
            await deleteSkinCare(id);
            setAposConfirmacaoDeItemRemovido(true);
            await fetchSkinCare();
            fecharModalConfirmacaoDelete();
        } catch (error) {
            exibirModalDeErroOuSucesso("Erro", "Erro ao deletar o item");
        }
    }

    const fecharModalDeErroOuSucesso = () => {
        setPropsModalDeErroOuSucesso({ ...propsModalDeErroOuSucesso, exibir: false });
    }

    const carregarImagem = (img: ChangeEvent<HTMLInputElement>) => {
        const file = img.target.files?.[0]
        if (file?.type.includes("image")) {
            setImagem(file);
            setBgImagemInputColor("#5CB85C")
        }
        else {
            setImagem(undefined);
            setBgImagemInputColor("#FF2C2C");
        }
    }

    const limparDados = () => {
        setNomeSkinCare("");
        setCategorias("");
        setImagem(undefined);
        setNomeDaImagem(undefined);
        setPreco(undefined);
        setDescricao("");
        setBgImagemInputColor("#E3E6EB")
    }

    const handleSubmit = async (sk: React.FormEvent) => {
        sk.preventDefault();

        if (!nomeSkinCare || !categorias || !preco) {
            exibirModalDeErroOuSucesso("Campos obrigatórios", "Preencha o nome, categoria(s) e preço do produto");
            return;
        }

        let uploadedFileName = nomeDaImagem;

        if (imagem) {
            uploadedFileName = await enviarFotoParaAPI(imagem);
        }

        const novoProduto: SkinCare = {
            id: idParaEditar,
            nome: nomeSkinCare,
            descricao,
            preco,
            categorias: categorias.toLowerCase().split(",").map(c => c.trim()),
            imagens: uploadedFileName ? [uploadedFileName] : []
        };

        try {
            if (idParaEditar) {
                await putSkinCare(novoProduto);
                exibirModalDeErroOuSucesso("Sucesso", "Produto atualizado!");
            } else {
                await postSkinCare(novoProduto);
                exibirModalDeErroOuSucesso("Sucesso", "Novo produto cadastrado!");
            }

            limparDados();
            setIdParaEditar("");
            fetchSkinCare();
        } catch {
            exibirModalDeErroOuSucesso("Erro", "Erro ao salvar o produto");
        }
    };

    const fetchSkinCare = async () => {
        try {
            const dados = await getSkinCare();
            setSkinCare(dados);
        } catch (error) {
            console.error("Erro ao executar getSkinCare: ", error);
        }
    }

    useEffect(() => {
        fetchSkinCare();
    }, [])

    return (
        <>
            <Header />
            <main>
                <h1 className="acessivel">tela de cadastro e listagem de produtos</h1>
                <iframe title="GraficoLumea" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiMjc1OWMzMDAtNmIxMi00ZWZmLTkzZTctNTIxNDgwOWEyZTk1IiwidCI6ImIxMDUxYzRiLTNiOTQtNDFhYi05NDQxLWU3M2E3MjM0MmZkZCJ9"></iframe>

                <form onSubmit={handleSubmit} className="container_cadastro">
                    {idParaEditar ? <h2>Editando item</h2> : <h2>Cadastro</h2>}
                    <hr />

                    <div ref={topoRef} tabIndex={-1} className="box_cadastro">
                        <div className="cadastro_coluna1">
                            <div className="Produtos">
                                <label htmlFor="Produtos">Produtos</label>
                                <input
                                    className="input_produtos"
                                    type="text"
                                    id="produtos"
                                    placeholder='Insira o nome do produto'
                                    value={nomeSkinCare}
                                    onChange={sk => setNomeSkinCare(sk.target.value)}
                                />
                            </div>

                            <div className="categoria_img">
                                <div className="categoria">
                                    <label htmlFor="cat">Categoria</label>
                                    <input
                                        className="input_categoria"
                                        type="text"
                                        id="cat"
                                        placeholder="Rosto, Corpo, Mãos..."
                                        value={categorias}
                                        onChange={c => setCategorias(c.target.value)}
                                    />
                                </div>
                                <div className="img">
                                    <label htmlFor="img">
                                        <span>Imagem</span>
                                        <div style={{ backgroundColor: bgImagemInputColor }}>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512">
                                                <path fill="currentColor"
                                                    d="M232 344l0-316.7 106.3 106.3c3.1 3.1 8.2 3.1 11.3 0s3.1-8.2 0-11.3l-120-120c-3.1-3.1-8.2-3.1-11.3 0l-120 120c-3.1 3.1-3.1 8.2 0 11.3s8.2 3.1 11.3 0L216 27.3 216 344c0 4.4 3.6 8 8 8s8-3.6 8-8zm48-24l104 0c26.5 0 48 21.5 48 48l0 48c0 26.5-21.5 48-48 48L64 464c-26.5 0-48-21.5-48-48l0-48c0-26.5 21.5-48 48-48l104 0 0-16-104 0c-35.3 0-64 28.7-64 64l0 48c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-48c0-35.3-28.7-64-64-64l-104 0 0 16zm88 72a16 16 0 1 1 -32 0 16 16 0 1 1 32 0zm-16-32a32 32 0 1 0 0 64 32 32 0 1 0 0-64z" />
                                            </svg>
                                        </div>
                                    </label>
                                    <input
                                        type="file"
                                        id="img"
                                        alt='Imagem_do_Produto'
                                        accept='image/*'
                                        onChange={carregarImagem}
                                    />
                                </div>

                            </div>
                            <div className='valor'>
                                <label htmlFor="val">Valor</label>
                                <NumericFormat
                                    id='valor'
                                    placeholder="Insira o preço (R$)"
                                    value={preco ?? ""}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="R$ "
                                    decimalScale={2}
                                    fixedDecimalScale
                                    allowNegative={false}
                                    onValueChange={(values) => { setPreco(values.floatValue ?? undefined); }}
                                    inputMode='decimal'
                                />
                            </div>

                        </div>

                        <div className="cadastro_coluna2">
                            <label htmlFor="desc">Descrição</label>
                            <textarea
                                id="desc"
                                maxLength={200}
                                placeholder="Escreva detalhes sobre o produto"
                                value={descricao}
                                onChange={d => setDescricao(d.target.value)}
                            />
                        </div>
                    </div>
                    <button className='botaoSubmit' type='submit'>
                        {idParaEditar ? "Atualizar dados" : "Cadastrar"}
                    </button>
                    {idParaEditar && <button onClick={cancelarEdicao} className='botaoSubmit'>Cancelar edição</button>}
                </form>

                <section className="container_lista">
                    <h2>Lista</h2>
                    <hr />

                    <table>
                        <thead>
                            <tr>
                                <th>Produtos</th>
                                <th>Categoria</th>
                                <th className="secao_descricao">Descrição</th>
                                <th>Preço</th>
                                <th>Editar</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                skinCare.map((sk: SkinCare) => (
                                    <tr key={sk.id}>
                                        <td data-cell="Produtos: ">{sk.nome}
                                            {/* <p className="secao_produtos">Tônico Facial</p> */}
                                        </td>
                                        <td data-cell="Categoria: ">{sk.categorias.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(", ")}</td>
                                        <td className="secao_descricao texto_descricao" data-cell="Descrição: ">{sk.descricao || "Não informada"}</td>
                                        <td data-cell="Valor: ">{formatoServices.PrecoBR(sk.preco)}</td>
                                        <td>
                                            <svg onClick={() => editarSkinCare(sk)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M460.3 39.6l12.1 12.1c15.6 15.6 15.6 40.9 0 56.6L440 140.7 371.3 72 403.7 39.6c15.6-15.6 40.9-15.6 56.6 0zM175.4 267.9L360 83.3 428.7 152 244.1 336.6c-5.3 5.3-12 9-19.3 10.7l-78.1 18 18-78.1c1.7-7.3 5.4-14 10.7-19.3zm217-239.6L164.1 256.6c-7.4 7.4-12.6 16.8-15 27l-20.9 90.6c-.6 2.7 .2 5.5 2.1 7.5s4.8 2.8 7.5 2.1l90.6-20.9c10.2-2.4 19.6-7.5 27-15L483.7 119.6c21.9-21.9 21.9-57.3 0-79.2L471.6 28.3c-21.9-21.9-57.3-21.9-79.2 0zM72 64C32.2 64 0 96.2 0 136L0 440c0 39.8 32.2 72 72 72l304 0c39.8 0 72-32.2 72-72l0-144c0-4.4-3.6-8-8-8s-8 3.6-8 8l0 144c0 30.9-25.1 56-56 56L72 496c-30.9 0-56-25.1-56-56l0-304c0-30.9 25.1-56 56-56l144 0c4.4 0 8-3.6 8-8s-3.6-8-8-8L72 64z" /></svg>
                                        </td>
                                        <td>
                                            <svg onClick={() => abrirModalParaConfirmarDelete(sk.id!)} xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 640 640">
                                                <path fill="currentColor"
                                                    d="M247.4 79.1C251 70 259.9 64 269.7 64L370.3 64C380.1 64 388.9 70 392.6 79.1L412.2 128L227.8 128L247.4 79.1zM210.6 128L104 128C99.6 128 96 131.6 96 136C96 140.4 99.6 144 104 144L536 144C540.4 144 544 140.4 544 136C544 131.6 540.4 128 536 128L429.4 128L407.5 73.1C401.4 58 386.7 48 370.3 48L269.7 48C253.3 48 238.6 58 232.6 73.1L210.6 128zM128 192L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 192L496 192L496 512C496 538.5 474.5 560 448 560L192 560C165.5 560 144 538.5 144 512L144 192L128 192zM224 264C224 259.6 220.4 256 216 256C211.6 256 208 259.6 208 264L208 472C208 476.4 211.6 480 216 480C220.4 480 224 476.4 224 472L224 264zM328 264C328 259.6 324.4 256 320 256C315.6 256 312 259.6 312 264L312 472C312 476.4 315.6 480 320 480C324.4 480 328 476.4 328 472L328 264zM432 264C432 259.6 428.4 256 424 256C419.6 256 416 259.6 416 264L416 472C416 476.4 419.6 480 424 480C428.4 480 432 476.4 432 472L432 264z" />
                                            </svg>
                                        </td>
                                    </tr>
                                ))

                            }

                        </tbody>
                    </table>
                </section>
            </main>
            <Footer />

            <ModalCustomizado
                mostrarModalQuando={clicouNaLixeira}
                aoCancelar={fecharModalConfirmacaoDelete}
                titulo='Confirmar exclusão'
                corpo="Tem certeza que deseja excluir esse item?"
                customizarBotoes={true}
                textoBotaoConfimacao='Excluir'
                textoBotaoCancelamento='Cancelar'
                aoConfirmar={() => removerItemAposConfirmacao(idParaDeletar)}
                exibirConteudoCentralizado={true}
            />

            <ModalCustomizado
                mostrarModalQuando={aposConfirmacaoDeItemRemovido}
                aoCancelar={() => setAposConfirmacaoDeItemRemovido(false)}
                titulo="Remoção Concluída!"
                corpo="Item Removido!"
            />

            <ModalCustomizado
                mostrarModalQuando={propsModalDeErroOuSucesso.exibir}
                aoCancelar={fecharModalDeErroOuSucesso}
                titulo={propsModalDeErroOuSucesso.titulo}
                corpo={propsModalDeErroOuSucesso.corpo}
                exibirConteudoCentralizado={true}
            />
        </>
    )
}
