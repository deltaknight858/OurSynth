import React, { createContext, useContext } from 'react';

type Vars = Partial<
  Record<
    | '--sb-width'
    | '--sb-track'
    | '--sb-thumb-start'
    | '--sb-thumb-end'
    | '--sb-thumb-border'
    | '--sb-glow'
    | '--sb-glow-active'
    | '--sb-transition',
    string
  >
>;

const Ctx = createContext<Vars | undefined>(undefined);

export function HaloScrollbarProvider({
  children,
  vars,
}: {
  children: React.ReactNode;
  vars?: Vars; // map your design tokens here
}) {
  return <Ctx.Provider value={vars}>{children}</Ctx.Provider>;
}

export function useHaloScrollbarTheme() {
  return useContext(Ctx) ?? {};
}
