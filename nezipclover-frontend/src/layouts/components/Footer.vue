<template>
  <div class="w-100 h-100 d-flex align-center justify-space-between">
    <!-- π Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      νμ΄μ λ΄μ§ μ°ΎκΈ°
      <VIcon
        icon="mdi-heart-outline"
        color="error"
        size="1.25rem"
        class="mx-1"
      />
      By <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >NezipClover</a>
    </span>
    <!-- π Footer: right content -->

  </div>
</template>
