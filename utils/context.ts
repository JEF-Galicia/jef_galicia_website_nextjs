import React from "react";

export const GlobalContext = React.createContext({
    globalContext: {
        name: 'JEF Galicia',
        footerText: '© 2023. Todos os dereitos reservados.',
    },
    setContext: (context: any) => { }
});