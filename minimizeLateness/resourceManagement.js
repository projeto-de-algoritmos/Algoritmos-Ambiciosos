class ResourceManagement {
    constructor(spacecraftName, initialEnergy) {
      this.spacecraftName = spacecraftName;
      this.energy = initialEnergy;
    }
  
    // Função para consumir energia da espaçonave
    consumeEnergy(amount) {
      if (amount <= this.energy) {
        this.energy -= amount;
        console.log(`${this.spacecraftName}: Consumiu ${amount} unidades de energia. Energia restante: ${this.energy}`);
      } else {
        console.log(`${this.spacecraftName}: Sem energia suficiente para consumir ${amount} unidades.`);
      }
    }
  
    // Função para recarregar energia da espaçonave
    rechargeEnergy(amount) {
      this.energy += amount;
      console.log(`${this.spacecraftName}: Recarregou ${amount} unidades de energia. Energia atual: ${this.energy}`);
    }
  }
  
  module.exports = ResourceManagement;
