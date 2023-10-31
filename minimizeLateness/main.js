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
  planAndScheduleMissions(missionData) {
    missionData.forEach((mission) => {
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
    // Converter currentTime para o formato ISO 8601
    const currentTimeISO = currentTime.toISOString();
    
    // Converter launchDateTime para o formato ISO 8601
    const missionLaunchTimeISO = new Date(mission.launchDateTime).toISOString();
    
    // Calcular o atraso
    const missionLateness = new Date(missionLaunchTimeISO) - new Date(currentTimeISO);
    
    // Garantir que o atraso seja não negativo
    return Math.max(0, missionLateness);
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
      const lateness = this.calculateLateness(mission, currentTime);
  
      console.log(`Missão ${mission.spacecraftName} - Atraso: ${lateness}`); // Adicione esta linha para depuração
  
      // Verificar se há recursos disponíveis
      if (resourceManager.energy >= lateness) {
        // Recursos disponíveis, missão realizada no tempo esperado
        result.messages.push(`Missão ${mission.spacecraftName} realizada no tempo esperado`);
      } else {
        // Não há recursos suficientes, atrasar a missão
        result.messages.push(`Missão ${mission.spacecraftName} atrasada`);
      }
  
      // Atualizar o tempo atual
      currentTime = new Date(currentTime.getTime() + lateness);
  
      // Adicionar o atraso ao total
      result.totalLateness += lateness;
    }
    return result;
  }
  
}

// Exemplos de dados de missão (com informações de foguetes)
const missionData = [
  { name: 'Satélite A', launchDateTime: '2023-10-30T17:19:56', orbitRadius: 100, angularSpeed: (2 * Math.PI) / 200, initialEnergy: 250 },
  { name: 'Sonda B', launchDateTime: '2023-10-30T13:16:56', orbitRadius: 120, angularSpeed: (2 * Math.PI) / 150, initialEnergy: 120 },
  { name: 'Rover C', launchDateTime: '2023-10-30T17:18:56', orbitRadius: 140, angularSpeed: (2 * Math.PI) / 100, initialEnergy: 180 },
  { name: 'Orbitador D', launchDateTime: '2023-10-31T04:40:56', orbitRadius: 160, angularSpeed: (2 * Math.PI) / 250, initialEnergy: 260 },
];




const coordinator = new SpaceMissionCoordinator();
coordinator.planAndScheduleMissions(missionData);
const result = coordinator.scheduleMissionsToMinimizeLateness(); // Chame a função de agendamento de missões para minimizar a latência
console.log('Resultados da simulação:');
console.log(result);
