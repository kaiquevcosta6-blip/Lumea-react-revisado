import './ModalCustomizado.css'
import type { ModalCustomizadoProps } from '../../types/ModalCustomizadoProps'
import { Modal } from 'react-bootstrap'

export default function ModalCustomizado({ mostrarModalQuando, aoCancelar, exibirConteudoCentralizado, titulo, corpo, customizarBotoes, textoBotaoCancelamento, textoBotaoConfimacao, aoConfirmar }: ModalCustomizadoProps) {
    return (
        <Modal
            style={{ fontFamily: "Darker Grotesque, sans-serif" }}
            show={mostrarModalQuando}
            onHide={aoCancelar}
            centered={exibirConteudoCentralizado}
        >
            <Modal.Header>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{corpo}</Modal.Body>
            <Modal.Footer>
                {
                    customizarBotoes && (
                        <button onClick={aoCancelar} className='botaoModalCancelar'>
                            {textoBotaoCancelamento}
                        </button>
                    )
                }
                <button onClick={customizarBotoes ? aoConfirmar : aoCancelar} className='botaoSubmitModal'>
                    {customizarBotoes ? textoBotaoConfimacao : "OK"}
                </button>
            </Modal.Footer>
        </Modal>
    )
}
