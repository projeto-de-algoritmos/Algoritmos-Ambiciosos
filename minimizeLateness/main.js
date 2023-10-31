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
      console.log(mission);
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
      console.log('Status das Missões:');
      // Imprimir todas as mensagens após o processamento das missões
      result.messages.forEach((message, index) => {
        console.log(`${index + 1}. ${message}`);
      });
    }
  }

  const missionData = [
    { name: 'Mission A', launchTime: '2023-11-01', orbitRadius: 100, angularSpeed: (2 * Math.PI) / 200, initialEnergy: 200 },
    { name: 'Mission B', launchTime: '2023-11-15', orbitRadius: 120, angularSpeed: (2 * Math.PI) / 150, initialEnergy: 180 },
    { name: 'Mission C', launchTime: '2023-11-05', orbitRadius: 110, angularSpeed: (2 * Math.PI) / 220, initialEnergy: 210 },
    { name: 'Mission D', launchTime: '2023-11-20', orbitRadius: 90, angularSpeed: (2 * Math.PI) / 180, initialEnergy: 190 },
    { name: 'Mission E', launchTime: '2023-11-10', orbitRadius: 130, angularSpeed: (2 * Math.PI) / 170, initialEnergy: 175 },
    { name: 'Mission F', launchTime: '2023-11-25', orbitRadius: 95, angularSpeed: (2 * Math.PI) / 190, initialEnergy: 205 },
    { name: 'Mission G', launchTime: '2023-11-12', orbitRadius: 115, angularSpeed: (2 * Math.PI) / 160, initialEnergy: 195 },
    { name: 'Mission H', launchTime: '2023-11-08', orbitRadius: 125, angularSpeed: (2 * Math.PI) / 210, initialEnergy: 215 },
    { name: 'Mission I', launchTime: '2023-11-17', orbitRadius: 105, angularSpeed: (2 * Math.PI) / 240, initialEnergy: 225 },
    { name: 'Mission J', launchTime: '2023-11-22', orbitRadius: 135, angularSpeed: (2 * Math.PI) / 230, initialEnergy: 230 },
  ];

const coordinator = new SpaceMissionCoordinator();
coordinator.planAndScheduleMissions(missionData);
coordinator.scheduleMissionsToMinimizeLateness(); // Chame a função de agendamento de missões para minimizar a latência