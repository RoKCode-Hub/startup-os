import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export const dynamicIconImport = async (iconName: string): Promise<LucideIcon> => {
  if (iconName in LucideIcons) {
    return LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon;
  }
  
  return LucideIcons.HelpCircle;
};