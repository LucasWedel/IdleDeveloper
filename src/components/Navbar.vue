<template>
  <nav class="navbar">
    <div class="left-section">
      <h1>Idle Developer</h1>
    </div>
    <div class="left-section">
      <p>Experience: {{ skills }}</p>
    </div>
    <div class="left-section">
      <p>Coins: {{ coins }}</p>
    </div>
    <div class="left-section">
      <p>Reputation: {{ coins }}</p>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useSkills } from '~/composables/useSkills';
const { skills, coins } = useSkills();
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
  font-family: 'Optima', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  z-index: 1000;
}
.left-section {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}
.center-section {
  flex: 1;
  display: flex;
  justify-content: center;
}
.right-section {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
</style>