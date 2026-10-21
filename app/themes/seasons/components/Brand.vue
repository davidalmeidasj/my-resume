<script setup lang="ts">
import { AUTHOR } from '@/config/site'
</script>

<template>
  <a href="#home" class="brand">
    <svg class="brand__leaf" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 20 C4 10 10 4 20 4 C20 14 14 20 4 20 Z" />
      <path d="M4 20 L13 11" fill="none" stroke-width="1.5" />
    </svg>
    <span class="brand__name">{{ AUTHOR.name }}</span>
  </a>
</template>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  color: var(--color-tree-trunk);
}

.brand__leaf {
  width: 1.5rem;
  height: 1.5rem;
  fill: var(--color-spring-deep);
  stroke: var(--color-paper);
  transition: transform 500ms var(--ease-out);
}

.brand:hover .brand__leaf {
  transform: rotate(-18deg);
}

.brand__name {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-weight: 700;
  font-size: 1.1875rem;
  letter-spacing: -0.02em;
  white-space: nowrap;
}
</style>
