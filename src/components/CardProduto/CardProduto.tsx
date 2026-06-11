import './CardProduto.css';
import skin_default from '../../assets/img/skin_default.jpg'
import { formatoServices } from '../../services/formatosServices';
import type { CardProdutosProps } from '../../types/CardProdutosProps';

export default function CardProduto({nome, descricao, preco, imagem, id}: CardProdutosProps) {

    return (
        <div key={id} className="card_produto">
            <img src={(imagem.length > 0) ? `http://localhost:3000/static/${imagem}` : skin_default} alt="Imagem Produto" />
            <h2>{nome}</h2>
            <p>{(descricao.length > 0) ? descricao : "Descrição não cadastrada"}</p>
            <div className='info_produtos'>
                <span>{formatoServices.PrecoBR(preco)}</span> <br />
            </div>
        </div>
    )
}
