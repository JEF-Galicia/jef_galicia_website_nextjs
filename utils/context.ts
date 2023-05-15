import React from "react";

export const GlobalContext = React.createContext({
    globalContext: {
        name: 'JEF Galicia',
        // Show the current year in the footer
        footerText: `© ${new Date().getFullYear()} - JEF Galicia. Todos os dereitos reservados.`,
    },
    setContext: (context: any) => { }
});