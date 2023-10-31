const ResourceManagement = require('./resourceManagement');
const OrbitScheduler = require('./orbitScheduler');
const MissionTrajectory = require('./missionTrajectory');
const LaunchPlanner = require('./launchPlanner');

class SpaceMissionCoordinator {
  constructor() {
    this.launchPlanner = new LaunchPlanner();
    this.missionTrajectories = [];
    this.orbitScheduler = new OrbitScheduler();
    this.resourceManagers = [];
  }

  // Função para planejar e agendar missões
  planAndScheduleMissions(missionDataRandom) {
    missionDataRandom.forEach((mission) => {
      const { name, orbitRadius, angularSpeed, initialEnergy, launchDateTime  } = mission;

      // Agendar o lançamento com base nas informações da missão
      this.launchPlanner.scheduleLaunch(name, launchDateTime);

      // Calcular e agendar trajetória e órbita
      const trajectory = new MissionTrajectory(name, 0, 0);
      trajectory.addCoordinate(orbitRadius, 0);
      this.missionTrajectories.push(trajectory);
      this.orbitScheduler.scheduleOrbit(name, orbitRadius, angularSpeed);

      // Criar e gerenciar recursos com base na energia inicial
      const resourceManager = new ResourceManagement(name, initialEnergy);
      this.resourceManagers.push(resourceManager);
    });
  }

  // Função para calcular o atraso de uma missão
  calculateLateness(mission, currentTime) {
    const missionLaunchTime =  new Date(mission.launchDateTime);
    const missionLateness = missionLaunchTime - currentTime;
    return missionLateness;
  }

  // Função para agendar missões com base no algoritmo "Scheduling to Minimize Lateness"
  scheduleMissionsToMinimizeLateness() {
    const result = {
      messages: [],  // Array para armazenar mensagens sobre cada missão
      totalLateness: 0  // Variável para o atraso total acumulado
    };
  
    // Ordenar missões por data de lançamento
    const sortedMissions = this.missionTrajectories.slice().sort((a, b) => {
      return new Date(a.launchDateTime) - new Date(b.launchDateTime);
    });

  
    let currentTime = new Date(); // Iniciar no tempo atual
  
    for (let i = 0; i < sortedMissions.length; i++) {
      const mission = sortedMissions[i];
      const resourceManager = this.resourceManagers.find((manager) => manager.name === mission.name);
  
      // Calcular o atraso da missão usando a função calculateLateness
      const matchingMissionData = missionDataRandom.find((data) => data.name === mission.spacecraftName);
      console.log("TEMPO AGORA: " + currentTime)
      const lateness = this.calculateLateness(
        {
          name: mission.name,
          launchDateTime: matchingMissionData.launchDateTime
        },
        currentTime
      );
  
      console.log(`Missão ${matchingMissionData.name} - Atraso: ${lateness}`); // Adicione esta linha para depuração
  
      if (resourceManager.energy >= lateness) {
        result.messages.push(`Missão ${mission.spacecraftName} atrasada`);
      } else {
        result.messages.push(`Missão ${mission.spacecraftName} realizada no tempo esperado`);
        // Não há recursos suficientes, atrasar a missão
        
      }
      // Adicionar o atraso ao total
      result.totalLateness += lateness;
    }
    return result;
  }

  getRandomMissionData() {
    const getRandomLaunchDateTime = () => {
      const year = 2023;
      const month = 10; // Outubro
      const day = Math.floor(Math.random() * 2) + 30; // 30 ou 31
      const hours = Math.floor(Math.random() * 24);
      const minutes = Math.floor(Math.random() * 60);
      const seconds = Math.floor(Math.random() * 60);
  
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
  
    const getRandomOrbitRadius = () => Math.floor(Math.random() * 100) + 100;
    const getRandomAngularSpeed = () => (2 * Math.PI) / (Math.floor(Math.random() * 100) + 100);
    const getRandomInitialEnergy = () => Math.floor(Math.random() * 150) + 100;
  
    const missionData = [
      { name: 'Satélite A', launchDateTime: getRandomLaunchDateTime(), orbitRadius: getRandomOrbitRadius(), angularSpeed: getRandomAngularSpeed(), initialEnergy: getRandomInitialEnergy() },
      { name: 'Sonda B', launchDateTime: getRandomLaunchDateTime(), orbitRadius: getRandomOrbitRadius(), angularSpeed: getRandomAngularSpeed(), initialEnergy: getRandomInitialEnergy() },
      { name: 'Rover C', launchDateTime: getRandomLaunchDateTime(), orbitRadius: getRandomOrbitRadius(), angularSpeed: getRandomAngularSpeed(), initialEnergy: getRandomInitialEnergy() },
      { name: 'Orbitador D', launchDateTime: getRandomLaunchDateTime(), orbitRadius: getRandomOrbitRadius(), angularSpeed: getRandomAngularSpeed(), initialEnergy: getRandomInitialEnergy() },
    ];
  
    return missionData;
  }
  
}


  
const coordinator = new SpaceMissionCoordinator();
const missionDataRandom = coordinator.getRandomMissionData();
coordinator.planAndScheduleMissions(missionDataRandom);
const result = coordinator.scheduleMissionsToMinimizeLateness(); // Chame a função de agendamento de missões para minimizar a latência
console.log('\nResultados da simulação:\n');
console.log(`Atraso total: ${result.totalLateness}\n\n${result.messages.join('\n')}`);

