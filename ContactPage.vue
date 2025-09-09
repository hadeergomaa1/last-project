<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="text-center mb-5">
          <h1 class="mb-3">
            <i class="fas fa-envelope text-primary me-3"></i>
            Contact Us
          </h1>
          <p class="lead text-muted">
            Have questions or need help? We're here to assist you with your healthcare needs.
          </p>
        </div>

        <div class="row g-4">
          <!-- Contact Form -->
          <div class="col-lg-8">
            <div class="card shadow-sm">
              <div class="card-header bg-primary text-white">
                <h4 class="mb-0">
                  <i class="fas fa-paper-plane me-2"></i>
                  Send us a Message
                </h4>
              </div>
              <div class="card-body p-4">
                <form @submit.prevent="submitForm">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label">Full Name *</label>
                      <input
                        v-model="form.name"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors.name }"
                        required
                      />
                      <div v-if="errors.name" class="invalid-feedback">
                        {{ errors.name }}
                      </div>
                    </div>

                    <div class="col-md-6">
                      <label class="form-label">Email Address *</label>
                      <input
                        v-model="form.email"
                        type="email"
                        class="form-control"
                        :class="{ 'is-invalid': errors.email }"
                        required
                      />
                      <div v-if="errors.email" class="invalid-feedback">
                        {{ errors.email }}
                      </div>
                    </div>

                    <div class="col-12">
                      <label class="form-label">Subject *</label>
                      <select
                        v-model="form.subject"
                        class="form-select"
                        :class="{ 'is-invalid': errors.subject }"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="appointment">Appointment Related</option>
                        <option value="technical">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                      <div v-if="errors.subject" class="invalid-feedback">
                        {{ errors.subject }}
                      </div>
                    </div>

                    <div class="col-12">
                      <label class="form-label">Message *</label>
                      <textarea
                        v-model="form.message"
                        class="form-control"
                        rows="5"
                        :class="{ 'is-invalid': errors.message }"
                        placeholder="Please describe your question or concern..."
                        required
                      ></textarea>
                      <div v-if="errors.message" class="invalid-feedback">
                        {{ errors.message }}
                      </div>
                    </div>

                    <div class="col-12">
                      <button type="submit" class="btn btn-primary btn-lg">
                        <i class="fas fa-paper-plane me-2"></i>
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="col-lg-4">
            <div class="card shadow-sm h-100">
              <div class="card-header bg-light">
                <h5 class="mb-0">
                  <i class="fas fa-info-circle text-primary me-2"></i>
                  Get in Touch
                </h5>
              </div>
              <div class="card-body">
                <div class="contact-info">
                  <div class="contact-item mb-4">
                    <div class="d-flex align-items-center mb-2">
                      <i class="fas fa-phone text-primary me-3"></i>
                      <div>
                        <h6 class="mb-0">Phone</h6>
                        <a href="tel:+15551234567" class="text-decoration-none">+1 (555) 123-4567</a>
                      </div>
                    </div>
                  </div>

                  <div class="contact-item mb-4">
                    <div class="d-flex align-items-center mb-2">
                      <i class="fas fa-envelope text-primary me-3"></i>
                      <div>
                        <h6 class="mb-0">Email</h6>
                        <a href="mailto:info@medicare.com" class="text-decoration-none">info@medicare.com</a>
                      </div>
                    </div>
                  </div>

                  <div class="contact-item mb-4">
                    <div class="d-flex align-items-start mb-2">
                      <i class="fas fa-map-marker-alt text-primary me-3 mt-1"></i>
                      <div>
                        <h6 class="mb-0">Address</h6>
                        <p class="mb-0 text-muted">
                          123 Health Street<br />
                          Medical City, MC 12345
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="contact-item">
                    <div class="d-flex align-items-center mb-2">
                      <i class="fas fa-clock text-primary me-3"></i>
                      <div>
                        <h6 class="mb-0">Office Hours</h6>
                        <p class="mb-0 text-muted small">
                          Mon - Fri: 8:00 AM - 6:00 PM<br />
                          Sat: 9:00 AM - 2:00 PM<br />
                          Sun: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
              Message Sent Successfully
            </h5>
          </div>
          <div class="modal-body text-center py-4">
            <i class="fas fa-paper-plane fa-3x text-success mb-3"></i>
            <h5>Thank you for contacting us!</h5>
            <p class="text-muted">
              We have received your message and will get back to you within 24 hours.
            </p>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-success" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Modal } from 'bootstrap' // ✅ Import Modal from Bootstrap

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}

  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required'
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }

  if (!form.value.subject) {
    errors.value.subject = 'Please select a subject'
  }

  if (!form.value.message.trim()) {
    errors.value.message = 'Message is required'
  } else if (form.value.message.trim().length < 10) {
    errors.value.message = 'Message must be at least 10 characters long'
  }

  return Object.keys(errors.value).length === 0
}

const submitForm = () => {
  if (!validateForm()) return

  const message = {
    id: Date.now(),
    ...form.value,
    sentAt: new Date().toISOString()
  }

  const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]')
  existingMessages.push(message)
  localStorage.setItem('contactMessages', JSON.stringify(existingMessages))

  // ✅ Show success modal
  const modal = new Modal(document.getElementById('successModal'))
  modal.show()

  // Reset form
  form.value = { name: '', email: '', subject: '', message: '' }
  errors.value = {}
}
</script>

<style scoped>
.card {
  border-radius: 15px;
}

.form-control,
.form-select {
  border-radius: 10px;
}

.btn {
  border-radius: 10px;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.contact-item {
  padding: 0.5rem 0;
}

.contact-info a:hover {
  color: #0056B3 !important;
  transition: color 0.3s ease;
}
</style>
