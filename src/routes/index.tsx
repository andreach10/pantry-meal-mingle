import { createFileRoute } from "@tanstack/react-router";
import { PantryApp } from '@/components/pantry-app';

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head:()=>({meta:[{title:'Pantry — Nuestra casa, bien surtida'},{name:'description',content:'Tu despensa compartida, tu lista de mercado y tu planeador semanal de compras. Menos adivinar, más casa.'},{property:'og:title',content:'Pantry — Nuestra casa, bien surtida'},{property:'og:description',content:'Una lista de mercado compartida y un control de frescura para tu casa.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
  component: PantryApp,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
