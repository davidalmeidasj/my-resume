<template>
  <a href="#home" class="brand" data-lock>
    <svg class="brand__mark" viewBox="0 0 28 28" aria-hidden="true">
      <path d="M2 9V2h7M19 2h7v7M26 19v7h-7M9 26H2v-7" />
      <circle cx="14" cy="14" r="3.25" />
      <path d="M5 14h5.5M17.5 14H23" />
    </svg>
    <span class="brand__name">David Almeida</span>
  </a>
</template>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  color: #1b2427;
  text-decoration: none;
}

.brand__mark {
  width: 28px;
  height: 28px;
  fill: none;
  stroke: #00799b;
  stroke-width: 2;
  transition: transform 460ms cubic-bezier(0.16, 1, 0.3, 1);
}

.brand:hover .brand__mark {
  transform: rotate(90deg);
}

.brand__name {
  font-family: 'Chakra Petch', system-ui, sans-serif;
  font-weight: 500;
  font-size: 1.0625rem;
  letter-spacing: 0.02em;
}
</style>
