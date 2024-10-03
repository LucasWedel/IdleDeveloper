import { ref, onMounted, onUnmounted, computed } from 'vue';

const skills = ref(0);
const mentors = ref(0);
const incrementPerSecond = ref(0);
const coins = ref(0);
const reputation = ref(0); 
const taskInProgress = ref(false);
const taskReward = ref(10); 
const currentTask = ref('');
const experienceRequired = ref(10); 
const remainingTime = ref(0); 
const tasksCompleted = ref(0);
const originalTaskCompletionTime = ref(5000);
const autoStartEnabled = ref(false);
const autoStartPurchased = ref(false);
const doubleExperienceActive = ref(false);

const tasks = [
  'Develop a new feature for the user profile page',
  'Optimize the database queries to reduce load times',
  'Investigate and fix a critical memory leak in production',
  'Write unit tests to improve code reliability and safety',
  'Refactor legacy code to enhance performance and clarity',
  'Create a dashboard to display user activity and stats',
  'Update the API to handle new data input formats',
  'Resolve security vulnerabilities in the authentication flow',
  'Design a responsive layout for the mobile user interface',
  'Conduct a performance review of the main application code'
];

const taskCompletionTime = computed(() => {
  if (monsterDrinkTimeLeft.value > 0) {
    return originalTaskCompletionTime.value / 2;
  }
  return originalTaskCompletionTime.value;
});

const incrementSkills = () => {
  if (doubleExperienceActive.value) {
    skills.value += 1 * 2;
  } else {
    skills.value += 1;
  }
};

const getMentorCost = () => {
  return Math.floor(20 * Math.pow(1.2, mentors.value)); 
};

const buyMentor = () => {
  const mentorCost = getMentorCost();
  if (coins.value >= mentorCost) {
    coins.value -= mentorCost;
    incrementPerSecond.value += 1 + Math.floor(incrementPerSecond.value * 0.3);
    mentors.value += 1;
  }
};

const selectRandomTask = () => {
  const randomIndex = Math.floor(Math.random() * tasks.length);
  currentTask.value = tasks[randomIndex];
  originalTaskCompletionTime.value = 5000 + reputation.value * 1000 / 2;
};

let intervalId: number | undefined;

const startIncrementing = () => {
  if (intervalId) return; 
  intervalId = window.setInterval(() => {
    if (doubleExperienceActive.value) {
      skills.value += incrementPerSecond.value * 2;
    } else {
      skills.value += incrementPerSecond.value;
    }
    
  }, 1000);
};

const stopIncrementing = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = undefined;
  }
};

const monsterDrinkTimeLeft = ref(0);
let monsterDrinkInterval: NodeJS.Timeout | undefined;
let taskInterval: NodeJS.Timeout | undefined;

const doubleExperienceTimeLeft = ref(0);
let doubleExperienceInterval: NodeJS.Timeout | undefined;


export function useSkills() {

  watch(
    () => skills.value,
    (newSkills) => {
      if (autoStartEnabled.value && newSkills >= experienceRequired.value && !taskInProgress.value) {
        startTask();
      }
    }
  );

  function toggleAutoStart() {
    if (!autoStartPurchased.value) {
      if (coins.value >= 200) {
        coins.value -= 200;
        autoStartPurchased.value = true;
        autoStartEnabled.value = true;
      } else {
        alert('Not enough coins to purchase auto-start.');
      }
    } else {
      autoStartEnabled.value = !autoStartEnabled.value;
    }
  }

  onMounted(() => {
    startIncrementing();
    selectRandomTask(); 
  });

  onUnmounted(() => {

  });

  function activateDoubleExperience() {
    if (doubleExperienceTimeLeft.value > 0) return;
    if (coins.value >= Math.floor((taskReward.value + 2 * reputation.value) / 2)) {
      coins.value -= Math.floor((taskReward.value + 2 * reputation.value) / 2);
      doubleExperienceActive.value = true;
      doubleExperienceTimeLeft.value = 60;
      clearInterval(doubleExperienceInterval);
      doubleExperienceInterval = setInterval(() => {
        if (doubleExperienceTimeLeft.value > 0) {
          doubleExperienceTimeLeft.value--;
        } else {
          doubleExperienceActive.value = false;
          clearInterval(doubleExperienceInterval);
        }
      }, 1000);
    }
  }

  function drinkMonster() {
    if (monsterDrinkTimeLeft.value > 0) return; 
    if (coins.value >= Math.floor((taskReward.value + 2 * reputation.value))) {
      coins.value -= Math.floor((taskReward.value + 2 * reputation.value));
      monsterDrinkTimeLeft.value = 60;
      clearInterval(monsterDrinkInterval);
      monsterDrinkInterval = setInterval(() => {
        if (monsterDrinkTimeLeft.value > 0) {
          monsterDrinkTimeLeft.value--;
        } else {
          clearInterval(monsterDrinkInterval);
        }
      }, 1000);
    }
  }

  function startTask() {
    if (!taskInProgress.value && skills.value >= experienceRequired.value) {
      taskInProgress.value = true;
      clearInterval(taskInterval);
      remainingTime.value = taskCompletionTime.value / 1000;
      taskInterval = setInterval(() => {
        remainingTime.value -= 0.1;
        if (remainingTime.value <= 0) {
          clearInterval(taskInterval);
          if (reputation.value < 1) {
            coins.value += taskReward.value;
          } else {
            coins.value += taskReward.value + 3 * reputation.value;
          }
          reputation.value += 1;
          taskInProgress.value = false;
          selectRandomTask();
          experienceRequired.value = Math.floor(experienceRequired.value * 1.3);
          if (autoStartEnabled.value) {
            startTask();
          }
        }
      }, 100);
    }
  }

  return {
    autoStartPurchased,
    toggleAutoStart,
    autoStartEnabled,
    taskReward,
    skills,
    mentors,
    coins,
    reputation, 
    incrementSkills,
    getMentorCost,
    buyMentor,
    taskInProgress,
    currentTask,
    experienceRequired,
    remainingTime,
    taskCompletionTime,
    incrementPerSecond,
    drinkMonster,
    monsterDrinkTimeLeft,
    startTask,
    activateDoubleExperience,
    doubleExperienceTimeLeft,
  };
}