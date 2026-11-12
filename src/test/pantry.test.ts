import { describe,it,expect } from 'vitest';
import { sampleItems,freshness,needsShopping } from '@/lib/pantry';
describe('Pantry rules',()=>{
 const base=sampleItems()[0]; if(!base)throw new Error('Missing sample bananas'); const today=new Date(2026,10,11);
 it('bananas have a five-day default',()=>expect(base.shelf_life).toBe(5));
 it('milk has a seven-day default',()=>expect(sampleItems().find(i=>i.name==='Milk')?.shelf_life).toBe(7));
 it('rice has a sixty-day default',()=>expect(sampleItems().find(i=>i.name==='Rice')?.shelf_life).toBe(60));
 it('old bananas automatically appear on the shopping list',()=>expect(needsShopping({...base,bought_on:'2026-11-06',on_list:false},today)).toBe(true));
 it('recent purchase resets freshness and leaves the shopping list',()=>{const i={...base,bought_on:'2026-11-11',on_list:false};expect(freshness(i,today)).toBe('Fresh');expect(needsShopping(i,today)).toBe(false);});
 it('bananas close to shelf life are almost out',()=>expect(freshness({...base,bought_on:'2026-11-07'},today)).toBe('Almost out'));
});import { cadenceFor } from '@/lib/pantry';
describe('Purchase cadence',()=>{
 const p=(d:string)=>({item_name:'Onions',bought_on:d});
 const history=[p('2026-09-17'),p('2026-10-01'),p('2026-10-15'),p('2026-10-29')];
 it('learns onions are bought every two weeks',()=>expect(cadenceFor('Onions',history,new Date(2026,10,1))?.every).toBe(14));
 it('alerts when the usual gap is nearly reached',()=>expect(cadenceFor('Onions',history,new Date(2026,10,11))?.due).toBe(true));
 it('stays quiet right after buying',()=>expect(cadenceFor('Onions',history,new Date(2026,10,1))?.due).toBe(false));
 it('needs at least three purchases to learn',()=>expect(cadenceFor('Onions',history.slice(0,2))).toBeNull());
});
