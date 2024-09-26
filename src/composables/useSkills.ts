import { ref, onMounted, onUnmounted } from 'vue';

const skills = ref(0);
const upgrades = ref(0);
const incrementPerSecond = ref(0);
const coins = ref(0);
const taskInProgress = ref(false);
const taskCompletionTime = ref(5000);
const taskReward = ref(10);
const currentTask = ref('');
const experienceRequired = ref(10); 
const remainingTime = ref(0); 

const tasks = [
  'Program an app',
  'Create an AI',
  'Fix a bug',
  'Write documentation',
  'Design a database',
  'Optimize performance',
  'Implement a feature',
  'Review code',
  'Test the application',
  'Deploy to production'
];

const incrementSkills = () => {
  skills.value += 1;
};

const getUpgradeCost = () => {
  return Math.floor(50 * Math.pow(1.1, upgrades.value)); 
};

const buyUpgrade = () => {
  const cost = getUpgradeCost();
  if (coins.value >= cost) {
    coins.value -= cost;
    upgrades.value += 1;
    incrementPerSecond.value += 1;
  }
};

const selectRandomTask = () => {
  const randomIndex = Math.floor(Math.random() * tasks.length);
  currentTask.value = tasks[randomIndex];
};

const completeTask = () => {
  if (!taskInProgress.value && skills.value >= experienceRequired.value) {
    taskInProgress.value = true;
    remainingTime.value = taskCompletionTime.value / 1000;
    const interval = setInterval(() => {
      remainingTime.value -= 1;
      if (remainingTime.value <= 0) {
        clearInterval(interval);
        coins.value += taskReward.value;
        taskInProgress.value = false;
        selectRandomTask();
        experienceRequired.value = Math.floor(experienceRequired.value * 1.4); 
      }
    }, 1000);
  }
};

let intervalId: number | undefined;

const startIncrementing = () => {
  if (intervalId) return; 
  intervalId = window.setInterval(() => {
    skills.value += incrementPerSecond.value;
  }, 1000);
};

const stopIncrementing = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = undefined;
  }
};

export function useSkills() {
  onMounted(() => {
    startIncrementing();
    selectRandomTask(); 
  });

  onUnmounted(() => {
    stopIncrementing();
  });

  return {
    skills,
    upgrades,
    coins,
    incrementSkills,
    buyUpgrade,
    getUpgradeCost,
    taskInProgress,
    completeTask,
    currentTask,
    experienceRequired,
    remainingTime,
    taskCompletionTime
  };
}