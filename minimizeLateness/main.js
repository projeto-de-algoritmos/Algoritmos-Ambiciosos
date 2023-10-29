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
    // Ordenar missões por data de lançamento
    missionData.sort((a, b) => new Date(a.launchTime) - new Date(b.launchTime));

    missionData.forEach((mission) => {
      const { name, launchTime, orbitRadius, angularSpeed, initialEnergy } = mission;

      // Agendar o lançamento com base na data de lançamento
      this.launchPlanner.scheduleLaunch(name, launchTime);

      // Calcular e agendar trajetória e órbita
      const trajectory = new MissionTrajectory(name, 0, 0);
      trajectory.addCoordinate(orbitRadius, 0);
      this.missionTrajectories.push(trajectory);
      this.orbitScheduler.scheduleOrbit(name, orbitRadius, angularSpeed);

      // Criar e gerenciar recursos
      const resourceManager = new ResourceManagement(name, initialEnergy);
      this.resourceManagers.push(resourceManager);
    });
  }

  // Função para calcular o atraso de uma missão
  calculateLateness(mission, currentTime) {
    const launchTime = new Date(mission.launchTime);
    const timeDiff = currentTime - launchTime;
    return timeDiff < 0 ? 0 : timeDiff;
  }

    // Função para agendar missões com base no algoritmo "Scheduling to Minimize Lateness"
    scheduleMissionsToMinimizeLateness() {
      const result = {
        messages: [],  // Array para armazenar mensagens sobre cada missão
        totalLateness: 0  // Variável para o atraso total acumulado
      };
  
      // Ordenar missões por data de lançamento
      const sortedMissions = this.missionTrajectories.slice().sort((a, b) => {
        return new Date(a.launchTime) - new Date(b.launchTime);
      });
  
      let currentTime = new Date(); // Iniciar no tempo atual
  
      for (let i = 0; i < sortedMissions.length; i++) {
        const mission = sortedMissions[i];
        const resourceManager = this.resourceManagers[i];
  
        // Calcular o atraso da missão usando a função calculateLateness
        const lateness = this.calculateLateness(mission, currentTime);
  
        // Verificar se há recursos disponíveis
        if (resourceManager.energy >= lateness) {
          // Recursos disponíveis, missão realizada no tempo esperado
          result.messages.push(`Missão ${mission.name} realizada no tempo esperado`);
        } else {
          // Não há recursos suficientes, atrasar a missão
          result.messages.push(`Missão ${mission.name} atrasada`);
        }
  
        // Atualizar o tempo atual
        currentTime = new Date(currentTime.getTime() + lateness);
  
        // Adicionar o atraso ao total
        result.totalLateness += lateness;
      }
    }
  }

const missionData = [
  { name: 'Mission A', launchTime: '2023-11-01', orbitRadius: 100, angularSpeed: (2 * Math.PI) / 200, initialEnergy: 200 },
  { name: 'Mission B', launchTime: '2023-11-15', orbitRadius: 120, angularSpeed: (2 * Math.PI) / 150, initialEnergy: 180 },
  { name: 'Mission C', launchTime: '2023-11-05', orbitRadius: 110, angularSpeed: (2 * Math.PI) / 220, initialEnergy: 210 },
];

const coordinator = new SpaceMissionCoordinator();
coordinator.planAndScheduleMissions(missionData);
coordinator.scheduleMissionsToMinimizeLateness(); // Chame a função de agendamento de missões para minimizar a latência
