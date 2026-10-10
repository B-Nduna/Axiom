import {reduce, digitSum,lifePath,birthdayNumber,personalYear,personalMonth,personalDay,chineseZodiac,meaning} from '../logic.js';

const stems=['Jia','Yi','Bing','Ding','Wu','Ji','Geng','Xin','Ren','Gui'];
const branches=['Zi','Chou','Yin','Mao','Chen','Si','Wu','Wei','Shen','You','Xu','Hai'];
const elementNotes={Wood:'Wood traditionally represents growth, initiative and adaptation.',Fire:'Fire traditionally represents expression, warmth and visibility.',Earth:'Earth traditionally represents consistency, nourishment and groundedness.',Metal:'Metal traditionally represents discernment, boundaries and structure.',Water:'Water traditionally represents curiosity, flexibility and reflection.'};
const lifeAreas={
 'Direction':{question:'Which decision is genuinely yours to make?',experiment:'Write down three options, then try one small reversible step.',support:'Ask one trusted person to help you evaluate the options.'},
 'Work & money':{question:'What is the most immediate, measurable source of pressure?',experiment:'List the next 30 days of essential expenses, then identify one concrete income or work action.',support:'For significant financial problems, consult a qualified local financial adviser or debt counsellor.'},
 'Relationships':{question:'What need, expectation or boundary has not yet been clearly expressed?',experiment:'Plan a respectful conversation: observation, feeling, specific request.',support:'If you feel unsafe, prioritise safety and reach out to trusted or specialist support.'},
 'Confidence':{question:'What evidence challenges the harshest assumption you have about yourself?',experiment:'Complete one manageable task and record what actually happened.',support:'Ask someone supportive for specific feedback, not a verdict on your worth.'},
 'Change & transition':{question:'What is under your control during this transition?',experiment:'Choose one stabilising routine and one new connection or resource.',support:'Share the practical load with someone you trust.'},
 'General reflection':{question:'Which recurring issue would be most helpful to unpack first?',experiment:'Define one problem and choose one testable next action.',support:'Talk it through with someone who listens carefully.'}
};
export function nameNumber(name){const letters=(name||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[^A-Z]/g,'');if(!letters)return null;const val=letters.split('').reduce((n,c)=>n+(c.charCodeAt(0)-65)%9+1,0);return reduce(val)}
export function yearPillarFromLunar(birth){const z=chineseZodiac(birth);if(!z)return null;const offset=((z.lunarYear-1984)%60+60)%60;return {label:`${stems[offset%10]} ${branches[offset%12]}`,animal:z.animal,element:z.element,polarity:z.polarity,year:z.lunarYear,notes:elementNotes[z.element],method:'Lunar-year pillar approximation; a formal BaZi year pillar uses the Li Chun solar boundary and may differ near early February.'}}
export function sessionReading(guest,at=new Date()){
 const zodiac=chineseZodiac(guest.birth);if(!zodiac)return null;
 const lp=lifePath(guest.birth),bn=birthdayNumber(guest.birth),py=personalYear(guest.birth,at),pm=personalMonth(guest.birth,at),pd=personalDay(guest.birth,at);
 return {lp,bn,py,pm,pd,zodiac,pillar:yearPillarFromLunar(guest.birth),nameNumber:nameNumber(guest.name),theme:meaning(lp),yearTheme:meaning(py)};
}
const constraints={time:'Limited time',resources:'Money or resources',clarity:'Unclear options',connection:'Little support',energy:'Low motivation or energy',other:'Something else'};
const preferred={action:'One practical step',conversation:'A difficult conversation',structure:'A clearer plan',rest:'Time and breathing room'};
export const constraintOptions=constraints;
export const preferredOptions=preferred;
export const prompts=[
 {id:'impact',title:'What feels most difficult right now?',options:['Not knowing what to choose','Feeling overwhelmed','Repeating the same pattern','Not getting the support I need']},
 {id:'control',title:'Where is there room to act?',options:['A decision I can make','A conversation I can start','A habit I can change','I need help identifying that']}
];
export function buildGuidance(guest,answers){
 const area=lifeAreas[guest.focus]||lifeAreas['General reflection'];const bottleneck=constraints[guest.constraint]||'an unclear obstacle';const preference=preferred[guest.preference]||'a manageable next step';
 const initial=answers.impact||'an unresolved pressure';const agency=answers.control||'an area of uncertainty';
 return {
  summary:`They describe their situation as “${guest.stage.toLowerCase()}” and identify ${initial.toLowerCase()} as a key difficulty. ${bottleneck} may be limiting progress; ask them whether that description fits.`,
  question:area.question,
  agency:`They identified “${agency.toLowerCase()}”. Explore what is realistically within their control, without assuming the problem is entirely theirs to solve.`,
  step:area.experiment,
  support:area.support,
  requested:`Their preferred kind of help is: ${preference.toLowerCase()}.`,
  plan:[
   'Day 1: Describe the situation in observable facts; separate those from assumptions.',
   'Day 2: Identify the single most urgent or manageable pressure point.',
   `Day 3: ${area.experiment}`,
   'Day 4: Ask for the support, information or boundary you need.',
   'Day 5: Take a second small action, adjusting for what you learned.',
   'Day 6: Review what improved, what stayed difficult and what changed.',
   'Day 7: Choose one sustainable habit or next step for the coming week.'
  ]
 };
}
