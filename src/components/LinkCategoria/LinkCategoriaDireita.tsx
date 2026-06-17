import { Link } from "react-router-dom";

interface LinkCategoriaDireitaProps {
    rota: string;
    titulo: string;
}

export default function LinkCategoria({ rota, titulo }: LinkCategoriaDireitaProps) {
    return (
        <Link to={rota}>
            {titulo}
        </Link>
    )
}