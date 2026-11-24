<script setup>
  import { ref, computed } from 'vue'

  import AppSidebar from '../components/AppSidebar.vue'
  import AppHeader from '../components/AppHeader.vue'

  import { getClients, deleteClient } from '../services/clientService'

  const clients = ref(getClients())

  const searchQuery = ref('')

  const filteredClients = computed(() => {
      const query = searchQuery.value.toLowerCase().trim()

      if (!query) {
        return clients.value
      }

      return clients.value.filter((client) => {
        return (
          client.name.toLowerCase().includes(query) ||
          client.email.toLowerCase().includes(query) ||
          client.phone.toLowerCase().includes(query)
        )
      })
  })

function handleDeleteClient(client) {
  const confirmed = window.confirm(
    `Are you sure you want to delete ${client.name}?`
  )

  if (!confirmed) return

  deleteClient(client.id)

  clients.value = getClients()
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
            <h1>Clients</h1>
            <p>Manage your clients and their information.</p>
          </div>
          <RouterLink to="/clients/new" class="add-client-button">
            + Add Client
          </RouterLink>
        </div>
        <div class="client-summary">
          <div>
            <h2>{{ clients.length }}</h2>
            <p>Total Clients</p>
          </div>
          <div>
            <h2>
              {{ clients.filter(client => client.amountDue > 0).length }}
            </h2>
            <p>Clients With Outstanding Balances</p>
          </div>
        </div>
        <div class="content-card client-card">
          <div class="client-toolbar">
            <div>
              <h2>All Clients</h2>
              <p>View and manage your client information.</p>
            </div>
            <input v-model="searchQuery"
                   class="client-search"
                   type="text"
                   placeholder="Search clients..." />
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Projects</th>
                  <th>Amount Due</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="client in filteredClients" :key="client.id">
                  <td class="client-name">{{ client.name }}</td>
                  <td>{{ client.email }}</td>
                  <td>{{ client.phone }}</td>
                  <td>{{ client.projects }}</td>
                  <td class="amount">
                    ${{ Number(client.amountDue || 0).toFixed(2) }}
                  </td>
                  <td>
                    <div class="client-actions">
                      <RouterLink :to="`/clients/${client.id}/edit`"
                                  class="edit-client-link">
                        Edit
                      </RouterLink>

                      <button class="delete-client-button"
                              @click="handleDeleteClient(client)">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredClients.length === 0">
                  <td colspan="6" class="no-clients">
                    No clients found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
