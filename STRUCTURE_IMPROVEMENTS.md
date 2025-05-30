# JEF Galicia Website - Improved Code Structure

## Overview

This document outlines the improved code structure for the JEF Galicia website, making it more professional, maintainable, and robust.

## Project Structure

```
/workspaces/jef_galicia_website_nextjs/
├── lib/                      # Core library code
│   ├── constants/           # Application constants
│   │   └── index.ts        # App config, routes, social links, etc.
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # Shared types and interfaces
│   ├── utils/              # Utility functions
│   │   ├── index.ts        # Main utils export
│   │   ├── api.ts          # API utilities and error handling
│   │   ├── formatting.ts   # Date, text, and data formatting
│   │   └── validation.ts   # Form validation utilities
│   ├── hooks/              # Custom React hooks
│   │   ├── index.ts        # Hooks export
│   │   └── useCommon.ts    # Common hooks (theme, form, etc.)
│   ├── services/           # API services and data management
│   │   └── index.ts        # API service layer with caching
│   └── config/             # Configuration files
│       └── env.ts          # Environment configuration
├── components/             # React components
│   ├── index.ts           # Components export file
│   ├── Layout.tsx         # Main layout component
│   ├── FooterNew.tsx      # Improved footer component
│   ├── Button.tsx         # Enhanced button with variants
│   ├── Forms.tsx          # Form components (Input, Textarea, etc.)
│   ├── UI.tsx             # UI components (Loading, Error, Alert)
│   └── ...existing files
├── api/                   # API configuration
│   ├── client.ts          # API clients (Notion, Google)
│   └── directory.ts       # Google Directory operations
└── pages/                 # Next.js pages
    └── ...existing files
```

## Key Improvements

### 1. **TypeScript Integration**
- Added proper TypeScript support with type definitions
- Created shared types and interfaces in `lib/types/`
- Improved type safety across components and utilities

### 2. **Utility Functions**
- **Validation**: Robust form validation with reusable rules
- **Formatting**: Date, text, and data formatting utilities
- **API**: Error handling, request utilities, and CORS support

### 3. **Custom Hooks**
- `useTheme`: Theme management with system preference detection
- `useForm`: Complete form state management with validation
- `useLocalStorage`: Persistent local storage with error handling
- `useAsync`: Async operation handling with loading states
- `useDebounce`: Value debouncing for performance

### 4. **Service Layer**
- Centralized API calls with caching
- Error handling and retry mechanisms
- Consistent data fetching patterns

### 5. **Improved Components**
- **Layout**: Professional layout with theme support
- **Button**: Multiple variants (primary, secondary, outline, ghost)
- **Forms**: Complete form components with validation
- **UI**: Loading states, error messages, alerts, and empty states

### 6. **Enhanced API Layer**
- Better error handling with custom APIError class
- Environment variable validation
- Rate limiting support
- CORS configuration

## Usage Examples

### Using the improved Button component:
```tsx
import { Button } from '../components';

// Primary button
<Button variant="primary" size="lg">
  Primary Action
</Button>

// Link button
<Button href="/contact" variant="outline">
  Contact Us
</Button>

// Loading button
<Button loading variant="secondary">
  Submitting...
</Button>
```

### Using Form components:
```tsx
import { Input, Textarea, FormGroup } from '../components';
import { useForm } from '../lib/hooks';
import { createValidationRules } from '../lib/utils';

const ContactForm = () => {
  const { values, errors, setValue, handleSubmit } = useForm(
    { name: '', email: '', message: '' },
    {
      name: createValidationRules.required(),
      email: createValidationRules.email(),
      message: createValidationRules.minLength(10),
    }
  );

  return (
    <FormGroup>
      <Input
        label="Nome"
        value={values.name}
        onChange={(e) => setValue('name', e.target.value)}
        error={errors.name}
        fullWidth
      />
      <Input
        label="Email"
        type="email"
        value={values.email}
        onChange={(e) => setValue('email', e.target.value)}
        error={errors.email}
        fullWidth
      />
      <Textarea
        label="Mensaxe"
        value={values.message}
        onChange={(e) => setValue('message', e.target.value)}
        error={errors.message}
        rows={5}
        fullWidth
      />
    </FormGroup>
  );
};
```

### Using the service layer:
```tsx
import { dataService } from '../lib/services';
import { LoadingPage, ErrorMessage } from '../components';

const MembersPage = () => {
  const { data: members, loading, error, refetch } = useAsync(() => 
    dataService.getMembers()
  );

  if (loading) return <LoadingPage message="Cargando membros..." />;
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;

  return (
    <div>
      {members?.map(member => (
        <MemberCard key={member.email} member={member} />
      ))}
    </div>
  );
};
```

### Using validation utilities:
```tsx
import { validateField, createValidationRules } from '../lib/utils';

const emailRules = [
  createValidationRules.required(),
  createValidationRules.email(),
];

const error = validateField('user@example.com', emailRules);
// Returns null if valid, error message if invalid
```

## Best Practices Implemented

1. **Separation of Concerns**: Clear separation between components, utilities, services, and configuration
2. **Type Safety**: Comprehensive TypeScript coverage for better development experience
3. **Error Handling**: Consistent error handling patterns across the application
4. **Performance**: Caching mechanisms and optimized re-renders
5. **Accessibility**: ARIA labels and semantic HTML in components
6. **Maintainability**: Modular structure and clear naming conventions
7. **Testing Ready**: Components designed for easy testing
8. **Internationalization**: Support for multiple locales in constants

## Migration Guide

### For existing components:
1. Import new components from the index file: `import { Button, Input } from '../components'`
2. Replace old validation logic with new validation utilities
3. Use new hooks for common functionality (theme, forms, etc.)
4. Migrate to the new service layer for API calls

### For new features:
1. Define types in `lib/types/`
2. Create reusable utilities in `lib/utils/`
3. Use the established component patterns
4. Follow the service layer for data fetching

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Extract and compile translations
npm run i18n
```

This improved structure provides a solid foundation for scalable and maintainable development while keeping the code simple and robust.
