<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  try {
    await authStore.login(email.value, password.value)
    router.push('/operation')
  } catch {
    // error is set in authStore
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card card">
      <h2 class="login-title">{{ t('login.title') }}</h2>
      <p class="login-subtitle">{{ t('login.subtitle') }}</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>{{ t('login.email') }}</label>
          <input v-model="email" type="email" placeholder="email@example.com" required />
        </div>
        <div class="form-group">
          <label>{{ t('login.password') }}</label>
          <input v-model="password" type="password" placeholder="password" required />
        </div>

        <div v-if="authStore.error" class="error-message">{{ authStore.error }}</div>

        <button type="submit" class="btn btn-primary login-btn" :disabled="loading">
          {{ loading ? t('login.loading') : t('login.submit') }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
}
.login-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}
.login-subtitle {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.form-group label {
  font-size: 0.8rem;
  color: var(--text-secondary);
}
.form-group input {
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.9rem;
}
.form-group input:focus {
  outline: none;
  border-color: var(--accent);
}
.error-message {
  color: var(--danger);
  font-size: 0.85rem;
  padding: 0.5rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: var(--radius);
}
.login-btn {
  width: 100%;
  justify-content: center;
  padding: 0.75rem;
  font-size: 1rem;
  margin-top: 0.5rem;
}
</style>
