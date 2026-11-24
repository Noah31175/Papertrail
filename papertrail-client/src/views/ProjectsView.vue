<script setup>
  import { ref, computed } from 'vue'

  import AppSidebar from '../components/AppSidebar.vue'
  import AppHeader from '../components/AppHeader.vue'

  import { getProjects, deleteProject } from '../services/projectService'
  import { getClients } from '../services/clientService'

  const projects = ref(getProjects())
  const clients = getClients()

  const searchQuery = ref('')
  const selectedStatus = ref('All')

  function getClientName(clientId) {
    const client = clients.find(
      client => String(client.id) === String(clientId)
    )

    return client ? client.name : 'Unknown Client'
  }

  function formatDate(date) {
    if (!date) return 'Not set'

    const [year, month, day] = date.split('-').map(Number)

    return new Date(year, month - 1, day).toLocaleDateString()
  }

  const filteredProjects = computed(() => {
    return projects.value.filter(project => {
      const clientName = getClientName(project.clientId).toLowerCase()
      const query = searchQuery.value.toLowerCase().trim()

      const matchesSearch =
        project.name.toLowerCase().includes(query) ||
        clientName.includes(query)

      const matchesStatus =
        selectedStatus.value === 'All' ||
        project.status === selectedStatus.value

      return matchesSearch && matchesStatus
    })
  })

  const totalProjects = computed(() => projects.value.length)

  const inProgressProjects = computed(() =>
    projects.value.filter(project => project.status === 'In Progress').length
  )

  const pendingProjects = computed(() =>
    projects.value.filter(project => project.status === 'Pending').length
  )

  const completedProjects = computed(() =>
    projects.value.filter(project => project.status === 'Completed').length
  )

  function handleDeleteProject(project) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${project.name}?`
    )

    if (!confirmed) return

    deleteProject(project.id)
    projects.value = getProjects()
  }
</script>

<template>
  <div class="app-layout">
    <AppSidebar />
    <main class="main-content">
      <AppHeader />
      <section class="dashboard">
        <div class="page-heading">
          <div>
            <h1>Projects</h1>
            <p>Manage your projects and track their progress.</p>
          </div>
          <RouterLink to="/projects/new" class="add-client-button">
            + Add Project
          </RouterLink>
        </div>
        <div class="summary-grid project-summary-grid">
          <div class="summary-card">
            <div class="card-top">
              <span>Total Projects</span>
              <div class="card-icon teal">▤</div>
            </div>
            <h2>{{ totalProjects }}</h2>
            <p class="card-subtitle">All your projects</p>
          </div>
          <div class="summary-card">
            <div class="card-top">
              <span>In Progress</span>
              <div class="card-icon blue">◷</div>
            </div>
            <h2>{{ inProgressProjects }}</h2>
            <p class="card-subtitle">Currently being worked on</p>
          </div>
          <div class="summary-card">
            <div class="card-top">
              <span>Pending</span>
              <div class="card-icon purple">!</div>
            </div>
            <h2>{{ pendingProjects }}</h2>
            <p class="card-subtitle">Waiting to be started</p>
          </div>
          <div class="summary-card">
            <div class="card-top">
              <span>Completed</span>
              <div class="card-icon green">✓</div>
            </div>
            <h2>{{ completedProjects }}</h2>
            <p class="card-subtitle">Successfully finished</p>
          </div>
        </div>
        <div class="content-card project-card">
          <div class="client-toolbar">
            <div>
              <h2>All Projects</h2>
              <p>View and manage your client projects.</p>
            </div>
            <div class="project-filters">
              <input v-model="searchQuery"
                     class="client-search"
                     type="text"
                     placeholder="Search projects..." />
              <select v-model="selectedStatus" class="project-filter">
                <option>All</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Client</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="project in filteredProjects"
                    :key="project.id">
                  <td class="client-name">{{ project.name }}</td>
                  <td>{{ getClientName(project.clientId) }}</td>
                  <td>{{ formatDate(project.startDate) }}</td>
                  <td>{{ formatDate(project.dueDate) }}</td>
                  <td>
                    <span class="project-status"
                          :class="project.status.toLowerCase().replace(' ', '-')">
                      {{ project.status }}
                    </span>
                  </td>
                  <td>
                    <div class="project-actions">
                      <RouterLink :to="`/projects/${project.id}/edit`"class="edit-client-link">
                        Edit
                      </RouterLink>
                      <button class="delete-client-button"@click="handleDeleteProject(project)">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredProjects.length === 0">
                  <td colspan="6" class="no-clients">No projects found.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
