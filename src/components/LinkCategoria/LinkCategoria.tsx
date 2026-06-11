import { Link } from "react-router-dom";
import type { LinkCategoriaProps } from "../../types/LinkCategoriaProps";

export default function LinkCategoria({ rota, titulo }: LinkCategoriaProps) {
    return (

        <Link to={rota}>
            <a href="">{titulo}</a>
        </Link>

    )
}