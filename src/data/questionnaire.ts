import { Category } from '@/types/questionnaire';

export const categories: Category[] = [
  {
    id: 'direction',
    title: 'Direction',
    description: 'How clear and aligned is your strategic direction?',
    icon: 'Target',
    questions: [
      { id: 'direction-1', text: 'We have a clear and shared long-term goal.', rating: 0 },
      { id: 'direction-2', text: 'Everyone knows what we want to achieve in the next months.', rating: 0 },
      { id: 'direction-3', text: 'Our goals guide our daily decisions.', rating: 0 },
      { id: 'direction-4', text: 'We have clearly defined what sets us apart from our competitors.', rating: 0 }
    ],
    score: 0,
    maxScore: 20
  },
  {
    id: 'execution',
    title: 'Execution',
    description: 'How effectively are you executing and gaining market momentum?',
    icon: 'TrendingUp',
    questions: [
      { id: 'execution-1', text: 'We have a clear strategy how we want to achieve our goals.', rating: 0 },
      { id: 'execution-2', text: 'Everyone works on topics that contribute to our goals.', rating: 0 },
      { id: 'execution-3', text: 'We consistently hit our targets.', rating: 0 },
      { id: 'execution-4', text: 'We hold each other accountable for achieving our goals.', rating: 0 }
    ],
    score: 0,
    maxScore: 20
  },
  {
    id: 'leadership',
    title: 'Leadership',
    description: 'How strong and effective is your leadership team?',
    icon: 'Users',
    questions: [
      { id: 'leadership-1', text: 'We have the right people in our leadership roles.', rating: 0 },
      { id: 'leadership-2', text: 'Our leaders make tough calls quickly and stand by them.', rating: 0 },
      { id: 'leadership-3', text: 'We trust each other to own our areas fully.', rating: 0 },
      { id: 'leadership-4', text: 'We enable high-performance as a leadership team', rating: 0 }
    ],
    score: 0,
    maxScore: 20
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description: 'How well do teams work together across the organization?',
    icon: 'Users2',
    questions: [
      { id: 'collaboration-1', text: 'We have very effective and efficient meetings.', rating: 0 },
      { id: 'collaboration-2', text: 'Our company culture is clearly aligned with our goals.', rating: 0 },
      { id: 'collaboration-3', text: 'We have a strong feedback culture.', rating: 0 },
      { id: 'collaboration-4', text: 'We have great collaboration and alignment across teams.', rating: 0 }
    ],
    score: 0,
    maxScore: 20
  },
  {
    id: 'systems-processes-structures',
    title: 'Systems, Processes and Structures',
    description: 'How well-structured and scalable is your organization?',
    icon: 'Building',
    questions: [
      { id: 'systems-1', text: 'We have identified, simplified and clearly described our 3-5 most important processes.', rating: 0 },
      { id: 'systems-2', text: 'We have systems and processes in place to get constant feedback from our customers/users.', rating: 0 },
      { id: 'systems-3', text: 'Roles and responsibilities are clear.', rating: 0 },
      { id: 'systems-4', text: 'Our values are clearly reflected in our processes (hiring, performance reviews, firing, development…).', rating: 0 }
    ],
    score: 0,
    maxScore: 20
  },
  {
    id: 'data',
    title: 'Data',
    description: 'How effectively do you collect, analyze, and use data for decision-making?',
    icon: 'Database',
    questions: [
      { id: 'data-1', text: 'We have identified and constantly monitor the 1-5 key metrics for our business.', rating: 0 },
      { id: 'data-2', text: 'Everyone can access the data relevant for decision making in their role.', rating: 0 },
      { id: 'data-3', text: 'We use data consistently to guide our decisions.', rating: 0 },
      { id: 'data-4', text: 'We visualise our data in meaningful ways to identify patterns and to track progress.', rating: 0 }
    ],
    score: 0,
    maxScore: 20
  }
];