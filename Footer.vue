<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <footer class="bg-dark text-light py-5 mt-auto">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-3">
          <h5 class="text-primary">
            <i class="fas fa-user-md me-2"></i>MediCare
          </h5>
          <p class="mb-0">Your trusted healthcare appointment booking platform.</p>
        </div>
        <div class="col-md-4 mb-3">
          <h6>Quick Links</h6>
          <ul class="list-unstyled">
            <li><router-link to="/" class="text-light text-decoration-none">Home</router-link></li>
            <li><router-link to="/doctors" class="text-light text-decoration-none">Find Doctors</router-link></li>
            <li><router-link to="/appointments" class="text-light text-decoration-none">My Appointments</router-link></li>
          </ul>
        </div>
        <div class="col-md-4 mb-3">
          <h6>Contact Info</h6>
          <p class="mb-1"><i class="fas fa-phone me-2"></i>+1 (555) 123-4567</p>
          <p class="mb-1"><i class="fas fa-envelope me-2"></i>info@medicare.com</p>
          <p class="mb-0"><i class="fas fa-map-marker-alt me-2"></i>123 Health St, Medical City</p>
        </div>
      </div>
      <hr class="my-4">
      <div class="text-center">
        <p class="mb-0">&copy; 2025 MediCare. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>


<style scoped>
footer a:hover {
  color: #86EFAC !important;
  transition: color 0.3s ease;
}
</style>
