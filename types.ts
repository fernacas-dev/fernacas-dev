export interface TechStack {
  backend: string;
  frontend: string;
  tools: string;
}

export interface ProfileData {
  name: string;
  role: string;
  intro: string;
  aboutItems: string; // Newline separated
  techStack: TechStack;
  workItems: string; // Newline separated
  repoItems: string; // Newline separated
  contact: string;
}

export const INITIAL_DATA: ProfileData = {
  name: "Fernando",
  role: "Software Developer specialized in ASP.NET Core and React",
  intro: "Building scalable, clean and maintainable applications for real production environments. I work as a freelancer in Brazil (CNPJ), collaborating with companies and teams to design, develop and maintain modern web solutions.",
  aboutItems: "Full-stack development with .NET + React\nExperience creating enterprise features end-to-end\nStrong focus on clean architecture, performance, debugging and maintainability\nUsed to working with real systems, onboarding new developers, improving legacy code and delivering value continuously",
  techStack: {
    backend: "ASP.NET Core\nNode.js\nPython\nEntity Framework\nSQL Server\nREST APIs\nClean Architecture / DDD principles",
    frontend: "React\nTypeScript\nJavaScript\nHTML / CSS",
    tools: "Git & GitHub\nLinux\nAzure\nAWS\nDevOps workflows\nDocker",
  },
  workItems: "Development of new system features\nRefactoring and modernization of existing applications\nPerformance improvements and SQL tuning\nAnalysis of issues in production environments\nTechnical onboarding for new developers\nDeep debugging of application flows, databases and integrations",
  repoItems: "Personal projects\nExperimentation with new technologies\nUtilities, code samples and prototypes\nDocumented learnings from day-to-day experience",
  contact: "contact@fernacas.dev"
};