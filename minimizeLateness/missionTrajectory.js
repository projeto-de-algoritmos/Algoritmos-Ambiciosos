class MissionTrajectory {
    constructor(spacecraftName, startX, startY) {
      this.spacecraftName = spacecraftName;
      this.currentX = startX;
      this.currentY = startY;
      this.coordinates = [{ x: startX, y: startY }];
    }
  
    // Função para adicionar um ponto à trajetória da espaçonave
    addCoordinate(x, y) {
      this.coordinates.push({ x, y });
      this.currentX = x;
      this.currentY = y;
    }
  
    // Função para listar a trajetória da espaçonave
    listTrajectory() {
      console.log(`Trajetória da espaçonave ${this.spacecraftName}:`);
      this.coordinates.forEach((coord, index) => {
        console.log(`${index + 1}. Coordenadas: (${coord.x}, ${coord.y})`);
      });
    }
  }
  
  // Exemplo de uso da classe MissionTrajectory
  const spacecraft1 = new MissionTrajectory('Satélite A', 0, 0);
  spacecraft1.addCoordinate(10, 10);
  spacecraft1.addCoordinate(20, 5);
  spacecraft1.addCoordinate(30, 15);
  
  const spacecraft2 = new MissionTrajectory('Sonda B', 5, 5);
  spacecraft2.addCoordinate(12, 12);
  spacecraft2.addCoordinate(24, 8);
  spacecraft2.addCoordinate(36, 18);
  
  spacecraft1.listTrajectory();
  spacecraft2.listTrajectory();
  
  module.exports = MissionTrajectory;
