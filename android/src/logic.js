export const animals = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];
export const elements = ['Wood','Fire','Earth','Metal','Water'];
const meanings = {
  1: ['The Initiator','Independence, initiative and self-direction.','Create momentum through one deliberate first step.'],
  2: ['The Diplomat','Cooperation, sensitivity and thoughtful partnerships.','Listen carefully before choosing your next move.'],
  3: ['The Communicator','Expression, creativity and social confidence.','Make something and share your perspective.'],
  4: ['The Builder','Structure, consistency and practical progress.','Put a reliable system behind your ambition.'],
  5: ['The Explorer','Adaptability, movement and curiosity.','Experiment, but keep one anchor in place.'],
  6: ['The Guardian','Responsibility, care and commitment.','Give important relationships focused attention.'],
  7: ['The Analyst','Introspection, study and independent thought.','Give yourself space to question assumptions.'],
  8: ['The Strategist','Ambition, discipline and material stewardship.','Make your next decision with clear boundaries.'],
  9: ['The Humanitarian','Completion, compassion and wider perspective.','Finish something before starting another.'],
  11: ['The Visionary','Intuition, inspiration and heightened sensitivity.','Translate inspiration into a tangible action.'],
  22: ['The Master Builder','Long-range thinking, organisation and scale.','Turn the big vision into a workable plan.'],
  33: ['The Teacher','Service, mentorship and conscientious care.','Support others without ignoring your own limits.']
};
export const meaning = n => meanings[n] || meanings[reduce(n)];
export function digitSum(value) {return String(value).replace(/\D/g,'').split('').reduce((a,c)=>a+Number(c),0)}
export function reduce(value, masters=true){let n=Number(value);while(n>9 && !(masters && [11,22,33].includes(n))) n=digitSum(n);return n}
export function parseDate(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value||''))return null; const [y,m,d]=value.split('-').map(Number);const date=new Date(y,m-1,d,12);return date.getFullYear()===y&&date.getMonth()===m-1&&date.getDate()===d?date:null}
export function lifePath(value){const date=parseDate(value);if(!date)return null;return reduce(digitSum(value))}
export function birthdayNumber(value){const date=parseDate(value);return date?reduce(date.getDate()):null}
export function personalYear(birth, at){const b=parseDate(birth);if(!b)return null;return reduce(digitSum(b.getMonth()+1)+digitSum(b.getDate())+digitSum(at.getFullYear()))}
export function universalDay(at){return reduce(digitSum(at.getFullYear())+digitSum(at.getMonth()+1)+digitSum(at.getDate()))}
export function personalMonth(birth,at){const y=personalYear(birth,at);return y===null?null:reduce(y+at.getMonth()+1)}
export function personalDay(birth,at){const m=personalMonth(birth,at);return m===null?null:reduce(m+at.getDate())}
export function chineseZodiac(value){const date=typeof value==='string'?parseDate(value):value;if(!date)return null;
  // Intl's Chinese calendar uses the actual lunar-year boundary, unlike Gregorian-year shortcuts.
  const parts=new Intl.DateTimeFormat('en-US-u-ca-chinese',{year:'numeric',month:'numeric',day:'numeric'}).formatToParts(date);
  const lunarYear=Number(parts.find(p=>p.type==='relatedYear')?.value);
  if(!Number.isFinite(lunarYear))return null;
  const animal=animals[((lunarYear-2020)%12+12)%12];
  const element=elements[Math.floor((((lunarYear-1984)%10+10)%10)/2)];
  const polarity=((lunarYear-1984)%2+2)%2===0?'Yang':'Yin';
  return {animal,element,polarity,lunarYear};
}
export function sunSign(value){const d=parseDate(value);if(!d)return null;const n=(d.getMonth()+1)*100+d.getDate();const signs=[[120,'Capricorn'],[219,'Aquarius'],[321,'Pisces'],[420,'Aries'],[521,'Taurus'],[621,'Gemini'],[723,'Cancer'],[823,'Leo'],[923,'Virgo'],[1023,'Libra'],[1122,'Scorpio'],[1222,'Sagittarius'],[1232,'Capricorn']];return signs.find(([limit])=>n<limit)?.[1]||'Capricorn'}
export function compatibility(a,b){const za=chineseZodiac(a),zb=chineseZodiac(b),la=lifePath(a),lb=lifePath(b);if(!za||!zb||la===null||lb===null)return null;const triads=[['Rat','Dragon','Monkey'],['Ox','Snake','Rooster'],['Tiger','Horse','Dog'],['Rabbit','Goat','Pig']];const clashes=[['Rat','Horse'],['Ox','Goat'],['Tiger','Monkey'],['Rabbit','Rooster'],['Dragon','Dog'],['Snake','Pig']];const sameTriad=triads.some(t=>t.includes(za.animal)&&t.includes(zb.animal));const clash=clashes.some(t=>t.includes(za.animal)&&t.includes(zb.animal));const sameLife=la===lb;return {za,zb,la,lb,sameTriad,clash,sameLife,description:clash?'Traditionally considered an opposing animal pairing. Differences can encourage thoughtful communication.':sameTriad?'Both animals belong to the same traditional harmony group. Shared priorities may feel familiar.':'A mixed traditional pairing. Use your distinct strengths as conversation starters.'}}
export function isoLocal(date){const y=date.getFullYear(),m=String(date.getMonth()+1).padStart(2,'0'),d=String(date.getDate()).padStart(2,'0');return `${y}-${m}-${d}`}
export function formatDate(date){return new Intl.DateTimeFormat('en-ZA',{day:'numeric',month:'long',year:'numeric'}).format(date)}
