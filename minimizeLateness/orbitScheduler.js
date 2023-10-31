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

  // Adicione a função para acessar simulateOrbits diretamente
  getScheduler() {
    return {
      simulateOrbits: this.simulateOrbits.bind(this),
    };
  }
}

module.exports = OrbitScheduler;
