import { createFileRoute } from "@tanstack/react-router";
import { PantryApp } from '@/components/pantry-app';

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head:()=>({meta:[{title:'Pantry — Our home, all stocked up'},{name:'description',content:'Your shared pantry, grocery list and weekly purchase planner. A little less guessing, a little more home.'},{property:'og:title',content:'Pantry — Our home, all stocked up'},{property:'og:description',content:'A shared grocery list and freshness tracker for your home.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
  component: PantryApp,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
