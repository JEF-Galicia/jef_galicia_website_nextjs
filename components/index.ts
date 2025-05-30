/**
 * Main components export file for better organization
 */

// Layout components
export { default as Layout, GradientBackground } from './Layout';
export { Footer } from './FooterNew';

// UI Components
export { Button } from './Button';
export { Input, Textarea, Select, FormGroup, FormRow } from './Forms';
export { 
  LoadingSpinner, 
  LoadingPage, 
  ErrorMessage, 
  EmptyState, 
  Alert 
} from './UI';

// Existing components (for backward compatibility)
export { default as ButtonComponent } from './Button';
export { default as Box } from './Box';
export { default as Card } from './Card';
export { default as CustomLink } from './CustomLink';
export { default as MemberCard } from './MemberCard';
export { default as Navbar } from './Navbar';
export { default as Project } from './Project';
export { default as ArrowIcon } from './ArrowIcon';
