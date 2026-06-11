import './Footer.css'
import whatsapp from '../../assets/whatsapp.svg'
import insta from '../../assets/insta.svg'

export default function Footer() {
    return (
        <footer>
            <section className='rodape'>
                <div>
                    <p>Lúmea: Sua essência em equilibrio, onde saúde, bem-estar e beleza se encontram para transformar vidas.</p>
                </div>

                <div className="redes_sociais">
                    <a href="https://wa.me/5511912345678" target="_blank">
                        <img className='whatsapp' src={whatsapp} alt="Fale conosco no WhatsApp" />
                    </a>

                    <a href="www.instagram.com" target="_blank">
                        <img src={insta} className='insta' alt="Visite nosso Instagram" />
                    </a>
                </div>

            </section>
        </footer>
    )
}
