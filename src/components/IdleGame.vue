<template>
  <div class="idle-game">
    <h2>Idle Developer</h2>
    <button @click="incrementSkills">Write a line of code</button>
    <div></div>
    <button @click="buyMentor">Buy Mentor (Cost: {{ getMentorCost() }} coins)</button>
    
  </div>
  <div class="tasks-container">
    <div class="task">
      <h3>Task</h3>
      <p>{{ currentTask }}</p>
      <p>Experience Required: {{ experienceRequired + 2*reputation }}</p>
      <p>Reward: {{ taskRewardCoins }} Coins</p>
      <p v-if="!taskInProgress">Time Required: {{ taskCompletionTime / 1000 }} seconds</p>
      <p v-if="taskInProgress">Time Remaining: {{ remainingTime.toFixed(1) }} seconds</p>
      <p></p>
      <button @click="startTask" :disabled="taskInProgress || skills < experienceRequired">Complete Task</button>
      <div v-if="taskInProgress" class="loading-bar">
        <div class="loading-bar-progress" :style="{ animationDuration: (taskCompletionTime / 1000) + 's' }"></div>
      </div>
    </div>
    <div class="task">

      <h3>Boosts</h3>
      <p>Energy drink (2x Efficiency for 1min.) Cost: {{ drinkMonsterPrice }} Coins <button @click="drinkMonster">Buy</button></p>   
    </div>
    <div class="task">

      <h3>Overview</h3>
      <p>{{ mentors }} Mentors are giving {{ incrementPerSecond }} Experience per second </p>
      <p v-if="monsterDrinkTimeLeft > 0">Monster Drink Time Remaining: {{ monsterDrinkTimeLeft }} seconds</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSkills } from '~/composables/useSkills';
const taskRewardCoins = computed(() => Math.floor((taskReward.value + 3 * reputation.value)));
const drinkMonsterPrice = computed(() => Math.floor((taskReward.value + 2 * reputation.value)/2));

const { startTask, monsterDrinkTimeLeft, drinkMonster, taskReward, taskCompletionTime, incrementPerSecond, mentors, incrementSkills, getMentorCost, buyMentor, taskInProgress, completeTask, currentTask, experienceRequired, skills, remainingTime, coins, reputation } = useSkills();
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
.tasks-container {
  display: flex;
  justify-content: space-around; 
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
  margin: 0 10px; 
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
  animation: loading linear;
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