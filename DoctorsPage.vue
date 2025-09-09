<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-12">
        <h1 class="mb-4">
          <i class="fas fa-stethoscope text-primary me-3"></i>
          Find Doctors
        </h1>
      </div>
    </div>

    <!-- Search and Filter Bar -->
    <div class="row mb-4">
      <div class="col-lg-8">
        <div class="input-group">
          <span class="input-group-text">
            <i class="fas fa-search"></i>
          </span>
          <input 
            v-model="searchQuery"
            type="text" 
            class="form-control" 
            placeholder="Search doctors by name or specialty..."
          >
        </div>
      </div>
      <div class="col-lg-4">
        <select v-model="selectedSpecialty" class="form-select">
          <option v-for="specialty in specialties" :key="specialty" :value="specialty">
            {{ specialty }}
          </option>
        </select>
      </div>
    </div>

    <!-- Results Count -->
    <div class="row mb-3">
      <div class="col-12">
        <p class="text-muted">
          Showing {{ filteredDoctors.length }} doctor{{ filteredDoctors.length !== 1 ? 's' : '' }}
        </p>
      </div>
    </div>

    <!-- Doctors Grid -->
    <div class="row g-4">
      <div class="col-md-6 col-lg-4" v-for="doctor in paginatedDoctors" :key="doctor.id">
        <div class="card h-100 shadow-sm doctor-card">
          <img 
            :src="doctor.photo" 
            class="card-img-top doctor-photo" 
            :alt="doctor.name"
          >
          <div class="card-body d-flex flex-column">
            <h5 class="card-title mb-2">{{ doctor.name }}</h5>
            <p class="text-primary fw-semibold mb-2">
              <i :class="getSpecialtyIcon(doctor.specialty)" class="me-2"></i>
              {{ doctor.specialty }}
            </p>
            <p class="text-muted small mb-2">
              <i class="fas fa-map-marker-alt me-1"></i>
              {{ doctor.location }}
            </p>
            <p class="text-muted small mb-2">
              <i class="fas fa-graduation-cap me-1"></i>
              {{ doctor.experience }} experience
            </p>
            <div class="rating mb-3">
              <span class="text-warning">
                <i class="fas fa-star" v-for="star in Math.floor(doctor.rating)" :key="star"></i>
                <i class="fas fa-star-half-alt" v-if="doctor.rating % 1 !== 0"></i>
              </span>
              <span class="text-muted ms-1">({{ doctor.rating }})</span>
            </div>
            <div class="available-slots mb-3">
              <small class="text-muted">Available today:</small>
              <div class="mt-1">
                <span 
                  v-for="slot in doctor.availableSlots.slice(0, 3)" 
                  :key="slot"
                  class="badge bg-light text-dark me-1 mb-1"
                >
                  {{ slot }}
                </span>
                <span v-if="doctor.availableSlots.length > 3" class="text-muted small">
                  +{{ doctor.availableSlots.length - 3 }} more
                </span>
              </div>
            </div>
            <router-link 
              :to="`/booking/${doctor.id}`"
              class="btn btn-primary mt-auto"
            >
              <i class="fas fa-calendar-plus me-2"></i>
              Book Appointment
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-if="filteredDoctors.length === 0" class="row">
      <div class="col-12 text-center py-5">
        <i class="fas fa-search fa-3x text-muted mb-3"></i>
        <h4 class="text-muted">No doctors found</h4>
        <p class="text-muted">Try adjusting your search criteria or browse all doctors.</p>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="row mt-5">
      <div class="col-12">
        <nav aria-label="Doctors pagination">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">
                <i class="fas fa-chevron-left"></i>
              </button>
            </li>
            <li 
              class="page-item" 
              v-for="page in totalPages" 
              :key="page"
              :class="{ active: currentPage === page }"
            >
              <button class="page-link" @click="currentPage = page">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">
                <i class="fas fa-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { doctors, specialties } from '../data/doctors.js'

const route = useRoute()
const searchQuery = ref('')
const selectedSpecialty = ref('All Specialties')
const currentPage = ref(1)
const doctorsPerPage = 6

// Initialize from query params
onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
  if (route.query.specialty) {
    selectedSpecialty.value = route.query.specialty
  }
})

const filteredDoctors = computed(() => {
  let filtered = [...doctors]
  
  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(doctor => 
      doctor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  // Filter by specialty
  if (selectedSpecialty.value && selectedSpecialty.value !== 'All Specialties') {
    filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialty.value)
  }
  
  return filtered
})

const totalPages = computed(() => Math.ceil(filteredDoctors.value.length / doctorsPerPage))

const paginatedDoctors = computed(() => {
  const start = (currentPage.value - 1) * doctorsPerPage
  const end = start + doctorsPerPage
  return filteredDoctors.value.slice(start, end)
})

// Reset pagination when filters change
watch([searchQuery, selectedSpecialty], () => {
  currentPage.value = 1
})

const getSpecialtyIcon = (specialty) => {
  const icons = {
    'Cardiologist': 'fas fa-heartbeat',
    'Dentist': 'fas fa-tooth',
    'Dermatologist': 'fas fa-hand-sparkles',
    'Orthopedist': 'fas fa-bone',
    'Pediatrician': 'fas fa-baby',
    'Neurologist': 'fas fa-brain'
  }
  return icons[specialty] || 'fas fa-user-md'
}
</script>

<style scoped>
.doctor-card {
  transition: all 0.3s ease;
  border-radius: 15px;
}

.doctor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
}

.doctor-photo {
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.rating .fas {
  font-size: 0.9rem;
}

.available-slots .badge {
  font-size: 0.7rem;
}

.specialty-card:hover {
  background-color: #f8f9fa;
}

.btn {
  border-radius: 10px;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
}
</style>