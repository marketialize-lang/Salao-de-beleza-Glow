export function isClosedDay(_day:string){return false;}
export function brDateTime(v:string){const d=new Date(v);return `${d.toLocaleDateString('pt-BR',{timeZone:'America/Sao_Paulo'})} às ${d.toLocaleTimeString('pt-BR',{timeZone:'America/Sao_Paulo',hour:'2-digit',minute:'2-digit'})}`;}
