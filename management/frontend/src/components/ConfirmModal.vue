<script setup lang="ts">
import { useI18n } from '@/i18n'

const { t } = useI18n()

defineProps<{
  title: string
  message: string
  confirmLabel?: string
  confirmClass?: string
  loading?: boolean
  hideCancel?: boolean
}>()

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('cancel')">
      <div class="modal-dialog">
        <div class="modal-title">{{ title }}</div>
        <div class="modal-message">{{ message }}</div>
        <div class="modal-actions">
          <button v-if="!hideCancel" class="btn btn-secondary btn-sm" :disabled="loading" @click="$emit('cancel')">
            {{ t('modal.cancel') }}
          </button>
          <button
            class="btn btn-sm"
            :class="confirmClass || 'btn-danger'"
            :disabled="loading"
            @click="$emit('confirm')"
          >
            {{ loading ? t('modal.processing') : (confirmLabel || t('modal.confirm')) }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-dialog {
  background: var(--bg-secondary, #1e293b);
  border: 1px solid var(--border, #334155);
  border-radius: var(--radius, 8px);
  padding: 1.5rem;
  min-width: 320px;
  max-width: 440px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}
.modal-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.modal-message {
  font-size: 0.85rem;
  color: var(--text-secondary, #94a3b8);
  margin-bottom: 1.25rem;
  line-height: 1.5;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
