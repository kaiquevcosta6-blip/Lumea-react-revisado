import { BrowserRouter, Route, Routes } from "react-router-dom"
import Produtos from "./pages/Produtos/Produtos"
import Cadastro from "./pages/Cadastro/Cadastro"
import Maquiagem from "./pages/Maquiagem/Maquiagem"
import RotaProtegida from "./components/RotaProtegida/RotaProtegida"
import Login from "./pages/Login/Login"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/produtos/cadastro" element={
            <RotaProtegida>
              <Cadastro />
            </RotaProtegida>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Produtos />} />
          <Route path="/maquiagem" element={<Maquiagem />} />
          <Route path="/produtos/pesquisa" element={<Produtos />} />
          <Route path="/produtos/:categoria" element={<Produtos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
