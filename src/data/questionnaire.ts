import { Category } from '@/types/questionnaire';

export const categories: Category[] = [
  {
    id: 'strategy',
    title: 'Strategy & Vision',
    description: 'How well-defined and aligned is your strategic direction?',
    icon: 'Target',
    questions: [
      { id: 'strategy-1', text: 'Our company has a clear and well-communicated mission statement', rating: 0 },
      { id: 'strategy-2', text: 'Strategic goals are regularly reviewed and updated', rating: 0 },
      { id: 'strategy-3', text: 'All team members understand how their work contributes to company goals', rating: 0 },
      { id: 'strategy-4', text: 'We have a clear competitive advantage in our market', rating: 0 },
      { id: 'strategy-5', text: 'Our long-term vision guides daily decision-making', rating: 0 }
    ],
    score: 0,
    maxScore: 25
  },
  {
    id: 'operations',
    title: 'Operations & Processes',
    description: 'How efficient and scalable are your operational systems?',
    icon: 'Cog',
    questions: [
      { id: 'operations-1', text: 'Our core processes are well-documented and standardized', rating: 0 },
      { id: 'operations-2', text: 'We regularly measure and optimize operational efficiency', rating: 0 },
      { id: 'operations-3', text: 'Quality control systems are in place and effective', rating: 0 },
      { id: 'operations-4', text: 'Our operations can scale with business growth', rating: 0 },
      { id: 'operations-5', text: 'We effectively manage supply chain and vendor relationships', rating: 0 }
    ],
    score: 0,
    maxScore: 25
  },
  {
    id: 'team',
    title: 'Team & Culture',
    description: 'How strong is your team dynamics and company culture?',
    icon: 'Users',
    questions: [
      { id: 'team-1', text: 'Team members collaborate effectively across departments', rating: 0 },
      { id: 'team-2', text: 'We have strong leadership at all levels', rating: 0 },
      { id: 'team-3', text: 'Employee satisfaction and retention rates are high', rating: 0 },
      { id: 'team-4', text: 'We invest in continuous learning and development', rating: 0 },
      { id: 'team-5', text: 'Our company culture aligns with our stated values', rating: 0 }
    ],
    score: 0,
    maxScore: 25
  },
  {
    id: 'technology',
    title: 'Technology & Innovation',
    description: 'How well are you leveraging technology for growth?',
    icon: 'Zap',
    questions: [
      { id: 'tech-1', text: 'Our technology infrastructure supports current and future needs', rating: 0 },
      { id: 'tech-2', text: 'We regularly evaluate and adopt new technologies', rating: 0 },
      { id: 'tech-3', text: 'Data security and privacy measures are robust', rating: 0 },
      { id: 'tech-4', text: 'We use data analytics to drive business decisions', rating: 0 },
      { id: 'tech-5', text: 'Innovation is encouraged and supported throughout the organization', rating: 0 }
    ],
    score: 0,
    maxScore: 25
  },
  {
    id: 'finance',
    title: 'Financial Health',
    description: 'How stable and sustainable is your financial position?',
    icon: 'DollarSign',
    questions: [
      { id: 'finance-1', text: 'Cash flow is positive and predictable', rating: 0 },
      { id: 'finance-2', text: 'Financial reporting is accurate and timely', rating: 0 },
      { id: 'finance-3', text: 'We have multiple revenue streams', rating: 0 },
      { id: 'finance-4', text: 'Investment in growth opportunities is balanced with profitability', rating: 0 },
      { id: 'finance-5', text: 'Financial risks are identified and properly managed', rating: 0 }
    ],
    score: 0,
    maxScore: 25
  },
  {
    id: 'market',
    title: 'Market Position',
    description: 'How strong is your market presence and customer relationships?',
    icon: 'TrendingUp',
    questions: [
      { id: 'market-1', text: 'We have a strong brand presence in our target market', rating: 0 },
      { id: 'market-2', text: 'Customer satisfaction scores are consistently high', rating: 0 },
      { id: 'market-3', text: 'We effectively track and respond to market trends', rating: 0 },
      { id: 'market-4', text: 'Our marketing efforts generate measurable ROI', rating: 0 },
      { id: 'market-5', text: 'We have sustainable competitive advantages', rating: 0 }
    ],
    score: 0,
    maxScore: 25
  }
];