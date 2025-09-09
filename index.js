import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import DoctorsPage from '../pages/DoctorsPage.vue'
import BookingPage from '../pages/BookingPage.vue'
import AppointmentsPage from '../pages/AppointmentsPage.vue'
import ContactPage from '../pages/ContactPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/doctors', name: 'Doctors', component: DoctorsPage },
  { path: '/booking', name: 'Booking', component: BookingPage },
  { path: '/appointments', name: 'Appointments', component: AppointmentsPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
