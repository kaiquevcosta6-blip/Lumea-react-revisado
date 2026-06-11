import './CardProduto.css';
import maquiagem_default from '../../../api/assets/maquiagem_default.png';
import type { CardProdutosProps } from '../../types/CardProdutosProps';
import { formatoServices } from '../../services/formatosServices';

export default function CardProduto({ nome, descricao, preco, imagem, id }: CardProdutosProps) {

    return (
        <div key={id} className="card_produto">
            <img src={(imagem.length > 0) ? `http://localhost:3000/static/${imagem}` : maquiagem_default} alt={"Imagem do produto: " + descricao} />
            <h2>{nome}</h2>
            <p>{(descricao.length > 0) ? descricao : "Descrição não informada"}</p>
            <div>
                <span>{formatoServices.PrecoBR(preco)} / </span>
            </div>
        </div>
    )
}
