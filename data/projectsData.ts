export type ProjectStatus = "finished" | "building";

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  image: string;
  versionOrStage: string;
  dateOrVersionInfo: string;
}

export const projectsData: Project[] = [
  {
    id: "obsidian-core",
    title: "Obsidian Core",
    description: "High-density computing architecture optimized for real-time neural processing.",
    status: "finished",
    image: "/images/project-obsidian-core.webp",
    versionOrStage: "v2.4.0",
    dateOrVersionInfo: "03 / 24",
  },
  {
    id: "luxe-ledger",
    title: "Luxe Ledger",
    description: "Decentralized asset management for premium digital artifacts and collectibles.",
    status: "finished",
    image: "/images/project-luxe-ledger.webp",
    versionOrStage: "STABLE",
    dateOrVersionInfo: "01 / 24",
  },
  {
    id: "aerosync-hud",
    title: "AeroSync HUD",
    description: "Next-generation avionics telemetry interface with predictive AI correction.",
    status: "building",
    image: "/images/project-aerosync-hud.webp",
    versionOrStage: "IN DEV",
    dateOrVersionInfo: "BETA 0.9",
  },
  {
    id: "synapse-grid",
    title: "Synapse Grid",
    description: "Liquid-cooled quantum substrate for extreme throughput data centers.",
    status: "building",
    image: "/images/project-synapse-grid.webp",
    versionOrStage: "PROTOTYPE",
    dateOrVersionInfo: "ALPHA 0.2",
  }
];
