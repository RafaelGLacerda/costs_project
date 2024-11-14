import styles from './Home.module.css'
import personagem from '../../img/personagem.png'
import LinkButton from '../layout/LinkButton'

function Home(){
    return(  
        <section className={styles.home_container}>
            <h1>Bem vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar seu projeto agora mesmo!</p>
            <LinkButton  to="/newproject" text="Criar Projeto" />
            <img src={personagem} alt="Costs" />
        </section>
      )
}

export default Home