import { ref, onMounted, onUnmounted, computed } from 'vue';

const monsterDrinkTimeLeft = ref(0);
const infiniteStudyUnlocked = ref(false);
const infiniteMonsterUnlocked = ref(false);
const skills = ref(0);
const mentors = ref(0);
const incrementPerSecond = ref(0);
const coins = ref(0);
const reputation = ref(0); 
const taskInProgress = ref(false);
const taskReward = ref(10); 
const currentTask = ref('');
const teamTaskInProgress = ref(false);
const teamRemainingTime = ref(0);
const teamTaskReward = ref(0);
const teamTaskCompletionTime = ref(5000);
const teamCurrentTask = ref('');
const experienceRequired = ref(10); 
const remainingTime = ref(0); 
const tasksCompleted = ref(0);
const originalTaskCompletionTime = ref(5000);
const autoStartEnabled = ref(false);
const autoStartPurchased = ref(false);
const doubleExperienceActive = ref(false);
const companyUnlocked = ref(false);
const juniorDeveloper = ref(1);
const juniorDeveloperCost = ref(100);
const seniorDeveloper = ref(0);
const seniorDeveloperCost = ref(200);
const teamLeader = ref(0);
const teamLeaderCost = ref(400);
const teams = ref(0);
const juniorDevelopersSize = ref(1);
const seniorDevelopersSize = ref(0);
const teamLeadersSize = ref(0);

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

const buyJuniorDeveloper = () => { 
  if (coins.value >= juniorDeveloperCost.value) {
    coins.value -= juniorDeveloperCost.value;
    juniorDeveloper.value += 1;
    juniorDeveloperCost.value += 100;
  }
}

const buySeniorDeveloper = () => {
  if (juniorDeveloper.value >= 1 && coins.value >= seniorDeveloperCost.value) {
    coins.value -= seniorDeveloperCost.value;
    juniorDeveloper.value -= 1;
    seniorDeveloper.value += 1;
    seniorDeveloperCost.value += 200;
  }
}

const buyTeamLeader = () => {
  if (seniorDeveloper.value >= 1 && coins.value >= teamLeaderCost.value) {
    coins.value -= teamLeaderCost.value;
    seniorDeveloper.value -= 1;
    teamLeader.value += 1;
    teamLeaderCost.value += 400;
  }
}

const buyTeams = () => {
  if (teamLeader.value >= 1 && seniorDeveloper.value >= 2 && juniorDeveloper.value >= 3) {
    teamLeader.value -= 1;
    seniorDeveloper.value -= 2;
    juniorDeveloper.value -= 3;
    teams.value += 1;
  }
} 

const taskCompletionTime = computed(() => {
  if (monsterDrinkTimeLeft.value > 0 || infiniteMonsterUnlocked.value) {
    return originalTaskCompletionTime.value / 2;
  }
  return originalTaskCompletionTime.value;
});

const incrementSkills = () => {
  if (doubleExperienceActive.value || infiniteStudyUnlocked.value) {
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
  originalTaskCompletionTime.value = 5000 + Math.floor(Math.random() * 5000);
};

let intervalId: number | undefined;

const startIncrementing = () => {
  if (intervalId) return; 
  intervalId = window.setInterval(() => {
    if (doubleExperienceActive.value || infiniteStudyUnlocked.value) {
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




let monsterDrinkInterval: NodeJS.Timeout | undefined;
let taskInterval: NodeJS.Timeout | undefined;
let teamTaskInterval: NodeJS.Timeout | undefined;

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

  function unlockCompany() {
    if (coins.value >= 0) {
      coins.value -= 0;
      companyUnlocked.value = true;
    } else {
      alert('Not enough coins to unlock the company.');
    }
  }



  function infiniteStudy() {
    if (!infiniteStudyUnlocked.value) {
      if (coins.value >= 500) {
        coins.value -= 500;
        infiniteStudyUnlocked.value = true;
      } else {
        alert('Not enough coins to unlock infinite study.');
      }
    } 
  }

  function infiniteMonster() {
    if (!infiniteMonsterUnlocked.value) {
      if (coins.value >= 500) {
        coins.value -= 500;
        infiniteMonsterUnlocked.value = true;
      } else {
        alert('Not enough coins to unlock infinite energy drink.');
      }
    } 
  }

  function findJuniorSize() {
    juniorDevelopersSize.value = juniorDeveloper.value;

    let randomChance = Math.random();

    if (randomChance <= 0.25) {
      juniorDevelopersSize.value += 1;
    }

    if (juniorDevelopersSize.value < 1) {
      juniorDevelopersSize.value = 1;
    }
    return juniorDevelopersSize.value;
  }

  function findSeniorSize() {
    seniorDevelopersSize.value = seniorDeveloper.value;

    let randomChance = Math.random();

    if (randomChance <= 0.33) {
      seniorDevelopersSize.value += 1;
    }

    if (seniorDevelopersSize.value < 0) {
      seniorDevelopersSize.value = 0;
    }
    return seniorDevelopersSize.value;
  }

  function findLeaderSize() {
    teamLeadersSize.value = teamLeader.value;

    let randomChance = Math.random();

    if (randomChance <= 0.2) {
      teamLeadersSize.value += 1;
    }

    if (teamLeadersSize.value < 0) {
      teamLeadersSize.value = 0;
    }
    return teamLeadersSize.value;
  }

  function startTeamTask() { 

    teamTaskReward.value = juniorDevelopersSize.value * 100 + seniorDevelopersSize.value * 200 + teamLeadersSize.value * 400;

    if (!teamTaskInProgress.value && juniorDeveloper.value >= juniorDevelopersSize.value && seniorDeveloper.value >= seniorDevelopersSize.value && teamLeader.value >= teamLeadersSize.value) {
      teamTaskInProgress.value = true;
      clearInterval(teamTaskInterval);
      teamRemainingTime.value = teamTaskCompletionTime.value / 1000;
      teamTaskInterval = setInterval(() => {
        teamRemainingTime.value -= 0.1;
        if (teamRemainingTime.value <= 0) {
          clearInterval(teamTaskInterval); 
          coins.value += teamTaskReward.value;
          reputation.value += 10;
          skills.value += 500;
          teamTaskInProgress.value = false;
          selectRandomTask();   
          findJuniorSize();
          findSeniorSize();
          findLeaderSize();
          teamTaskReward.value = juniorDevelopersSize.value * 100 + seniorDevelopersSize.value * 200 + teamLeadersSize.value * 400;
        }
      }, 100);
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
            coins.value += taskReward.value + 3 * reputation.value + 2 * mentors.value;
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
    juniorDevelopersSize,
    seniorDevelopersSize,
    teamLeadersSize,
    startTeamTask,
    teamTaskInProgress,
    teamRemainingTime,
    teamTaskReward,
    teamTaskCompletionTime,
    teamCurrentTask,
    teamLeaderCost,
    seniorDeveloperCost,
    buyTeams,
    teams,
    buyJuniorDeveloper,
    buySeniorDeveloper,
    buyTeamLeader,
    juniorDeveloper,
    juniorDeveloperCost,
    seniorDeveloper,
    teamLeader,
    infiniteStudy,
    infiniteMonster,
    infiniteStudyUnlocked,
    infiniteMonsterUnlocked,
    unlockCompany,
    companyUnlocked,
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