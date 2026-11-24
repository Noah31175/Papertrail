<script setup>
  import AppSidebar from '../components/AppSidebar.vue'
  import AppHeader from '../components/AppHeader.vue'

  const invoices = [
    {
      number: 'INV-1001',
      name: 'Website Redesign',
      client: 'Acme Company',
      total: '$480.00',
      deadline: 'Nov 28, 2026',
      status: 'In Progress',
    },
    {
      number: 'INV-1002',
      name: 'Logo Design',
      client: 'Bright Ideas',
      total: '$650.00',
      deadline: 'Dec 02, 2026',
      status: 'Complete',
    },
    {
      number: 'INV-1003',
      name: 'Monthly Maintenance',
      client: 'Skyline Media',
      total: '$300.00',
      deadline: 'Dec 05, 2026',
      status: 'Pending',
    }
  ]

  const earnings = [35, 55, 42, 70, 58, 85, 65, 95]
</script>

<template>
  <div class="app-layout">
    <AppSidebar />
    <main class="main-content">
      <AppHeader />
      <section class="dashboard">
        <div class="page-heading">
          <div>
            <h1>Dashboard</h1>
            <p>Here's an overview of your business.</p>
          </div>
          <span class="today-label">Papertrail Overview</span>
        </div>
        <div class="summary-grid">
          <div class="summary-card">
            <div class="card-top">
              <span>Total Earnings</span>
              <div class="card-icon teal">＄</div>
            </div>
            <h2>$12,234</h2>
            <p class="card-subtitle">Your total earnings</p>
          </div>
          <div class="summary-card">
            <div class="card-top">
              <span>Current Projects</span>
              <div class="card-icon blue">▤</div>
            </div>
            <h2>14</h2>
            <p class="card-subtitle">Projects being worked on</p>
          </div>
          <div class="summary-card">
            <div class="card-top">
              <span>Pending Projects</span>
              <div class="card-icon purple">◷</div>
            </div>
            <h2>4</h2>
            <p class="card-subtitle">Waiting to be completed</p>
          </div>
          <div class="summary-card">
            <div class="card-top">
              <span>Completed Tasks</span>
              <div class="card-icon green">✓</div>
            </div>
            <h2>27</h2>
            <p class="card-subtitle">Successfully completed</p>
          </div>
        </div>
        <div class="middle-grid">
          <div class="content-card earnings-card">
            <div class="section-heading">
              <div>
                <h2>Earnings Overview</h2>
                <p>Your earnings over the past few months</p>
              </div>
              <select aria-label="Earnings period">
                <option>Last 8 months</option>
                <option>Last 30 days</option>
              </select>
            </div>
            <div class="chart">
              <div class="chart-labels">
                <span>$3,000</span>
                <span>$2,000</span>
                <span>$1,000</span>
                <span>$0</span>
              </div>
              <div class="chart-area">
                <div class="grid-line line-one"></div>
                <div class="grid-line line-two"></div>
                <div class="grid-line line-three"></div>
                <div class="grid-line line-four"></div>
                <div class="chart-bars">
                  <div v-for="(value, index) in earnings"
                       :key="index"
                       class="bar-column">
                    <div class="bar" :style="{ height: value + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="chart-months">
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
            </div>
          </div>
          <div class="content-card quick-actions">
            <h2>Quick Actions</h2>
            <p>Get things done quickly.</p>
            <a href="#" class="primary-button">＋ Add Invoice</a>
            <a href="#" class="secondary-button">＋ Add Client</a>
          </div>
        </div>
        <div class="content-card invoice-card">
          <div class="section-heading">
            <div>
              <h2>Recent Invoices</h2>
              <p>Keep track of your latest work.</p>
            </div>
            <a href="#" class="view-all">View All →</a>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Project</th>
                  <th>Client</th>
                  <th>Total</th>
                  <th>Deadline</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="invoice in invoices" :key="invoice.number">
                  <td>{{ invoice.number }}</td>
                  <td>{{ invoice.name }}</td>
                  <td>{{ invoice.client }}</td>
                  <td class="amount">{{ invoice.total }}</td>
                  <td>{{ invoice.deadline }}</td>
                  <td>
                    <span class="status"
                          :class="invoice.status.toLowerCase().replace(' ', '-')">
                      {{ invoice.status }}
                    </span>
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
