import { differenceInCalendarDays, parseISO, format } from 'date-fns';
export const categories = ['Produce','Dairy & Eggs','Meat & Protein','Bakery','Pantry','Frozen','Drinks','Snacks','Household & Cleaning','Personal Care','Pet supplies'];
export type Item = { id:string; household_id:string; name:string; category:string; emoji:string; shelf_life:number; bought_on:string|null; on_list:boolean; favorite:boolean };
export type Purchase = { id:string; item_name:string; emoji:string; buyer_name:string; bought_on:string };
export const todayString = () => format(new Date(),'yyyy-MM-dd');
export function age(item:Item, today=new Date()) { return item.bought_on ? Math.max(0,differenceInCalendarDays(today,parseISO(item.bought_on))) : 0; }
export function freshness(item:Item,today=new Date()) { if(!item.bought_on || age(item,today)>=item.shelf_life) return 'Probably gone'; return age(item,today)>=Math.ceil(item.shelf_life*.7) ? 'Almost out' : 'Fresh'; }
export const needsShopping = (item:Item,today=new Date()) => item.on_list || freshness(item,today)==='Probably gone';
const samples: [string,string,string,number,number|null][] = [['Bananas','Produce','🍌',5,6],['Tomatoes','Produce','🍅',7,null],['Milk','Dairy & Eggs','🥛',7,8],['Eggs','Dairy & Eggs','🥚',21,null],['Bread','Bakery','🍞',5,6],['Chicken','Meat & Protein','🍗',3,null],['Onions','Produce','🧅',30,4],['Rice','Pantry','🍚',60,12],['Coffee','Drinks','☕',60,20],['Cheese','Dairy & Eggs','🧀',14,11],['Toilet paper','Household & Cleaning','🧻',30,null],['Dish soap','Household & Cleaning','🧴',45,10],['Cat food','Pet supplies','🐱',30,6]];
export function sampleItems():Item[] { return samples.map(([name,category,emoji,shelf_life,days],i)=>({id:`sample-${i}`,household_id:'sample',name,category,emoji,shelf_life,bought_on:days===null?null:format(new Date(Date.now()-days*86400000),'yyyy-MM-dd'),on_list:days===null,favorite:true})); }export type Staple = { name:string; category:string; emoji:string; shelf_life:number };
const S=(category:string,list:[string,string,number][])=>list.map(([name,emoji,shelf_life])=>({name,category,emoji,shelf_life}));
export const staples:Staple[] = [
 ...S('Produce',[['Bananas','🍌',5],['Apples','🍎',21],['Tomatoes','🍅',7],['Onions','🧅',30],['Garlic','🧄',60],['Potatoes','🥔',30],['Carrots','🥕',21],['Lettuce','🥬',5],['Avocados','🥑',4],['Lemons','🍋',21],['Bell peppers','🫑',10],['Strawberries','🍓',4],['Cucumbers','🥒',7],['Oranges','🍊',21]]),
 ...S('Dairy & Eggs',[['Milk','🥛',7],['Eggs','🥚',21],['Cheese','🧀',14],['Butter','🧈',60],['Yogurt','🥛',14],['Cream','🥛',10]]),
 ...S('Meat & Protein',[['Chicken','🍗',3],['Ground beef','🥩',3],['Fish','🐟',2],['Ham','🥓',7],['Tofu','🫘',10],['Beans','🫘',365]]),
 ...S('Bakery',[['Bread','🍞',5],['Tortillas','🫓',14],['Arepas','🫓',7],['Croissants','🥐',3]]),
 ...S('Pantry',[['Rice','🍚',180],['Pasta','🍝',365],['Flour','🌾',180],['Sugar','🧂',365],['Salt','🧂',730],['Cooking oil','🫒',180],['Olive oil','🫒',180],['Cereal','🥣',90],['Oats','🥣',180],['Canned tuna','🥫',730],['Tomato sauce','🥫',365],['Lentils','🫘',365],['Peanut butter','🥜',90],['Honey','🍯',730],['Spices','🌶️',365]]),
 ...S('Frozen',[['Frozen vegetables','🥦',180],['Ice cream','🍨',90],['Frozen pizza','🍕',120]]),
 ...S('Drinks',[['Coffee','☕',60],['Tea','🍵',180],['Juice','🧃',7],['Water','💧',365],['Soda','🥤',180],['Wine','🍷',365],['Beer','🍺',120]]),
 ...S('Snacks',[['Chips','🍟',60],['Cookies','🍪',60],['Chocolate','🍫',120],['Nuts','🥜',90],['Crackers','🍘',60]]),
 ...S('Household & Cleaning',[['Toilet paper','🧻',30],['Paper towels','🧻',30],['Dish soap','🧴',45],['Laundry detergent','🧺',45],['Trash bags','🗑️',60],['Sponges','🧽',30],['All-purpose cleaner','🧴',60],['Aluminum foil','📦',120]]),
 ...S('Personal Care',[['Shampoo','🧴',60],['Soap','🧼',30],['Toothpaste','🪥',45],['Deodorant','🧴',60],['Tissues','🤧',30]]),
 ...S('Pet supplies',[['Cat food','🐱',30],['Dog food','🐶',30],['Cat litter','🪣',30]]),
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
export const cadenceLabel=(c:Cadence)=>c.every%7===0?`every ${c.every/7===1?'week':`${c.every/7} weeks`}`:`every ${c.every} days`;
