<template>
  <nav class="navbar">
    <div class="left-section">
      <h1>Idle Developer</h1>
    </div>
    <div class="center-section">
      <p>Experience: {{ skills }}</p>
      <p>Coins: {{ coins }}</p>
      <p>Reputation: {{ reputation }}</p>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import { useSkills } from '~/composables/useSkills';
const { skills, coins, reputation } = useSkills();
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px; 
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: white;
}

.left-section {
  display: flex;
  align-items: center;
}

.center-section {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  gap: 300px;
}
</style>