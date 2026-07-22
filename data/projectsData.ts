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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBb5huA945QI1jM1-ae-XRVRFWfSNxMLIUwvyFSTXrhYvGM9x00mzQz2FFAIKU5pK88fIuiUivUmBRdsPdBv3kZkvjAMWVTclUDXvleCqCICJo2sjri8k4kN0S8KsLZr9zUKU6VQ5FyAyrHY6zRQpygcilg5CkW1norV0DKQ8YBsxZMqbO1Vs6Zq1Q9li2B3LFeL6Gy1yusFD6pTpATHD0qXSzDxCUNhmBB5gjvLudG9H-7Zy92L7lrKQ",
    versionOrStage: "v2.4.0",
    dateOrVersionInfo: "03 / 24",
  },
  {
    id: "luxe-ledger",
    title: "Luxe Ledger",
    description: "Decentralized asset management for premium digital artifacts and collectibles.",
    status: "finished",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-zD2T3WvQTrQNnKd1A9aJRAUBq6scRZzII1E2a5TCqKsVaAF_azDkJPIsZpc1asrXbraM3ayx_pzDEQVkVFFXCGUAPQjOiiUyGbHNl0zfmrwHErT17tsRqYUcXCVGyyB_I1-XfpGfuyGJVQsG8SuNHgcHMG4T-71raxljVvzCf56uSxpzCW_N-1sG5vqUtwRA_Hi52eTm1vaUFXjIpemgDkGrd3NhirWK6akf9LdmqqyHP-b8edRZZQ",
    versionOrStage: "STABLE",
    dateOrVersionInfo: "01 / 24",
  },
  {
    id: "aerosync-hud",
    title: "AeroSync HUD",
    description: "Next-generation avionics telemetry interface with predictive AI correction.",
    status: "building",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8DV3nuHn2OiAKgFouE01-mMTH4kp6kXypLT5brtkXmnSdRzbY1GF59Ff5SuZZKb7LaWwS4JES6lYYIXOBpT2Sb04JpF9WzGEJw5jiCas79qoILWSSnMHEndw460yiWLISjM9GcevWpkGxZbKjBzMLRZ_tDQMu4f2lGd2Kz97pXThaePOrXdIswk_dDs_t8i4smyMF9E78dZUsJuXDiDk6RB_zfcYk99JvfbKhvK1dkPY_p0LZ3k1h8g",
    versionOrStage: "IN DEV",
    dateOrVersionInfo: "BETA 0.9",
  },
  {
    id: "synapse-grid",
    title: "Synapse Grid",
    description: "Liquid-cooled quantum substrate for extreme throughput data centers.",
    status: "building",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcc4MpPDERpgGo22FKoF2kw-g423sCChgWN7_DSIQLRC1WsqsjoHLoWl9PIiWP79TsdAm4Vot-pSmSfL4JZdr42yUMlYQ2_-HU7np9fyrWkxnZZK6b5_bdkBVGzzc9umkxKwM7T-Yw15Lz7eqc453Ce48j1dh5EU09XeZ7RIZvxFvR-g4HKqM1zRLGA4dpomKRykKOdspPgVipt5oCVc7vYFKaL7Ct_K-aCPQCtc_PVeHP8o0W8Tmbeg",
    versionOrStage: "PROTOTYPE",
    dateOrVersionInfo: "ALPHA 0.2",
  }
];
