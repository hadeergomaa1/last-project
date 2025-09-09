<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-12">
        <h1 class="mb-4">
          <i class="fas fa-calendar-check text-primary me-3"></i>
          My Appointments
        </h1>
      </div>
    </div>

    <!-- Appointments List -->
    <div v-if="appointments.length > 0" class="row g-4">
      <div
        class="col-lg-6"
        v-for="appointment in appointments"
        :key="appointment.id"
      >
        <div class="card h-100 shadow-sm appointment-card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span class="badge bg-success">{{ appointment.status.toUpperCase() }}</span>
            <small class="text-muted">
              Booked on {{ formatDate(appointment.bookedAt) }}
            </small>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-3">
                <div
                  class="doctor-avatar bg-primary text-white d-flex align-items-center justify-content-center"
                >
                  <i class="fas fa-user-md fa-2x"></i>
                </div>
              </div>
              <div class="col-9">
                <h5 class="card-title mb-2">{{ appointment.doctorName }}</h5>
                <p class="text-primary mb-1">
                  <i :class="getSpecialtyIcon(appointment.doctorSpecialty)" class="me-2"></i>
                  {{ appointment.doctorSpecialty }}
                </p>
                <p class="text-muted small mb-2">
                  <i class="fas fa-map-marker-alt me-1"></i>
                  {{ appointment.doctorLocation }}
                </p>
              </div>
            </div>

            <hr />

            <div class="appointment-details">
              <div class="row g-2">
                <div class="col-6">
                  <div class="d-flex align-items-center mb-2">
                    <i class="fas fa-calendar text-primary me-2"></i>
                    <div>
                      <small class="text-muted d-block">Date</small>
                      <strong>{{ formatAppointmentDate(appointment.appointmentDate) }}</strong>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="d-flex align-items-center mb-2">
                    <i class="fas fa-clock text-primary me-2"></i>
                    <div>
                      <small class="text-muted d-block">Time</small>
                      <strong>{{ appointment.appointmentTime }}</strong>
                    </div>
                  </div>
                </div>
                <div class="col-12" v-if="appointment.reason">
                  <div class="d-flex align-items-start mb-2">
                    <i class="fas fa-notes-medical text-primary me-2 mt-1"></i>
                    <div>
                      <small class="text-muted d-block">Reason for Visit</small>
                      <span>{{ appointment.reason }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer d-flex gap-2">
            <button
              @click="cancelAppointment(appointment.id)"
              class="btn btn-outline-danger btn-sm"
              :disabled="isAppointmentPast(appointment.appointmentDate)"
            >
              <i class="fas fa-times me-1"></i>
              Cancel
            </button>
            <button class="btn btn-outline-primary btn-sm">
              <i class="fas fa-edit me-1"></i>
              Reschedule
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="row">
      <div class="col-12 text-center py-5">
        <i class="fas fa-calendar-times fa-4x text-muted mb-4"></i>
        <h4 class="text-muted mb-3">No appointments yet</h4>
        <p class="text-muted mb-4">
          You haven't booked any appointments. Find a doctor and book your first appointment.
        </p>
        <router-link to="/doctors" class="btn btn-primary btn-lg">
          <i class="fas fa-search me-2"></i>
          Find Doctors
        </router-link>
      </div>
    </div>

    <!-- Cancel Confirmation Modal -->
    <div class="modal fade" id="cancelModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-exclamation-triangle text-warning me-2"></i>
              Cancel Appointment
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to cancel this appointment?</p>
            <div v-if="appointmentToCancel" class="bg-light p-3 rounded">
              <p class="mb-1"><strong>Doctor:</strong> {{ appointmentToCancel.doctorName }}</p>
              <p class="mb-1"><strong>Date:</strong> {{ formatAppointmentDate(appointmentToCancel.appointmentDate) }}</p>
              <p class="mb-0"><strong>Time:</strong> {{ appointmentToCancel.appointmentTime }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Keep Appointment
            </button>
            <button type="button" class="btn btn-danger" @click="confirmCancel">
              <i class="fas fa-trash me-1"></i>
              Yes, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'   // ✅ import Modal from bootstrap

const appointments = ref([])
const appointmentToCancel = ref(null)

onMounted(() => {
  loadAppointments()
})

const loadAppointments = () => {
  const saved = localStorage.getItem('appointments')
  if (saved) {
    appointments.value = JSON.parse(saved)
  }
}

const cancelAppointment = (appointmentId) => {
  appointmentToCancel.value = appointments.value.find(apt => apt.id === appointmentId)
  const modal = new Modal(document.getElementById('cancelModal'))
  modal.show()
}

const confirmCancel = () => {
  if (appointmentToCancel.value) {
    // Remove from list
    appointments.value = appointments.value.filter(apt => apt.id !== appointmentToCancel.value.id)
    localStorage.setItem('appointments', JSON.stringify(appointments.value))

    // Hide modal
    const modal = Modal.getInstance(document.getElementById('cancelModal'))
    modal.hide()

    appointmentToCancel.value = null
  }
}

const isAppointmentPast = (dateString) => {
  return new Date(dateString) < new Date()
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatAppointmentDate = (dateString) => {
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
.appointment-card {
  transition: all 0.3s ease;
  border-radius: 15px;
}

.appointment-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
}

.doctor-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.appointment-details {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
}

.btn {
  border-radius: 10px;
  transition: all 0.3s ease;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.card {
  border-radius: 15px;
}
</style>
