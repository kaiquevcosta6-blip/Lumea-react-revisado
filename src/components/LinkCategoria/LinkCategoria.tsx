import { Link } from "react-router-dom";

interface LinkCategoriaProps {
    rota: string;
    titulo: string;
}

export default function LinkCategoria({ rota, titulo }: LinkCategoriaProps) {
    return (
        <Link to={rota}>
            {titulo}
        </Link>
    )
}