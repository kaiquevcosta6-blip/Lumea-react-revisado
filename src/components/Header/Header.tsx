import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useState, useMemo } from 'react';
import Cookies from 'js-cookie';
import { Nav, Navbar, Container } from 'react-bootstrap';
import lumea_logo from '../../assets/img/lumea_logo_branca.png';

export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const isLoggedIn = useMemo(() => !!Cookies.get('auth_hash'), []);

    const handleLogout = () => {
        Cookies.remove('auth_hash');
        navigate('/');
        window.location.reload();
    };

    const handleSearch = () => {
        if (!searchTerm.trim()) return;
        navigate(`/produtos/pesquisa?query=${encodeURIComponent(searchTerm)}`);
        setSearchTerm('');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleSearch();
    };

    return (
        <header>
            <Navbar expand="md" className="container_geral container_header">
                <Container fluid className="d-flex justify-content-between align-items-center">
                    <Link to={isLoggedIn ? "/" : "/login"} className="logo_container d-md-none">
                        <img className="lumea_logo" src={lumea_logo} alt="Lumea Logo" />
                    </Link>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto align-items-center w-100">

                            {/* COLUNA 1 - desktop */}
                            <Nav.Item className="col_col1 d-none d-md-flex">
                                <nav className="nav_esquerda container_palavras">
                                    <Link to="/">Skin Care</Link>
                                    <Link to="/maquiagem">Maquiagem</Link>
                                    <Link to="/produtos/corpo&banho">Corpo & Banho</Link>
                                </nav>
                            </Nav.Item>

                            {/* COLUNA 2 - pesquisa */}
                            <Nav.Item className="col_col2 busca mx-md-3 w-100">
                                <svg className="icone_lupa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path fill="currentColor"
                                        d="M448 272C448 174.8 369.2 96 272 96C174.8 96 96 174.8 96 272C96 369.2 174.8 448 272 448C369.2 448 448 369.2 448 272zM407.3 430C371 461.2 323.7 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272C480 323.7 461.2 371 430 407.3L571.3 548.7C577.5 554.9 577.5 565.1 571.3 571.3C565.1 577.5 554.9 577.5 548.7 571.3L407.3 430z" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Pesquisar..."
                                    className="input-pesquisa"
                                />
                            </Nav.Item>

                            {/* COLUNA 3 - desktop */}
                            <Nav.Item className="col_col3 d-none d-md-flex align-items-center gap-3">

                                <nav className="nav_direita container_palavras">
                                    <Link to="/produtos/frangacias">Fragâncias</Link>
                                    <Link to="/produtos/cabelo">Cabelo</Link>
                                    <Link to="/produtos/homem">Homem</Link>
                                </nav>
                                <Link to={"/"} className="logo_container">
                                    <img className="lumea_logo" src={lumea_logo} alt="Lumea Logo" />
                                </Link>
                                {isLoggedIn ? (
                                    <div className="botoes_direita">
                                        <Link to="/produtos/cadastro" title="Cadastrar Produtos">
                                            <svg className="add" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path fill="currentColor" d="M240 48c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 192-192 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l192 0 0 192c0 8.8 7.2 16 16 16s16-7.2 16-16l0-192 192 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-192 0 0-192z" />
                                            </svg>
                                        </Link>
                                        <button onClick={handleLogout} title="Sair / Finalizar sessão">
                                            <svg className="icone_logout" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M18.3 261.7c-3.1-3.1-3.1-8.2 0-11.3l144-144c2.3-2.3 5.7-3 8.7-1.7l0 0c3 1.2 4.9 4.2 4.9 7.4l0 88c0 4.4 3.6 8 8 8l120 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32l-120 0c-4.4 0-8 3.6-8 8l0 88c0 3.2-1.9 6.2-4.9 7.4s-6.4 .6-8.7-1.7l-144-144zM151 95L7 239c-9.4 9.4-9.4 24.6 0 33.9l0 0 144 144c6.9 6.9 17.2 8.9 26.2 5.2S192 409.7 192 400l0-80 112 0c26.5 0 48-21.5 48-48l0-32c0-26.5-21.5-48-48-48l-112 0 0-80c0-9.7-5.8-18.5-14.8-22.2S157.9 88.2 151 95zM328 464c-4.4 0-8 3.6-8 8s3.6 8 8 8l88 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-88 0c-4.4 0-8 3.6-8 8s3.6 8 8 8l88 0c44.2 0 80 35.8 80 80l0 256c0 44.2-35.8 80-80 80l-88 0z" />
                                        </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="botoes_direita">
                                        <Link to="/login" title="Fazer login">

                                            <svg className="icone_user" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                                <path fill='currentColor' d="M208 192C208 130.1 258.1 80 320 80C381.9 80 432 130.1 432 192C432 253.9 381.9 304 320 304C258.1 304 208 253.9 208 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM112 544C112 455.6 183.6 384 272 384L368 384C456.4 384 528 455.6 528 544L528 568C528 572.4 531.6 576 536 576C540.4 576 544 572.4 544 568L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 568C96 572.4 99.6 576 104 576C108.4 576 112 572.4 112 568L112 544z" />
                                            </svg>
                                        </Link>
                                    </div>
                                )}
                            </Nav.Item>

                            {/* MENU MOBILE */}
                            <Nav className="d-md-none flex-column mt-2">
                                <Link to="/">Skin Care</Link>
                                <Link to="/maquiagem">Maquiagem</Link>
                                <Link to="/produtos/corpo&banho">Corpo & Banho</Link>
                                <Link to="/produtos/frangacias">Fragâncias</Link>
                                <Link to="/produtos/cabelo">Cabelo</Link>
                                <Link to="/produtos/homem">Homem</Link>
                                {!isLoggedIn ? (
                                    <Link to="/login">Login</Link>
                                ) : (
                                    <>
                                        <Link to="/produtos/cadastro">Cadastrar</Link>
                                        <button onClick={handleLogout} className="btn-logout-mobile">Sair</button>
                                    </>
                                )}
                            </Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}