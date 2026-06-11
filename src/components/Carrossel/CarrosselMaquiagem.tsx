import banner_1 from "../../assets/img/banner1_maquiagem.webp";
import banner_2 from "../../assets/img/banner2_maquiagem.webp";
import banner_3 from "../../assets/img/banner3_maquiagem.jpeg";

export default function Carrossel() {
    return (
        <div id="carouselExampleAutoplaying" className="carousel slide carousel_personalizado" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={banner_1} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={banner_2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={banner_3} className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>

    )
}
