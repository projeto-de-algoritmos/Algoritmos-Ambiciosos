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
      for (const spacecraft of this.spacecrafts) {
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
  
  scheduler.scheduleOrbit('Satélite A', planetRadius + 20, (2 * Math.PI) / 200);
  scheduler.scheduleOrbit('Sonda B', planetRadius + 40, (2 * Math.PI) / 150);
  scheduler.scheduleOrbit('Nave C', planetRadius + 60, (2 * Math.PI) / 100);
  
  console.log('Simulação de Órbitas:');
  setInterval(() => {
    scheduler.simulateOrbits();
  }, 1000);
  
  module.exports = OrbitScheduler;
