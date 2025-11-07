<template>
  <div class="text-center py-16">
    <div class="text-6xl mb-4"><slot name="icon">ℹ️</slot></div>
    <h3 class="text-2xl font-bold text-gray-800 mb-2">
      <slot name="title">Nada por aqui</slot>
    </h3>
    <p class="text-gray-600"><slot /></p>
  </div>
</template>
