<template>
  <div>

    <section class="hero-section bg-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center min-vh-50">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4">
              Find the Right Doctor for You
            </h1>
            <p class="lead mb-4">
              Book appointments with qualified healthcare professionals in your area.
              Easy, fast, and secure appointment booking.
            </p>
            <router-link to="/doctors" class="btn btn-success btn-lg me-3">
              <i class="fas fa-search me-2"></i>Find Doctors
            </router-link>
            <router-link to="/appointments" class="btn btn-outline-light btn-lg">
              <i class="fas fa-calendar-check me-2"></i>My Appointments
            </router-link>
          </div>
          <div class="col-lg-6">
            <img
              src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Medical consultation"
              class="img-fluid rounded shadow-lg"
            >
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <h2 class="text-center mb-4">Quick Doctor Search</h2>
            <div class="card shadow">
              <div class="card-body p-4">
                <div class="row g-3">
                  <div class="col-md-8">
                    <input
                      v-model="searchQuery"
                      type="text"
                      class="form-control form-control-lg"
                      placeholder="Search by doctor name or specialty..."
                      @keyup.enter="handleSearch"
                    >
                  </div>
                  <div class="col-md-4">
                    <button
                      @click="handleSearch"
                      class="btn btn-primary btn-lg w-100"
                    >
                      <i class="fas fa-search me-2"></i>Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section class="py-5">
      <div class="container">
        <h2 class="text-center mb-5">Why Choose MediCare?</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="feature-card text-center p-4">
              <div class="feature-icon mb-3">
                <i class="fas fa-user-md fa-3x text-primary"></i>
              </div>
              <h4>Qualified Doctors</h4>
              <p class="text-muted">
                All our doctors are verified professionals with years of experience
                in their respective specialties.
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card text-center p-4">
              <div class="feature-icon mb-3">
                <i class="fas fa-clock fa-3x text-success"></i>
              </div>
              <h4>Easy Booking</h4>
              <p class="text-muted">
                Book appointments in just a few clicks. Choose your preferred
                time slot and get instant confirmation.
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card text-center p-4">
              <div class="feature-icon mb-3">
                <i class="fas fa-shield-alt fa-3x text-info"></i>
              </div>
              <h4>Secure & Private</h4>
              <p class="text-muted">
                Your personal information is protected with industry-standard
                security measures and privacy protocols.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-5">Medical Specialties</h2>
        <div class="row g-3">
          <div class="col-6 col-md-4 col-lg-2" v-for="specialty in featuredSpecialties" :key="specialty.name">
            <div class="specialty-card text-center p-3 h-100" @click="searchBySpecialty(specialty.name)">
              <i :class="specialty.icon" class="fa-2x text-primary mb-2"></i>
              <h6 class="mb-0">{{ specialty.name }}</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const featuredSpecialties = [
  { name: 'Cardiologist', icon: 'fas fa-heartbeat' },
  { name: 'Dentist', icon: 'fas fa-tooth' },
  { name: 'Dermatologist', icon: 'fas fa-hand-sparkles' },
  { name: 'Orthopedist', icon: 'fas fa-bone' },
  { name: 'Pediatrician', icon: 'fas fa-baby' },
  { name: 'Neurologist', icon: 'fas fa-brain' }
]

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/doctors', query: { search: searchQuery.value } })
  } else {
    router.push('/doctors')
  }
}

const searchBySpecialty = (specialty) => {
  router.push({ path: '/doctors', query: { specialty } })
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #0056B3 0%, #0080FF 100%);
  min-height: 60vh;
}

.min-vh-50 {
  min-height: 50vh;
}

.feature-card {
  border: 1px solid #e9ecef;
  border-radius: 15px;
  transition: all 0.3s ease;
  height: 100%;
  background: white;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.specialty-card {
  border: 1px solid #e9ecef;
  border-radius: 15px;
  transition: all 0.3s ease;
  cursor: pointer;
  background: white;
}

.specialty-card:hover {
  background: #f8f9fa;
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
</style>
