class LaunchPlanner {
  constructor() {
    this.scheduledLaunches = [];
  }

  // Função para agendar um lançamento de foguete com data e hora especificadas
  scheduleLaunch(spacecraftName, launchDateTime) {
  // Verificar se launchDateTime é uma string no formato ISO 8601 e convertê-la para um objeto Date
  if (typeof launchDateTime === 'string') {
    launchDateTime = new Date(launchDateTime);
  }

  // Verificar se launchDateTime é um objeto Date
  if (!(launchDateTime instanceof Date)) {
    throw new Error('A data de lançamento deve ser uma instância válida de Date.');
  }

  // Simulação de condições climáticas (chuva aleatória)
  const isRainy = Math.random() < 0.3; // 30% de chance de chuva

  const launch = { spacecraftName, launchDateTime, isRainy };
  this.scheduledLaunches.push(launch);

  console.log(`Lançamento da espaçonave ${spacecraftName} agendado para ${launchDateTime.toLocaleString()}`);
  if (isRainy) {
    console.log(`Atenção: Possibilidade de chuva no momento do lançamento.`);
  }
}


  // Função para listar todos os lançamentos agendados
  listScheduledLaunches() {
    console.log('\nLançamentos Agendados:');
    this.scheduledLaunches.forEach((launch, index) => {
      const conditions = launch.isRainy ? 'Possibilidade de chuva' : 'Condições ideais';
      console.log(`${index + 1}. Espaçonave: ${launch.spacecraftName} - Data: ${launch.launchDateTime.toLocaleString()} - ${conditions}`);
    });
    return this.scheduledLaunches;
  }
}

module.exports = LaunchPlanner;
