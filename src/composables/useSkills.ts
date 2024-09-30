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
        } else { coins.value += taskReward.value + 2*reputation.value; }        
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
    incrementPerSecond
  };
}