class LaunchPlanner {
    constructor() {
      this.scheduledLaunches = [];
    }
  
    // Função para agendar um lançamento de foguete com data e hora aleatórias
    scheduleLaunch(rocketName) {
      const launchDate = new Date();
      launchDate.setHours(Math.floor(Math.random() * 24)); // Hora aleatória
      launchDate.setMinutes(Math.floor(Math.random() * 60)); // Minuto aleatório
  
      // Simulação de condições climáticas (chuva aleatória)
      const isRainy = Math.random() < 0.3; // 30% de chance de chuva
  
      const launch = { rocketName, launchDate, isRainy };
      this.scheduledLaunches.push(launch);
  
      console.log(`Lançamento do foguete ${rocketName} agendado para ${launchDate.toLocaleString()}`);
      if (isRainy) {
        console.log(`Atenção: Possibilidade de chuva no momento do lançamento.`);
      }
    }
  
    // Função para listar todos os lançamentos agendados
    listScheduledLaunches() {
      console.log('\nLançamentos Agendados:');
      this.scheduledLaunches.forEach((launch, index) => {
        const conditions = launch.isRainy ? 'Possibilidade de chuva' : 'Condições ideais';
        console.log(`${index + 1}. Foguete: ${launch.rocketName} - Data: ${launch.launchDate.toLocaleString()} - ${conditions}`);
      });
    }
  }
  
  // Exemplo de uso da classe LaunchPlanner
  const planner = new LaunchPlanner();
  
  planner.scheduleLaunch('Foguete A');
  planner.scheduleLaunch('Foguete B');
  planner.scheduleLaunch('Foguete C');
  
  planner.listScheduledLaunches();
  
  module.exports = LaunchPlanner;