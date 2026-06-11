import { Link } from "react-router-dom";
import type { LinkCategoriaDireitaProps } from "../../types/LinkCategoriaDireitaProps";


export default function LinkCategoria({ rota, titulo }: LinkCategoriaDireitaProps) {
    return (
        <Link to={rota}>
            <a href="">{titulo}</a>
        </Link>
    )
}