/**
 * Footer component with improved structure and TypeScript
 */
import Link from 'next/link';
import { ROUTES, SOCIAL_LINKS, APP_CONFIG } from '../lib/constants';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

function FooterLink({ href, children, external = false }: FooterLinkProps) {
  const className = "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors";
  
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

function FooterSection({ title, children }: FooterSectionProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
        {title}
      </h3>
      <ul className="space-y-2">
        {children}
      </ul>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <Link href={ROUTES.home} className="flex items-center space-x-2 mb-4">
              <img
                src="/Main_Isotype.svg"
                alt="JEF Galicia"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {APP_CONFIG.name}
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-4">
              Xoves Europeos Federalistas de Galicia. Promovendo a integración europea 
              e os valores democráticos dende unha perspectiva galega.
            </p>
            <div className="flex space-x-4">
              <FooterLink href={SOCIAL_LINKS.instagram} external>
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.987 11.988 11.987s11.987-5.366 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348c1.297 0 2.348 1.052 2.348 2.348s-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348c1.297 0 2.348 1.052 2.348 2.348s-1.051 2.348-2.348 2.348z"/>
                </svg>
              </FooterLink>
              <FooterLink href={SOCIAL_LINKS.twitter} external>
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </FooterLink>
              <FooterLink href={SOCIAL_LINKS.facebook} external>
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </FooterLink>
              <FooterLink href={SOCIAL_LINKS.linkedin} external>
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </FooterLink>
            </div>
          </div>

          {/* Navigation */}
          <FooterSection title="Navegación">
            <li><FooterLink href={ROUTES.about}>Acerca de</FooterLink></li>
            <li><FooterLink href={ROUTES.projects}>Proxectos</FooterLink></li>
            <li><FooterLink href={ROUTES.blog}>Blog</FooterLink></li>
            <li><FooterLink href={ROUTES.contact}>Contacto</FooterLink></li>
            <li><FooterLink href={ROUTES.join}>Únete</FooterLink></li>
          </FooterSection>

          {/* Resources */}
          <FooterSection title="Recursos">
            <li><FooterLink href={SOCIAL_LINKS.jefSpain} external>JEF España</FooterLink></li>
            <li><FooterLink href={SOCIAL_LINKS.jefSections} external>Seccións JEF</FooterLink></li>
            <li><FooterLink href={ROUTES.privacy}>Privacidade</FooterLink></li>
          </FooterSection>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} {APP_CONFIG.name}. Todos os dereitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <FooterLink href={ROUTES.privacy}>Política de Privacidade</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
