<template>
  <div class="idle-game">
    <h1>Idle Developer</h1>
    <button @click="incrementSkills">Write a line of code</button>
    <div></div>
    
    
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
      <div class="loading-bar">
        <div class="loading-bar-progress" :style="{ width: taskInProgress ? progressPercentage + '%' : '0%' }"></div>
      </div>
    </div>
    <div class="task">

      <h3>Shop</h3>
      <p>Buy Mentor Cost:  {{ getMentorCost() }}  coins <button @click="buyMentor"> Buy </button> </p>
      <p>Energy drink (2x Efficiency for 1min.) Cost: {{ drinkMonsterPrice }} coins <button @click="drinkMonster">Buy</button></p> 
      <p>Study Group (2x Experience for 1min.) Cost: {{ drinkMonsterPrice }} coins <button @click="activateDoubleExperience">Buy</button></p> 
    </div>
    <div class="task">

      <h3>Overview</h3>
      <p>{{ mentors }} Mentors are giving {{ mentorsExperiencePerSecond }} Experience per second </p>
      <p v-if="monsterDrinkTimeLeft > 0">Energy Drink Time Remaining: {{ monsterDrinkTimeLeft }} seconds</p>
      <p v-if="doubleExperienceTimeLeft > 0">Study Group Time Remaining: {{ doubleExperienceTimeLeft }} seconds</p>

    </div>
     <div class="task">

      <h3>Unlocks</h3>
      <p v-if="!autoStartPurchased">Auto-start Tasks Cost: 200 coins <button @click="toggleAutoStart">Buy</button></p>
      <p v-else>Auto-start Tasks <button @click="toggleAutoStart">{{ autoStartEnabled ? 'Disable' : 'Enable' }}</button></p>
    </div>
  </div>
  
</template>

<script lang="ts" setup>
import { useSkills } from '~/composables/useSkills';
const taskRewardCoins = computed(() => Math.floor((taskReward.value + 3 * reputation.value)));
const drinkMonsterPrice = computed(() => Math.floor((taskReward.value + 2 * reputation.value)));
const mentorsExperiencePerSecond = computed(() => {if (doubleExperienceTimeLeft.value > 0) { return incrementPerSecond.value * 2 } else { return incrementPerSecond.value }});
const { doubleExperienceTimeLeft, autoStartPurchased, toggleAutoStart, autoStartEnabled, startTask, monsterDrinkTimeLeft, drinkMonster, taskReward, taskCompletionTime, incrementPerSecond, mentors, incrementSkills, getMentorCost, buyMentor, taskInProgress, currentTask, experienceRequired, skills, remainingTime, coins, reputation, activateDoubleExperience } = useSkills();

const progressPercentage = computed(() => {
  if (!taskInProgress.value) return 0;
  const totalTime = taskCompletionTime.value / 1000;
  const timeLeft = remainingTime.value;
  return ((totalTime - timeLeft) / totalTime) * 100;
});

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
  flex-wrap: wrap;
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