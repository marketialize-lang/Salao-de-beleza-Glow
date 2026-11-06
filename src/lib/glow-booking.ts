export function isClosedDay(day:string){return new Date(`${day}T12:00:00-03:00`).getUTCDay()===1;}
export function brDateTime(v:string){const d=new Date(v);return `${d.toLocaleDateString('pt-BR',{timeZone:'America/Sao_Paulo'})} às ${d.toLocaleTimeString('pt-BR',{timeZone:'America/Sao_Paulo',hour:'2-digit',minute:'2-digit'})}`;}
