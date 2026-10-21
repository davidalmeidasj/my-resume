<template>
  <svg class="leaves" viewBox="0 0 400 440" aria-hidden="true" focusable="false">
    <g>
      <g class="leaves__blade leaves__blade--1">
        <path d="M0 0 C-30 -120 -10 -260 40 -360 C110 -260 100 -110 0 0 Z" fill="#74B3CE" />
        <path d="M0 0 C10 -120 24 -240 40 -360" class="leaves__vein" />
      </g>
      <g class="leaves__blade leaves__blade--2">
        <path d="M0 0 C-30 -120 -10 -260 40 -360 C110 -260 100 -110 0 0 Z" fill="#25642B" />
        <path d="M0 0 C10 -120 24 -240 40 -360" class="leaves__vein" />
      </g>
      <g class="leaves__blade leaves__blade--3">
        <path d="M0 0 C-30 -120 -10 -260 40 -360 C110 -260 100 -110 0 0 Z" fill="#1EAE38" />
        <path d="M0 0 C10 -120 24 -240 40 -360" class="leaves__vein" />
      </g>
      <circle cx="200" cy="420" r="10" fill="#2C1A1D" />
    </g>
  </svg>
</template>

<style scoped>
.leaves {
  display: block;
  overflow: visible;
}

.leaves__blade {
  transform-box: view-box;
  transform-origin: 0 0;
  transform: translate(200px, 420px) rotate(var(--to));
  animation: unfold 1600ms var(--ease-out) both;
}

.leaves__blade--1 {
  --to: -52deg;
  animation-delay: 300ms;
}

.leaves__blade--2 {
  --to: 34deg;
  animation-delay: 420ms;
}

.leaves__blade--3 {
  --to: -6deg;
  animation-delay: 540ms;
}

.leaves__vein {
  fill: none;
  stroke: #f6f5f0;
  stroke-width: 3;
  stroke-linecap: round;
  opacity: 0.55;
}

@keyframes unfold {
  from {
    transform: translate(200px, 420px) rotate(0deg) scale(0.4);
    opacity: 0;
  }
  to {
    transform: translate(200px, 420px) rotate(var(--to)) scale(1);
    opacity: 1;
  }
}
</style>
