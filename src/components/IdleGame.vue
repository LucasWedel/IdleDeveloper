<template>
  <div class="idle-game">
    <h2>Idle Developer</h2>
    <button @click="incrementSkills">Write a line of code</button>
    <button @click="buyMentor">Buy Mentor (Cost: {{ getMentorCost() }} coins)</button>
    <p>Mentors: {{ mentors }}   Experience per second: {{ incrementPerSecond }}</p>
  </div>
  <div class="task">
    <h3>Task</h3>
    <p>{{ currentTask }}</p>
    <p>Experience Required: {{ experienceRequired }}</p>
    <p v-if="!taskInProgress">Time Required: {{ taskCompletionTime / 1000 }} seconds</p>
    <p v-if="taskInProgress">Time Remaining: {{ remainingTime }} seconds</p>
    <button @click="completeTask" :disabled="taskInProgress || skills < experienceRequired">Complete Task</button>
    <div v-if="taskInProgress" class="loading-bar">
      <div class="loading-bar-progress"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSkills } from '~/composables/useSkills';

const { taskCompletionTime, incrementPerSecond, mentors, incrementSkills, getMentorCost, buyMentor, taskInProgress, completeTask, currentTask, experienceRequired, skills, remainingTime, coins, reputation } = useSkills();
</script>

<style scoped>
.idle-game {
  text-align: center;
  margin-top: 60px;
}
.idle-game button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
}
.task {
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  text-align: left;
  border: 1px solid #ddd;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 300px; 
  margin: 0 auto; 
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
  animation: loading 5s linear;
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