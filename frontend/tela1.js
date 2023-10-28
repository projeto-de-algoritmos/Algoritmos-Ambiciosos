import { LaunchPlanner } from '../minimizeLateness/launchPlanner.js';
import { MissionTrajectory } from '../minimizeLateness/missionTrajectory.js';
import { OrbitScheduler } from '../minimizeLateness/orbitScheduler.js';
import { ResourceManagement } from '../minimizeLateness/resourceManagement.js';

// Criar instâncias das classes
const launchPlanner = new LaunchPlanner();
const missionTrajectory = new MissionTrajectory();
const orbitScheduler = new OrbitScheduler();
const resourceManagement = new ResourceManagement();

// Função para carregar e exibir dados do Launch Planner
function loadLaunchPlannerData() {
    const launchPlannerData = launchPlanner.getLaunchPlannerData();
    // Manipular os dados do Launch Planner, se necessário.
    // Por exemplo: launchPlannerData.someProperty = newValue;
    // Agora, atualize os dados no backend.
    launchPlanner.updateLaunchPlannerData(launchPlannerData);
}

// Função para carregar e exibir dados do Mission Trajectory
function loadMissionTrajectoryData() {
    const missionTrajectoryData = missionTrajectory.getMissionTrajectoryData();
    // Manipular os dados do Mission Trajectory, se necessário.
    // Por exemplo: missionTrajectoryData.someProperty = newValue;
    // Agora, atualize os dados no backend.
    missionTrajectory.updateMissionTrajectoryData(missionTrajectoryData);
}

// Função para carregar e exibir dados do Orbit Scheduler
function loadOrbitSchedulerData() {
    const orbitSchedulerData = orbitScheduler.getOrbitSchedulerData();
    // Manipular os dados do Orbit Scheduler, se necessário.
    // Por exemplo: orbitSchedulerData.someProperty = newValue;
    // Agora, atualize os dados no backend.
    orbitScheduler.updateOrbitSchedulerData(orbitSchedulerData);
}

// Função para carregar e exibir dados do Resource Management
function loadResourceManagementData() {
    const resourceManagementData = resourceManagement.getResourceManagementData();
    // Manipular os dados do Resource Management, se necessário.
    // Por exemplo: resourceManagementData.someProperty = newValue;
    // Agora, atualize os dados no backend.
    resourceManagement.updateResourceManagementData(resourceManagementData);
}

// Chame as funções para carregar os dados
loadLaunchPlannerData();
loadMissionTrajectoryData();
loadOrbitSchedulerData();
loadResourceManagementData();