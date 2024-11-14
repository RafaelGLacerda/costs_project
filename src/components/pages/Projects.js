import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Projects.module.css'
import Message from '../layout/Message'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import Loading from '../layout/Loading'

function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''

    if (location.state) {
        message = location.state.message
    }


    useEffect(() => {
        setTimeout(
        () => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(resp => resp.json())
                .then((data) => {
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))    
        }, 1500)
    }, [])


    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
    }).then(resp => resp.json())
      .then(data =>{
        setProjects(projects.filter((projects) => projects.id !== id))
        setProjectMessage(`O Projeto REMOVIDO com sucesso!`)
      })
      .catch((err) => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="sucess" msg={message} />}
            {projectMessage && <Message type="sucess" msg={projectMessage} />}
            <Container customClass="start">
                {projects.map((project) => (
                    <ProjectCard
                        id={project.id}
                        name={project.name || "Nome indisponível"}
                        budget={project.budget || 0}
                        category={project.category ? project.category.name : "Categoria não especificada"}
                        key={project.id}
                        handleRemove={removeProject}
                    />
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}

export default Projects