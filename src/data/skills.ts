export interface SkillGroup {
  key: string;         // i18n key: "skills.group.languages" etc.
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    key: 'skills.group.languages',
    skills: ['TypeScript', 'JavaScript', 'Go', 'Rust', 'Python', 'SQL'],
  },
  {
    key: 'skills.group.tools',
    skills: ['Node.js', 'React', 'Astro', 'PostgreSQL', 'Docker', 'Kubernetes', 'GitHub Actions', 'Kafka'],
  },
  {
    key: 'skills.group.other',
    skills: ['System Design', 'API Design', 'TDD', 'Agile', 'Technical Writing'],
  },
];
