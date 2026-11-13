export interface SkillGroup {
  key: string;         // i18n key: "skills.group.backend" etc.
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    key: 'skills.group.backend',
    skills: ['C#', 'ASP.NET Core', 'Entity Framework Core', 'SQL Server', 'REST APIs', 'JWT', 'SignalR', 'OCR', 'Hosted Services'],
  },
  {
    key: 'skills.group.frontend',
    skills: ['Vue 3', 'Nuxt', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Chart.js'],
  },
  {
    key: 'skills.group.ai',
    skills: ['OpenAI', 'Claude', 'MCP', 'Agentic AI', 'Chatbots'],
  },
  {
    key: 'skills.group.architecture',
    skills: ['Clean Architecture', 'DDD', 'Repository Pattern', 'Layered Design'],
  },
  {
    key: 'skills.group.devops',
    skills: ['Docker', 'Docker Compose', 'GitHub Actions', 'Git', 'GitHub'],
  },
];
