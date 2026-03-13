<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const { toasts, remove } = useToast()
</script>

<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="t in toasts"
          :key="t.id"
          class="toast-item"
          :class="'toast-' + t.type"
          @click="remove(t.id)"
        >
          <span class="toast-icon">
            <template v-if="t.type === 'success'">&#10003;</template>
            <template v-else-if="t.type === 'error'">&#10007;</template>
            <template v-else-if="t.type === 'warning'">&#9888;</template>
            <template v-else>&#8505;</template>
          </span>
          <span class="toast-message">{{ t.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
  max-width: 360px;
}

.toast-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #f1f5f9;
  pointer-events: auto;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
}

.toast-icon {
  flex-shrink: 0;
  font-size: 1rem;
}

.toast-info {
  background: rgba(59, 130, 246, 0.9);
}

.toast-success {
  background: rgba(34, 197, 94, 0.9);
}

.toast-warning {
  background: rgba(245, 158, 11, 0.9);
  color: #1e293b;
}

.toast-error {
  background: rgba(239, 68, 68, 0.9);
}

/* Transition */
.toast-enter-active {
  transition: all 0.3s ease;
}
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(80px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(80px);
}
.toast-move {
  transition: transform 0.25s ease;
}
</style>
