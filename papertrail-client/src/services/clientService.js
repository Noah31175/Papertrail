const STORAGE_KEY = 'papertrail-clients'

const sampleClients = [
  {
    id: 1,
    name: 'Acme Company',
    company: 'Acme Company',
    email: 'contact@acme.com',
    phone: '(555) 123-4567',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    projects: 3,
    amountDue: 480.00,
  },
  {
    id: 2,
    name: 'Bright Ideas',
    company: 'Bright Ideas',
    email: 'hello@brightideas.com',
    phone: '(555) 234-5678',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    projects: 2,
    amountDue: 650.00,
  },
  {
    id: 3,
    name: 'Skyline Media',
    company: 'Skyline Media',
    email: 'info@skylinemedia.com',
    phone: '(555) 345-6789',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    projects: 1,
    amountDue: 0,
  },
  {
    id: 4,
    name: 'Green Valley',
    company: 'Green Valley',
    email: 'contact@greenvalley.com',
    phone: '(555) 456-7890',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    projects: 4,
    amountDue: 300.00,
  },
]

export function getClients() {
  const savedClients = localStorage.getItem(STORAGE_KEY)

  if (savedClients) {
    try {
      const clients = JSON.parse(savedClients)

      if (Array.isArray(clients)) {
        return clients
      }
    } catch (error) {
      console.error('Could not load clients:', error)
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleClients))

  return [...sampleClients]
}

export function getClientById(id) {
  const clients = getClients()

  return clients.find(client => String(client.id) === String(id))
}

export function saveClient(client) {
  const clients = getClients()

  if (client.id !== undefined && client.id !== null) {
    const index = clients.findIndex(
      existingClient => String(existingClient.id) === String(client.id)
    )

    if (index !== -1) {
      clients[index] = {
        ...clients[index],
        ...client,
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(clients))

      return clients[index]
    }
  }

  const newId = clients.length > 0
    ? Math.max(...clients.map(existingClient => Number(existingClient.id) || 0)) + 1 : 1

  const newClient = {
    ...client,
    id: newId,
    projects: 0,
    amountDue: 0,
  }

  clients.push(newClient)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients))

  return newClient
}

export function deleteClient(id) {
  const clients = getClients()

  const updatedClients = clients.filter(
    client => String(client.id) !== String(id)
  )

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedClients))
}
