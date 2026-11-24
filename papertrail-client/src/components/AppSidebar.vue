<template>
  <aside class="sidebar">
    <div class="brand">
      <div class="brand-icon">P</div>
      <h2>Papertrail</h2>
    </div>
    <div class="nav-heading">MENU</div>
    <nav class="navigation">
      <RouterLink to="/" class="nav-link" active-class="active" exact>
        <span>▦</span>Dashboard
      </RouterLink>
      <RouterLink to="/clients" class="nav-link">
        <span>♙</span> Clients
      </RouterLink>
      <div class="nav-link disabled-link" aria-disabled="true">
        <span>▤</span>Project Details
      </div>
      <div class="nav-link disabled-link" aria-disabled="true">
        <span>▧</span>Track Invoices
      </div>
    </nav>
    <div class="nav-heading general-heading">GENERAL</div>
    <nav class="navigation">
      <div class="nav-link disabled-link" aria-disabled="true">
        <span>⚙</span>Settings
      </div>
      <div class="nav-link disabled-link" aria-disabled="true">
        <span>↪</span>Logout
      </div>
    </nav>
    <div class="sidebar-bottom">
      <div class="sidebar-message">
        <h3>Stay organized.</h3>
        <p>Keep your projects and invoices in one place.</p>
      </div>
    </div>
  </aside>
</template>
