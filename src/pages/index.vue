<template>
  <div id="app">
    <Navbar />
    <div class="main-content">
      <Sidebar />
      <div class="content">
        <IdleGame />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import IdleGame from '@/components/IdleGame.vue';
import '@/assets/styles/global.css';

export default defineComponent({
  components: {
    Navbar,
    Sidebar,
    IdleGame,
  },
});
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main-content {
  display: flex;
  flex: 1;
}
.content {
  margin-left: 250px;
  padding: 20px;
  width: 100%;
}
</style>