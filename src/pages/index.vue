<template>
  <div id="app">
    <Navbar />
    <div class="main-content">
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
    IdleGame,
  },
});
</script>

<style scoped>
.idle-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 60px;
}

.idle-game button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
}

.tasks-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  align-items: center; 
  margin-top: 20px;
}

.task {
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  text-align: left;
  border: 1px solid #ddd;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 400px;
  height: 300px;
  margin: 10px;
}

.task h3 {
  margin-top: 0;
}

.task p {
  margin-bottom: 0;
}

.loading-bar {
  margin-top: 10px;
  width: 100%;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.loading-bar-progress {
  width: 100%;
  height: 100%;
  background-color: #4caf50;
  transition: width 0.1s linear;
}

@keyframes loading {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
