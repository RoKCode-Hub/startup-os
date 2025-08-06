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
      { id: 'direction-4', text: 'We have a clear competitive advantage in our market', rating: 0 },
      { id: 'direction-5', text: 'Our long-term vision guides daily decision-making', rating: 0 }
    ],
    score: 0,
    maxScore: 25
  },
  {
    id: 'traction',
    title: 'Traction',
    description: 'How effectively are you executing and gaining market momentum?',
    icon: 'TrendingUp',
    questions: [
      { id: 'traction-1', text: 'We consistently hit our key performance targets', rating: 0 },
      { id: 'traction-2', text: 'Customer acquisition is growing at a healthy rate', rating: 0 },
      { id: 'traction-3', text: 'Revenue growth is meeting or exceeding expectations', rating: 0 },
      { id: 'traction-4', text: 'We have strong product-market fit indicators', rating: 0 },
      { id: 'traction-5', text: 'Market feedback validates our strategic direction', rating: 0 }
    ],
    score: 0,
    maxScore: 25
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
      { id: 'leadership-4', text: 'We have strong succession planning in place', rating: 0 },
      { id: 'leadership-5', text: 'Leadership demonstrates the company values consistently', rating: 0 }
    ],
    score: 0,
    maxScore: 25
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
      { id: 'collaboration-4', text: 'Cross-functional projects are well-coordinated', rating: 0 },
      { id: 'collaboration-5', text: 'Team members feel heard and valued in discussions', rating: 0 }
    ],
    score: 0,
    maxScore: 25
  },
  {
    id: 'organizational-setup',
    title: 'Organizational Setup',
    description: 'How well-structured and scalable is your organization?',
    icon: 'Building',
    questions: [
      { id: 'setup-1', text: 'Roles and responsibilities are clearly defined', rating: 0 },
      { id: 'setup-2', text: 'Our organizational structure supports efficient workflow', rating: 0 },
      { id: 'setup-3', text: 'We have effective performance management systems', rating: 0 },
      { id: 'setup-4', text: 'Communication channels are well-established and used effectively', rating: 0 },
      { id: 'setup-5', text: 'Our structure can scale with business growth', rating: 0 }
    ],
    score: 0,
    maxScore: 25
  }
];