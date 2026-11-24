<script setup>
  import { ref, computed } from 'vue'
  import AppSidebar from '../components/AppSidebar.vue'
  import AppHeader from '../components/AppHeader.vue'


  const clients = ref([
    {
      id: 1,
      name: 'Acme Company',
      email: 'contact@acme.com',
      phone: '(555) 123-4567',
      projects: 3,
      amountDue: 480.00,
    },
    {
      id: 2,
      name: 'Bright Ideas',
      email: 'hello@brightideas.com',
      phone: '(555) 234-5678',
      projects: 2,
      amountDue: 650.00,
    },
    {
      id: 3,
      name: 'Skyline Media',
      email: 'info@skylinemedia.com',
      phone: '(555) 345-6789',
      projects: 1,
      amountDue: 0,
    },
    {
      id: 4,
      name: 'Green Valley',
      email: 'contact@greenvalley.com',
      phone: '(555) 456-7890',
      projects: 4,
      amountDue: 300.00,
    },
  ])

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
        client.phone.includes(query)
      )
    })
  })
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
          <button class="add-client-button" type="button" disabled>+ Add Client</button>
        </div>
        <div class="client-summary">
          <div>
            <h2>{{ clients.length }}</h2>
            <p>Total Clients</p>
          </div>
          <div>
            <h2>{{ clients.filter(client => client.amountDue > 0).length }}</h2>
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
                </tr>
              </thead>
              <tbody>
                <tr v-for="client in filteredClients" :key="client.id">
                  <td class="client-name">{{ client.name }}</td>
                  <td>{{ client.email }}</td>
                  <td>{{ client.phone }}</td>
                  <td>{{ client.projects }}</td>
                  <td class="amount">${{ client.amountDue.toFixed(2) }}</td>
                </tr>
                <tr v-if="filteredClients.length === 0">
                  <td colspan="5" class="no-clients">No clients found.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
