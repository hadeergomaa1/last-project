<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div class="container">
      <router-link class="navbar-brand fw-bold text-primary" to="/">
        <i class="fas fa-user-md me-2"></i>
        MediCare
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" >
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" active-class="active">
              <i class="fas fa-home me-1"></i>Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/doctors" active-class="active">
              <i class="fas fa-stethoscope me-1"></i>Doctors
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/appointments" active-class="active">
              <i class="fas fa-calendar-check me-1"></i>My Appointments
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact" active-class="active">
              <i class="fas fa-envelope me-1"></i>Contact
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar-brand {
  font-size: 1.5rem;
  color: #0056B3 !important;
}

.nav-link {
  transition: color 0.3s ease;
  padding: 0.5rem 1rem !important;
}

.nav-link:hover {
  color: #0056B3 !important;
}

.nav-link.active {
  color: #0056B3 !important;
  font-weight: 600;
}
</style>
