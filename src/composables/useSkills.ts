import { ref, onMounted, onUnmounted } from 'vue';

const skills = ref(0);
const mentors = ref(0);
const incrementPerSecond = ref(0);
const coins = ref(0);
const reputation = ref(0); 
const taskInProgress = ref(false);
const taskCompletionTime = ref(5000); 
const taskReward = ref(10); 
const currentTask = ref('');
const experienceRequired = ref(10); 
const remainingTime = ref(0); 

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


const incrementSkills = () => {
  skills.value += 1;
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
};

const completeTask = () => {
  if (!taskInProgress.value && skills.value >= experienceRequired.value) {
    taskInProgress.value = true;
    remainingTime.value = taskCompletionTime.value / 1000;
    const interval = setInterval(() => {
      remainingTime.value -= 1;
      if (remainingTime.value <= 0) {
        clearInterval(interval);
        if (reputation.value < 1) {
          coins.value += taskReward.value;
        } else { coins.value += taskReward.value + 3*reputation.value; }        
        reputation.value += 1
        taskInProgress.value = false;
        selectRandomTask();
        experienceRequired.value = Math.floor(experienceRequired.value * 1.3); 
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

const monsterDrinkTimeLeft = ref(0);
let monsterDrinkInterval: NodeJS.Timeout | undefined;
let taskInterval: NodeJS.Timeout | undefined;

export function useSkills() {
  onMounted(() => {
    startIncrementing();
    selectRandomTask(); 
  });

  onUnmounted(() => {
    stopIncrementing();
    clearInterval(monsterDrinkInterval);
    clearInterval(taskInterval);
  });
  const originalTaskCompletionTime = ref(taskCompletionTime.value);

  function drinkMonster() {
    if (monsterDrinkTimeLeft.value > 0) return; 
    if (coins.value >= Math.floor((taskReward.value + 2 * reputation.value) / 2)) {
      coins.value -= Math.floor((taskReward.value + 2 * reputation.value) / 2);
      monsterDrinkTimeLeft.value = 60;
      clearInterval(monsterDrinkInterval);
      monsterDrinkInterval = setInterval(() => {
        if (monsterDrinkTimeLeft.value > 0) {
          monsterDrinkTimeLeft.value--;
          taskCompletionTime.value = originalTaskCompletionTime.value / 2; 
        } else {
          clearInterval(monsterDrinkInterval);
          taskCompletionTime.value = originalTaskCompletionTime.value; 
        }
      }, 1000);
    }
  }

  function startTask() {
    if (!taskInProgress.value && skills.value >= experienceRequired.value) {
      taskInProgress.value = true;
      remainingTime.value = taskCompletionTime.value / 1000;
      clearInterval(taskInterval);
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
        }
      }, 100);
    }
  }

  return {
    taskReward,
    skills,
    mentors,
    coins,
    reputation, 
    incrementSkills,
    getMentorCost,
    buyMentor,
    taskInProgress,
    completeTask,
    currentTask,
    experienceRequired,
    remainingTime,
    taskCompletionTime,
    incrementPerSecond,
    drinkMonster,
    monsterDrinkTimeLeft,
    startTask 
  };
}