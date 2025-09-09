<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="row g-4">

          <!-- Doctor Card -->
          <div class="col-lg-4">
            <div class="card h-100 shadow-sm">
              <img
                :src="doctor?.photo"
                class="card-img-top doctor-photo"
                :alt="doctor?.name"
              >
              <div class="card-body">
                <h4 class="card-title">{{ doctor?.name }}</h4>
                <p class="text-primary fw-semibold mb-2">
                  <i :class="getSpecialtyIcon(doctor?.specialty)" class="me-2"></i>
                  {{ doctor?.specialty }}
                </p>
                <p class="text-muted mb-2">
                  <i class="fas fa-map-marker-alt me-2"></i>
                  {{ doctor?.location }}
                </p>
                <p class="text-muted mb-2">
                  <i class="fas fa-graduation-cap me-2"></i>
                  {{ doctor?.experience }} experience
                </p>
                <div class="rating mb-3">
                  <span class="text-warning">
                    <i
                      class="fas fa-star"
                      v-for="star in Math.floor(doctor?.rating || 0)"
                      :key="star"
                    ></i>
                    <i class="fas fa-star-half-alt" v-if="(doctor?.rating || 0) % 1 !== 0"></i>
                  </span>
                  <span class="text-muted ms-1">({{ doctor?.rating }})</span>
                </div>
                <p class="small text-muted">{{ doctor?.about }}</p>
              </div>
            </div>
          </div>

          <!-- Booking Form -->
          <div class="col-lg-8">
            <div class="card shadow-sm">
              <div class="card-header bg-primary text-white">
                <h4 class="mb-0">
                  <i class="fas fa-calendar-plus me-2"></i>
                  Book Appointment
                </h4>
              </div>
              <div class="card-body p-4">
                <form @submit.prevent="submitBooking">
                  <div class="row g-3">

                    <!-- Patient Name -->
                    <div class="col-md-6">
                      <label for="patientName" class="form-label">Full Name *</label>
                      <input
                        v-model="form.patientName"
                        type="text"
                        class="form-control"
                        id="patientName"
                        :class="{ 'is-invalid': errors.patientName }"
                        required
                      >
                      <div v-if="errors.patientName" class="invalid-feedback">
                        {{ errors.patientName }}
                      </div>
                    </div>

                    <!-- Phone -->
                    <div class="col-md-6">
                      <label for="phone" class="form-label">Phone Number *</label>
                      <input
                        v-model="form.phone"
                        type="tel"
                        class="form-control"
                        id="phone"
                        :class="{ 'is-invalid': errors.phone }"
                        required
                      >
                      <div v-if="errors.phone" class="invalid-feedback">
                        {{ errors.phone }}
                      </div>
                    </div>

                    <!-- Email -->
                    <div class="col-12">
                      <label for="email" class="form-label">Email Address *</label>
                      <input
                        v-model="form.email"
                        type="email"
                        class="form-control"
                        id="email"
                        :class="{ 'is-invalid': errors.email }"
                        required
                      >
                      <div v-if="errors.email" class="invalid-feedback">
                        {{ errors.email }}
                      </div>
                    </div>

                    <!-- Appointment Date -->
                    <div class="col-md-6">
                      <label for="appointmentDate" class="form-label">Appointment Date *</label>
                      <input
                        v-model="form.appointmentDate"
                        type="date"
                        class="form-control"
                        id="appointmentDate"
                        :min="today"
                        :class="{ 'is-invalid': errors.appointmentDate }"
                        required
                      >
                      <div v-if="errors.appointmentDate" class="invalid-feedback">
                        {{ errors.appointmentDate }}
                      </div>
                    </div>

                    <!-- Appointment Time -->
                    <div class="col-md-6">
                      <label for="appointmentTime" class="form-label">Appointment Time *</label>
                      <select
                        v-model="form.appointmentTime"
                        class="form-select"
                        id="appointmentTime"
                        :class="{ 'is-invalid': errors.appointmentTime }"
                        required
                      >
                        <option value="">Select a time slot</option>
                        <option
                          v-for="slot in doctor?.availableSlots"
                          :key="slot"
                          :value="slot"
                        >
                          {{ slot }}
                        </option>
                      </select>
                      <div v-if="errors.appointmentTime" class="invalid-feedback">
                        {{ errors.appointmentTime }}
                      </div>
                    </div>

                    <!-- Reason -->
                    <div class="col-12">
                      <label for="reason" class="form-label">Reason for Visit (Optional)</label>
                      <textarea
                        v-model="form.reason"
                        class="form-control"
                        id="reason"
                        rows="3"
                        placeholder="Please describe your symptoms or reason for the appointment..."
                      ></textarea>
                    </div>

                    <!-- Terms -->
                    <div class="col-12">
                      <div class="form-check">
                        <input
                          v-model="form.agreeTerms"
                          class="form-check-input"
                          type="checkbox"
                          id="agreeTerms"
                          :class="{ 'is-invalid': errors.agreeTerms }"
                          required
                        >
                        <label class="form-check-label" for="agreeTerms">
                          I agree to the terms and conditions and privacy policy *
                        </label>
                        <div v-if="errors.agreeTerms" class="invalid-feedback">
                          {{ errors.agreeTerms }}
                        </div>
                      </div>
                    </div>

                    <!-- Submit -->
                    <div class="col-12">
                      <button type="submit" class="btn btn-success btn-lg w-100">
                        <i class="fas fa-check me-2"></i>
                        Confirm Appointment
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div class="modal fade" id="successModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">
              <i class="fas fa-check-circle me-2"></i>
              Appointment Confirmed
            </h5>
          </div>
          <div class="modal-body text-center py-4" v-if="lastAppointment">
            <i class="fas fa-calendar-check fa-3x text-success mb-3"></i>
            <h5>Your appointment has been successfully booked!</h5>
            <div class="appointment-details bg-light p-3 rounded mt-3">
              <p class="mb-1"><strong>Doctor:</strong> {{ lastAppointment.doctorName }}</p>
              <p class="mb-1"><strong>Date:</strong> {{ formatDate(lastAppointment.appointmentDate) }}</p>
              <p class="mb-1"><strong>Time:</strong> {{ lastAppointment.appointmentTime }}</p>
              <p class="mb-0"><strong>Location:</strong> {{ lastAppointment.doctorLocation }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <router-link to="/appointments" class="btn btn-primary">
              View My Appointments
            </router-link>
            <router-link to="/doctors" class="btn btn-outline-secondary">
              Book Another
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doctors } from '../data/doctors.js'
import { Modal } from 'bootstrap'   // ✅ FIXED: Import Modal properly

const route = useRoute()
const router = useRouter()

const props = defineProps({
  doctorId: String
})

const doctor = ref(null)
const errors = ref({})
const lastAppointment = ref(null)

const form = ref({
  patientName: '',
  phone: '',
  email: '',
  appointmentDate: '',
  appointmentTime: '',
  reason: '',
  agreeTerms: false
})

const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

onMounted(() => {
  const doctorId = parseInt(props.doctorId || route.params.doctorId)
  doctor.value = doctors.find(d => d.id === doctorId)
  if (!doctor.value) {
    router.push('/doctors')
  }
})

const validateForm = () => {
  errors.value = {}

  if (!form.value.patientName.trim()) {
    errors.value.patientName = 'Name is required'
  }

  if (!form.value.phone.trim()) {
    errors.value.phone = 'Phone number is required'
  } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(form.value.phone.replace(/\s/g, ''))) {
    errors.value.phone = 'Please enter a valid phone number'
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\8]+@[^\]+\.[^\u]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }

  if (!form.value.appointmentDate) {
    errors.value.appointmentDate = 'Appointment date is required'
  } else {
    const todayDate = new Date().setHours(0, 0, 0, 0)
    const selectedDate = new Date(form.value.appointmentDate).setHours(0, 0, 0, 0)
    if (selectedDate < todayDate) {
      errors.value.appointmentDate = 'Appointment date must be today or in the future'
    }
  }

  if (!form.value.appointmentTime) {
    errors.value.appointmentTime = 'Please select an appointment time'
  }

  if (!form.value.agreeTerms) {
    errors.value.agreeTerms = 'You must agree to the terms and conditions'
  }

  return Object.keys(errors.value).length === 0
}

const submitBooking = () => {
  if (!validateForm()) return

  const appointment = {
    id: Date.now(),
    doctorId: doctor.value.id,
    doctorName: doctor.value.name,
    doctorSpecialty: doctor.value.specialty,
    doctorLocation: doctor.value.location,
    patientName: form.value.patientName,
    phone: form.value.phone,
    email: form.value.email,
    appointmentDate: form.value.appointmentDate,
    appointmentTime: form.value.appointmentTime,
    reason: form.value.reason,
    status: 'confirmed',
    bookedAt: new Date().toISOString()
  }

  lastAppointment.value = appointment

  // Save to localStorage
  const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
  existingAppointments.push(appointment)
  localStorage.setItem('appointments', JSON.stringify(existingAppointments))

  // ✅ Show success modal correctly
  const modal = new Modal(document.getElementById('successModal'))
  modal.show()

  // Reset form
  form.value = {
    patientName: '',
    phone: '',
    email: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    agreeTerms: false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

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
.doctor-photo {
  height: 250px;
  object-fit: cover;
}

.appointment-details {
  text-align: left;
}

.btn {
  border-radius: 10px;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.card {
  border-radius: 15px;
}

.form-control, .form-select {
  border-radius: 10px;
}

.rating .fas {
  font-size: 0.9rem;
}
</style>
