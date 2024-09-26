<template>
  <div class="sidebar">
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.sidebar {
  height: 100%;
  width: 250px;
  position: fixed;
  top: 60px;
  left: 0;
  background-color: #333;
  padding-top: 20px;
  overflow-x: hidden;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  padding: 8px 16px;
  text-align: left;
}

.sidebar ul li a {
  color: white;
  text-decoration: none;
  display: block;
  transition: 0.3s;
}

.sidebar ul li a:hover {
  background-color: #575757;
}
</style>