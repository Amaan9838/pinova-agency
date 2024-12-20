'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import styled from '@emotion/styled'

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  padding: 4rem;
`

const ProjectCard = styled(motion.div)`
  position: relative;
  height: 70vh;
  overflow: hidden;
`

const projects = [
  {
    title: 'Project One',
    category: 'Digital Design',
    image: '/project1.jpg'
  },
  // Add more projects
]

export default function Projects() {
  return (
    <ProjectsGrid>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          whileHover={{ scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <p className="opacity-80">{project.category}</p>
          </div>
        </ProjectCard>
      ))}
    </ProjectsGrid>
  )
}
