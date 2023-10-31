class OrbitScheduler {
  constructor(planetRadius) {
    this.planetRadius = planetRadius;
    this.spacecrafts = [];
  }

  // Função para agendar a órbita de uma espaçonave
  scheduleOrbit(spacecraftName, orbitRadius, angularSpeed) {
    const spacecraft = {
      name: spacecraftName,
      orbitRadius,
      angularSpeed,
      currentAngle: 0,
    };

    this.spacecrafts.push(spacecraft);
  }

  // Função para simular o movimento das espaçonaves
  simulateOrbits() {
    const desiredOrbits = 5; // Número de órbitas desejadas
    const desiredDuration = 100; // Duração desejada em milissegundos (10 segundos)

    // Calcule a nova velocidade angular com base nas órbitas desejadas e duração
    const angularSpeed = (2 * Math.PI * desiredOrbits) / (desiredDuration / 100); // Converta para radianos por segundo

    for (const spacecraft of this.spacecrafts) {
      spacecraft.angularSpeed = angularSpeed; // Aplique a nova velocidade angular
      spacecraft.currentAngle += spacecraft.angularSpeed;
      const x = spacecraft.orbitRadius * Math.cos(spacecraft.currentAngle);
      const y = spacecraft.orbitRadius * Math.sin(spacecraft.currentAngle);

      console.log(`Espaçonave ${spacecraft.name} - Coordenadas: (${x}, ${y})`);
    }
  }
}

// Exemplo de uso da classe OrbitScheduler
const planetRadius = 100;
const scheduler = new OrbitScheduler(planetRadius);

// Agende órbitas com uma velocidade inicial (pode ser ajustada posteriormente)
scheduler.scheduleOrbit('Satélite A', 100, (2 * Math.PI) / 200);
scheduler.scheduleOrbit('Sonda B', 120, (2 * Math.PI) / 150);
scheduler.scheduleOrbit('Rover C', 140, (2 * Math.PI) / 100);
scheduler.scheduleOrbit('Orbitador D', 160, (2 * Math.PI) / 250);

console.log('Simulação de Órbitas:');
const simulationInterval = 100; // Intervalo de simulação em milissegundos
let desiredDuration = 100; // Defina o tempo desejado para a simulação
let elapsedTime = 0;

// Execute a simulação até que o tempo limite seja alcançado
const simulationTimer = setInterval(() => {
  scheduler.simulateOrbits();
  elapsedTime += simulationInterval;

  if (elapsedTime >= desiredDuration) {
    clearInterval(simulationTimer); // Pare a simulação após 10 segundos
  }
}, simulationInterval);

module.exports = OrbitScheduler;