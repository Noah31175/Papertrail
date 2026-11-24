const STORAGE_KEY = 'papertrail-projects'

const sampleProjects = [
  {
    id: 1,
    name: 'Website Redesign',
    clientId: 1,
    description: 'Redesign the company website.',
    startDate: '2026-11-02',
    dueDate: '2026-11-28',
    status: 'In Progress',
  },
  {
    id: 2,
    name: 'Logo Design',
    clientId: 2,
    description: 'Create a new company logo.',
    startDate: '2026-10-20',
    dueDate: '2026-11-15',
    status: 'Completed',
  },
  {
    id: 3,
    name: 'Mobile App Design',
    clientId: 3,
    description: 'Design the user interface for a mobile application.',
    startDate: '2026-11-20',
    dueDate: '2026-12-10',
    status: 'Pending',
  },
  {
    id: 4,
    name: 'test',
    clientId: 4,
    description: 'test.',
    startDate: '2026-11-10',
    dueDate: '2026-12-05',
    status: 'In Progress',
  },
]

export function getProjects() {
  const savedProjects = localStorage.getItem(STORAGE_KEY)

  if (savedProjects) {
    try {
      const projects = JSON.parse(savedProjects)

      if (Array.isArray(projects)) {
        return projects
      }
    } catch (error) {
      console.error('Could not load projects:', error)
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleProjects))

  return [...sampleProjects]
}

export function getProjectById(id) {
  const projects = getProjects()

  return projects.find(
    project => String(project.id) === String(id)
  )
}

export function saveProject(project) {
  const projects = getProjects()

  if (project.id !== undefined && project.id !== null) {
    const index = projects.findIndex(
      existingProject => String(existingProject.id) === String(project.id)
    )

    if (index !== -1) {
      projects[index] = {
        ...projects[index],
        ...project,
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))

      return projects[index]
    }
  }

  const newId = projects.length > 0
    ? Math.max(...projects.map(project => Number(project.id) || 0)) + 1 : 1

  const newProject = {
    ...project,
    id: newId,
  }

  projects.push(newProject)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))

  return newProject
}

export function deleteProject(id) {
  const projects = getProjects()

  const updatedProjects = projects.filter(
    project => String(project.id) !== String(id)
  )

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects))
}
