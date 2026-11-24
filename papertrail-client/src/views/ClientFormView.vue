<script setup>
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import AppSidebar from '../components/AppSidebar.vue'
  import AppHeader from '../components/AppHeader.vue'

  import {
    getClientById,
    saveClient,
  } from '../services/clientService'

  const route = useRoute()
  const router = useRouter()

  const emptyForm = () => ({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
  })

  const form = ref(emptyForm())
  const clientNotFound = ref(false)

  const isEditing = computed(() => Boolean(route.params.id))

  const pageTitle = computed(() =>
    isEditing.value ? 'Edit Client' : 'Add New Client'
  )

  watch(
    () => route.params.id,
    (id) => {
      clientNotFound.value = false

      if (id) {
        const client = getClientById(id)

        if (!client) {
          clientNotFound.value = true
          form.value = emptyForm()
          return
        }

        form.value = {
          ...emptyForm(),
          ...client,
        }
      } else {
        form.value = emptyForm()
      }
    },
    { immediate: true }
  )

  function handleSubmit() {
    if (clientNotFound.value) return

    const clientToSave = {
      ...form.value,
      ...(isEditing.value ? { id: Number(route.params.id) } : {}),
    }

    saveClient(clientToSave)

    router.push('/clients')
  }

  function cancelForm() {
    router.push('/clients')
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
            <p>Enter the client's contact and business information.</p>
          </div>
        </div>
        <div v-if="clientNotFound" class="content-card">
          <h2>Client not found</h2>
          <p>This client could not be found.</p>
          <button class="form-secondary-button" @click="cancelForm">Back to Clients</button>
        </div>
        <div v-else class="content-card client-form-card">
          <form @submit.prevent="handleSubmit">
            <h2>Client Information</h2>
            <p class="form-description">Fields marked with * are required.</p>
            <div class="client-form-grid">
              <div class="form-field">
                <label for="name">Client Name *</label>
                <input id="name"
                       v-model.trim="form.name"
                       type="text"
                       placeholder="Enter client name"
                       required />
              </div>
              <div class="form-field">
                <label for="company">Company</label>
                <input id="company"
                       v-model.trim="form.company"
                       type="text"
                       placeholder="Enter company name" />
              </div>
              <div class="form-field">
                <label for="email">Email Address *</label>
                <input id="email"
                       v-model.trim="form.email"
                       type="email"
                       placeholder="example@email.com"
                       required />
              </div>
              <div class="form-field">
                <label for="phone">Phone Number</label>
                <input id="phone"
                       v-model.trim="form.phone"
                       type="tel"
                       placeholder="(555) 123-4567" />
              </div>
              <div class="form-field full-width">
                <label for="address">Street Address</label>
                <input id="address"
                       v-model.trim="form.address"
                       type="text"
                       placeholder="Enter street address" />
              </div>
              <div class="form-field">
                <label for="city">City</label>
                <input id="city"
                       v-model.trim="form.city"
                       type="text"
                       placeholder="Enter city" />
              </div>
              <div class="form-field">
                <label for="state">State</label>
                <input id="state"
                       v-model.trim="form.state"
                       type="text"
                       placeholder="Enter state" />
              </div>
              <div class="form-field">
                <label for="postalCode">Postal Code</label>
                <input id="postalCode"
                       v-model.trim="form.postalCode"
                       type="text"
                       placeholder="Enter postal code" />
              </div>
            </div>
            <div class="form-actions">
              <button type="button"
                      class="form-secondary-button"
                      @click="cancelForm">Cancel
              </button>
              <button type="submit" class="form-primary-button">
                {{ isEditing ? 'Save Changes' : 'Add Client' }}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>
