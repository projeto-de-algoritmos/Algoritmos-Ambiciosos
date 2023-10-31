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
}

module.exports = MissionTrajectory;
