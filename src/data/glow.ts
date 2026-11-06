import wide from '@/assets/salon-wide.asset.json';
import sofa from '@/assets/salon-sofa.asset.json';
import detail from '@/assets/salon-detail.asset.json';
import chair from '@/assets/salon-chair.asset.json';
import logo from '@/assets/logo.asset.json';
import coffee from '@/assets/coffee.asset.json';
import nails from '@/assets/nails.asset.json';
import f1 from '@/assets/feedback-1.asset.json';
import f2 from '@/assets/feedback-2.asset.json';
import f3 from '@/assets/feedback-3.asset.json';
import f4 from '@/assets/feedback-4.asset.json';
import f5 from '@/assets/feedback-5.asset.json';
export const photos=[{url:wide.url,alt:'Salão GLOW com televisão, sofá e janela'},{url:sofa.url,alt:'Sofá e mesa do salão GLOW'},{url:detail.url,alt:'Aparador e xícaras do salão GLOW'},{url:chair.url,alt:'Cadeira de atendimento e luminária GLOW'}];
export const media={logo:logo.url,coffee:coffee.url,nails:nails.url,feedbacks:[f1.url,f2.url,f3.url,f4.url,f5.url]};
export const contacts={whatsapp:'5515996793100',pix:'+5515996793100',recipient:'Juliana A de Matos Paulino',city:'ITAPETININGA',address:'R. Pedro Moreira, 200 - Vila Rio Branco, Itapetininga - SP, CEP 18208-230',instagram:'glowjulianamatos'};
export type Service={id:string;name:string;category:string;price:number;from?:boolean;description?:string;featured?:boolean};
export const services:Service[]=[
{id:'combo-curto',name:'Combo Glow',category:'Combos',price:31000,description:'Corte + Progressiva + Pré-Química · cabelo curto',featured:true},
{id:'combo-medio',name:'Combo Glow · médio',category:'Combos',price:32700,description:'Corte + Progressiva + Pré-Química · cabelo médio'},
{id:'corte',name:'Corte',category:'Cabelo',price:11000,from:true,featured:true},
{id:'progressiva',name:'Progressiva / Botox',category:'Cabelo',price:20000,from:true,featured:true},
{id:'mechas',name:'Mechas / Ruivo',category:'Cabelo',price:45000,from:true,featured:true},
{id:'raiz',name:'Retoque de raiz',category:'Cabelo',price:12500,from:true},
{id:'tintura',name:'Tintura',category:'Cabelo',price:15000,from:true,description:'Cabelo inteiro'},
{id:'tonalizacao',name:'Tonalização',category:'Cabelo',price:11000,description:'Com finalização'},
{id:'escova',name:'Pacote mensal de escova',category:'Cabelo',price:20000,from:true},
{id:'cronograma-wella',name:'Cronograma Wella',category:'Tratamentos',price:21000,description:'2 sessões'},
{id:'cronograma-sollus',name:'Cronograma Sollus',category:'Tratamentos',price:15000,description:'2 sessões'},
{id:'wella',name:'Tratamento Wella',category:'Tratamentos',price:10500},
{id:'sollus',name:'Tratamento Sollus',category:'Tratamentos',price:7500},
{id:'tratamento',name:'Tratamento avulso',category:'Tratamentos',price:11000},
{id:'manicure',name:'Manicure',category:'Unhas',price:4000,featured:true},
{id:'pedicure',name:'Pedicure',category:'Unhas',price:4000}];
export const money=(c:number)=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(c/100);
export function totals(ids:string[]){const chosen=services.filter(s=>ids.includes(s.id));const subtotal=chosen.reduce((a,s)=>a+s.price,0);const discount=chosen.length>=3?Math.round(subtotal*.15):0;return {subtotal,discount,total:subtotal-discount,count:chosen.length};}
export const faqs=[{q:'Como funciona o desconto?',a:'Escolhendo 3 ou mais serviços no mesmo atendimento, você ganha 15% sobre o total dos serviços. O desconto aparece sozinho no carrinho.'},{q:'Como eu pago?',a:'Por Pix: escaneie o QR Code ou copie a chave. Depois, envie o comprovante pelo WhatsApp. A confirmação é feita pela equipe.'},{q:'Como escolho o horário?',a:'Depois de escolher os serviços, selecione um dia e horário disponíveis. Sua reserva aguarda o comprovante e a confirmação da equipe.'}];
