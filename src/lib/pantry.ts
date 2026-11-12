import { differenceInCalendarDays, parseISO, format } from 'date-fns';
export const categories = ['Produce','Dairy & Eggs','Meat & Protein','Bakery','Pantry','Frozen','Drinks','Snacks','Household & Cleaning','Personal Care','Pet supplies'];
export type Item = { id:string; household_id:string; name:string; category:string; emoji:string; shelf_life:number; bought_on:string|null; on_list:boolean; favorite:boolean };
export type Purchase = { id:string; item_name:string; emoji:string; buyer_name:string; bought_on:string };
export const todayString = () => format(new Date(),'yyyy-MM-dd');
export function age(item:Item, today=new Date()) { return item.bought_on ? Math.max(0,differenceInCalendarDays(today,parseISO(item.bought_on))) : 0; }
export function freshness(item:Item,today=new Date()) { if(!item.bought_on || age(item,today)>=item.shelf_life) return 'Probably gone'; return age(item,today)>=Math.ceil(item.shelf_life*.7) ? 'Almost out' : 'Fresh'; }
export const needsShopping = (item:Item,today=new Date()) => item.on_list || freshness(item,today)==='Probably gone';
const samples: [string,string,string,number,number|null][] = [['Bananos','Produce','🍌',5,6],['Tomates','Produce','🍅',7,null],['Leche','Dairy & Eggs','🥛',7,8],['Huevos','Dairy & Eggs','🥚',21,null],['Pan','Bakery','🍞',5,6],['Pollo','Meat & Protein','🍗',3,null],['Cebollas','Produce','🧅',30,4],['Arroz','Pantry','🍚',60,12],['Café','Drinks','☕',60,20],['Queso','Dairy & Eggs','🧀',14,11],['Papel higiénico','Household & Cleaning','🧻',30,null],['Jabón lavaplatos','Household & Cleaning','🧴',45,10],['Comida para gato','Pet supplies','🐱',30,6]];
export function sampleItems():Item[] { return samples.map(([name,category,emoji,shelf_life,days],i)=>({id:`sample-${i}`,household_id:'sample',name,category,emoji,shelf_life,bought_on:days===null?null:format(new Date(Date.now()-days*86400000),'yyyy-MM-dd'),on_list:days===null,favorite:true})); }export type Staple = { name:string; category:string; emoji:string; shelf_life:number };
const S=(category:string,list:[string,string,number][])=>list.map(([name,emoji,shelf_life])=>({name,category,emoji,shelf_life}));
export const staples:Staple[] = [
 ...S('Produce',[['Bananos','🍌',5],['Manzanas','🍎',21],['Tomates','🍅',7],['Cebollas','🧅',30],['Ajo','🧄',60],['Papas','🥔',30],['Zanahorias','🥕',21],['Lechuga','🥬',5],['Aguacates','🥑',4],['Limones','🍋',21],['Pimentones','🫑',10],['Fresas','🍓',4],['Pepinos','🥒',7],['Naranjas','🍊',21]]),
 ...S('Dairy & Eggs',[['Leche','🥛',7],['Huevos','🥚',21],['Queso','🧀',14],['Mantequilla','🧈',60],['Yogur','🥛',14],['Crema de leche','🥛',10]]),
 ...S('Meat & Protein',[['Pollo','🍗',3],['Carne molida','🥩',3],['Pescado','🐟',2],['Jamón','🥓',7],['Tofu','🫘',10],['Fríjoles','🫘',365]]),
 ...S('Bakery',[['Pan','🍞',5],['Tortillas de maíz','🫓',14],['Arepas','🫓',7],['Croissants','🥐',3]]),
 ...S('Pantry',[['Arroz','🍚',180],['Pasta','🍝',365],['Harina','🌾',180],['Azúcar','🧂',365],['Sal','🧂',730],['Aceite de cocina','🫒',180],['Aceite de oliva','🫒',180],['Cereal','🥣',90],['Avena','🥣',180],['Atún enlatado','🥫',730],['Salsa de tomate','🥫',365],['Lentejas','🫘',365],['Mantequilla de maní','🥜',90],['Miel','🍯',730],['Especias','🌶️',365]]),
 ...S('Frozen',[['Verduras congeladas','🥦',180],['Helado','🍨',90],['Pizza congelada','🍕',120]]),
 ...S('Drinks',[['Café','☕',60],['Té','🍵',180],['Jugo','🧃',7],['Agua','💧',365],['Gaseosa','🥤',180],['Vino','🍷',365],['Cerveza','🍺',120]]),
 ...S('Snacks',[['Papas fritas de paquete','🍟',60],['Galletas','🍪',60],['Chocolate','🍫',120],['Frutos secos','🥜',90],['Galletas saladas','🍘',60]]),
 ...S('Household & Cleaning',[['Papel higiénico','🧻',30],['Papel de cocina','🧻',30],['Jabón lavaplatos','🧴',45],['Detergente para ropa','🧺',45],['Bolsas de basura','🗑️',60],['Esponjas','🧽',30],['Limpiador multiusos','🧴',60],['Papel aluminio','📦',120]]),
 ...S('Personal Care',[['Champú','🧴',60],['Jabón','🧼',30],['Crema dental','🪥',45],['Desodorante','🧴',60],['Pañuelos','🤧',30]]),
 ...S('Pet supplies',[['Comida para gato','🐱',30],['Comida para perro','🐶',30],['Arena para gato','🪣',30]]),
];
export function availableStaples(items:{name:string}[],hidden:string[]){const taken=new Set([...items.map(i=>i.name.toLowerCase()),...hidden.map(h=>h.toLowerCase())]);return staples.filter(s=>!taken.has(s.name.toLowerCase()));}
export type Cadence = { every:number; since:number; count:number; due:boolean };
/** Learns how often an item is bought from purchase history. Needs 3+ purchases on different days. */
export function cadenceFor(name:string,purchases:{item_name:string;bought_on:string}[],today=new Date()):Cadence|null{
 const days=[...new Set(purchases.filter(p=>p.item_name.toLowerCase()===name.toLowerCase()).map(p=>p.bought_on))].sort();
 if(days.length<3)return null;
 const gaps=days.slice(1).map((d,i)=>differenceInCalendarDays(parseISO(d),parseISO(days[i]!)));
 const every=Math.max(1,Math.round(gaps.reduce((a,b)=>a+b,0)/gaps.length));
 const since=Math.max(0,differenceInCalendarDays(today,parseISO(days[days.length-1]!)));
 return {every,since,count:days.length,due:since>=Math.max(1,Math.floor(every*0.85))};
}
export const cadenceLabel=(c:Cadence)=>c.every===1?'a diario':c.every%7===0?`cada ${c.every/7===1?'semana':`${c.every/7} semanas`}`:`cada ${c.every} días`;
export const plural=(n:number,one:string,many:string)=>n===1?one:many;
export const daysAgoLabel=(n:number,lower=false)=>{const t=n===0?'hoy':n===1?'hace 1 día':`hace ${n} días`;return lower?t:t.charAt(0).toUpperCase()+t.slice(1);};
export const categoryLabel:Record<string,string>={'Produce':'Frutas y verduras','Dairy & Eggs':'Lácteos y huevos','Meat & Protein':'Carnes y proteína','Bakery':'Panadería','Pantry':'Despensa','Frozen':'Congelados','Drinks':'Bebidas','Snacks':'Pasabocas','Household & Cleaning':'Hogar y aseo','Personal Care':'Cuidado personal','Pet supplies':'Mascotas'};
export const freshnessLabel:Record<string,string>={'Fresh':'Fresco','Almost out':'Casi se acaba','Probably gone':'Probablemente se acabó'};
