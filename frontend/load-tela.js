import { SpaceMissionCoordinator } from '../minimizeLateness/main.js';

// ...

// Crie uma instância da classe SpaceMissionCoordinator
const coordinator = new SpaceMissionCoordinator();

// Função para carregar e exibir dados do Launch Planner
function loadLaunchPlannerData() {
    const launchPlannerData = coordinator.launchPlanner.getLaunchPlannerData();
    // Manipular os dados do Launch Planner, se necessário.
    // Por exemplo: launchPlannerData.someProperty = newValue;
    // Agora, atualize os dados no backend.
    coordinator.launchPlanner.updateLaunchPlannerData(launchPlannerData);
}

// Função para carregar e exibir dados do Mission Trajectory
function loadMissionTrajectoryData() {
    const missionTrajectoryData = coordinator.missionTrajectory.getMissionTrajectoryData();
    // Manipular os dados do Mission Trajectory, se necessário.
    // Por exemplo: missionTrajectoryData.someProperty = newValue;
    // Agora, atualize os dados no backend.
    coordinator.missionTrajectory.updateMissionTrajectoryData(missionTrajectoryData);
}

// Função para carregar e exibir dados do Orbit Scheduler
function loadOrbitSchedulerData() {
    const orbitSchedulerData = coordinator.orbitScheduler.getOrbitSchedulerData();
    // Manipular os dados do Orbit Scheduler, se necessário.
    // Por exemplo: orbitSchedulerData.someProperty = newValue;
    // Agora, atualize os dados no backend.
    coordinator.orbitScheduler.updateOrbitSchedulerData(orbitSchedulerData);
}

// Função para carregar e exibir dados do Resource Management
function loadResourceManagementData() {
    const resourceManagementData = coordinator.resourceManagement.getResourceManagementData();
    // Manipular os dados do Resource Management, se necessário.
    // Por exemplo: resourceManagementData.someProperty = newValue;
    // Agora, atualize os dados no backend.
    coordinator.resourceManagement.updateResourceManagementData(resourceManagementData);
}
