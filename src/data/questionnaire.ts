import { Category } from '@/types/questionnaire';

export const categories: Category[] = [
  {
    id: 'direction',
    title: 'Direction',
    description: 'How clear and aligned is your strategic direction?',
    icon: 'Target',
    questions: [
      { id: 'direction-1', text: 'Our company has a clear and well-communicated mission statement', rating: 0 },
      { id: 'direction-2', text: 'Strategic goals are regularly reviewed and updated', rating: 0 },
      { id: 'direction-3', text: 'All team members understand how their work contributes to company goals', rating: 0 },
      { id: 'direction-4', text: 'We have a clear competitive advantage in our market', rating: 0 }
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
      { id: 'execution-1', text: 'We consistently hit our key performance targets', rating: 0 },
      { id: 'execution-2', text: 'Customer acquisition is growing at a healthy rate', rating: 0 },
      { id: 'execution-3', text: 'Revenue growth is meeting or exceeding expectations', rating: 0 },
      { id: 'execution-4', text: 'We have strong product-market fit indicators', rating: 0 }
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
      { id: 'leadership-1', text: 'Leadership team communicates effectively with the organization', rating: 0 },
      { id: 'leadership-2', text: 'Decision-making processes are clear and efficient', rating: 0 },
      { id: 'leadership-3', text: 'Leaders are accessible and supportive to their teams', rating: 0 },
      { id: 'leadership-4', text: 'Leadership demonstrates the company values consistently', rating: 0 }
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
      { id: 'collaboration-1', text: 'Teams collaborate effectively across departments', rating: 0 },
      { id: 'collaboration-2', text: 'Information flows smoothly throughout the organization', rating: 0 },
      { id: 'collaboration-3', text: 'Conflicts are resolved quickly and constructively', rating: 0 },
      { id: 'collaboration-4', text: 'Cross-functional projects are well-coordinated', rating: 0 }
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
      { id: 'systems-1', text: 'Roles and responsibilities are clearly defined', rating: 0 },
      { id: 'systems-2', text: 'Our organizational structure supports efficient workflow', rating: 0 },
      { id: 'systems-3', text: 'We have effective performance management systems', rating: 0 },
      { id: 'systems-4', text: 'Our structure can scale with business growth', rating: 0 }
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
      { id: 'data-1', text: 'We collect relevant data consistently across all key areas', rating: 0 },
      { id: 'data-2', text: 'Data is accurate, accessible, and up-to-date', rating: 0 },
      { id: 'data-3', text: 'We use data analytics to inform strategic decisions', rating: 0 },
      { id: 'data-4', text: 'Key metrics and KPIs are clearly defined and tracked', rating: 0 }
    ],
    score: 0,
    maxScore: 20
  }
];