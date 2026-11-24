<script setup>
  import { ref, computed, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import AppSidebar from '../components/AppSidebar.vue'
  import AppHeader from '../components/AppHeader.vue'

  import { getProjectById, saveProject, } from '../services/projectService'
  import { getClients } from '../services/clientService'

  const route = useRoute()
  const router = useRouter()

  const clients = getClients()


  const emptyForm = () => ({
    name: '',
    clientId: '',
    description: '',
    startDate: '',
    dueDate: '',
    status: 'Pending',
  })

  const form = ref(emptyForm())
  const projectNotFound = ref(false)

  const isEditing = computed(() => Boolean(route.params.id))

  const pageTitle = computed(() =>
    isEditing.value ? 'Edit Project' : 'Add New Project'
  )

  watch(() => route.params.id, (id) => {
      projectNotFound.value = false

      if (id) {
        const project = getProjectById(id)

        if (!project) {
          projectNotFound.value = true
          form.value = emptyForm()
          return
        }

        form.value = {
          ...emptyForm(),
          ...project,
          clientId: String(project.clientId),
        }
      } else {
        form.value = emptyForm()
      }
    },
    { immediate: true }
  )

  function handleSubmit() {
    if (projectNotFound.value || clients.length === 0) return

    const projectToSave = {
      ...form.value,
      clientId: Number(form.value.clientId),
      ...(isEditing.value ? { id: Number(route.params.id) } : {}),
    }

    saveProject(projectToSave)

    router.push('/projects')
  }

  function cancelForm() {
    router.push('/projects')
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
            <h1>{{ pageTitle }}</h1>
            <p>Create and manage your client projects.</p>
          </div>
        </div>
        <div v-if="projectNotFound" class="content-card">
          <h2>Project not found</h2>
          <p>This project could not be found.</p>
          <button class="form-secondary-button" @click="cancelForm">
            Back to Projects
          </button>
        </div>
        <div v-else-if="clients.length === 0" class="content-card">
          <h2>No clients available</h2>
          <p>You need to add a client before creating a project.</p>
          <RouterLink to="/clients/new" class="add-client-button">
            + Add Client
          </RouterLink>
        </div>
        <div v-else class="content-card client-form-card">
          <form @submit.prevent="handleSubmit">
            <h2>Project Information</h2>
            <p class="form-description">
              Enter the project details below. Fields marked with * are required.
            </p>
            <div class="client-form-grid">
              <div class="form-field full-width">
                <label for="name">Project Name *</label>
                <input id="name"
                       v-model.trim="form.name"
                       type="text"
                       placeholder="Enter project name"
                       required />
              </div>
              <div class="form-field full-width">
                <label for="clientId">Client *</label>
                <select id="clientId"
                        v-model="form.clientId"
                        required>
                  <option value="" disabled>Select a client</option>
                  <option v-for="client in clients"
                          :key="client.id"
                          :value="String(client.id)">
                    {{ client.name }}
                  </option>
                </select>
              </div>
              <div class="form-field full-width">
                <label for="description">Project Description</label>
                <textarea id="description"
                          v-model.trim="form.description"
                          placeholder="Describe the project..."
                          rows="4"></textarea>
              </div>
              <div class="form-field">
                <label for="startDate">Start Date *</label>
                <input id="startDate"
                       v-model="form.startDate"
                       type="date"
                       required />
              </div>
              <div class="form-field">
                <label for="dueDate">Due Date *</label>
                <input id="dueDate"
                       v-model="form.dueDate"
                       type="date"
                       :min="form.startDate"
                       required />
              </div>
              <div class="form-field full-width">
                <label for="status">Project Status *</label>
                <select id="status"
                        v-model="form.status"
                        required>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div class="form-actions">
              <button type="button"
                      class="form-secondary-button"
                      @click="cancelForm">Cancel
              </button>
              <button type="submit" class="form-primary-button">
                {{ isEditing ? 'Save Changes' : 'Add Project' }}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>
