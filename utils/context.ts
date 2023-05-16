import React from "react";

export const GlobalContext = React.createContext({
    globalContext: {
        name: 'JEF Galicia',
        // Show the current year in the footer
    },
    setContext: (context: any) => { }
});