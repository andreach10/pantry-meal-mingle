import { createFileRoute } from "@tanstack/react-router";
import { PantryApp } from '@/components/pantry-app';

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head:()=>({meta:[{title:'Pantry — Mercar fácil, sin olvidar nada'},{name:'description',content:'Tu lista compartida en el bolsillo, alertas de lo que falta y turnos claros para mercar rápido y sin olvidos.'},{property:'og:title',content:'Pantry — Mercar fácil, sin olvidar nada'},{property:'og:description',content:'Tu lista compartida en el bolsillo, alertas de lo que falta y turnos claros para mercar rápido y sin olvidos.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
  component: PantryApp,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
