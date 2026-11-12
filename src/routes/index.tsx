import { createFileRoute } from "@tanstack/react-router";
import { PantryApp } from '@/components/pantry-app';

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head:()=>({meta:[{title:'Despensa — Lo que falta, lo que hay, lo que compartimos'},{name:'description',content:'Tu despensa compartida: lista de compras, productos en casa y las compras de tu semana.'},{property:'og:title',content:'Despensa — Un hogar bien surtido'},{property:'og:description',content:'Comparte tu lista de compras, organiza los turnos y encuentra todo lo que tienes en casa.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
  component: PantryApp,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
