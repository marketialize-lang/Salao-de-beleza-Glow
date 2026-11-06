import {describe,it,expect} from 'vitest';
import {totals,services} from './glow';
import {isClosedDay,brDateTime} from '../lib/glow-booking';
import {pixPayload,crc16} from '../lib/glow-pix';
describe('GLOW commercial rules',()=>{
it('Monday is closed',()=>expect(isClosedDay('2026-10-19')).toBe(true));
it('Tuesday through Sunday are not closed',()=>{for(const day of ['2026-10-20','2026-10-21','2026-10-22','2026-10-23','2026-10-24','2026-10-25'])expect(isClosedDay(day)).toBe(false)});
it('two services do not receive discount',()=>expect(totals(['corte','manicure']).discount).toBe(0));
it('three services receive 15 percent',()=>expect(totals(['corte','manicure','pedicure'])).toMatchObject({subtotal:19000,discount:2850,total:16150}));
it('five services receive 15 percent',()=>expect(totals(['corte','manicure','pedicure','sollus','wella']).discount).toBe(5550));
it('rounds centavos',()=>expect(totals(['combo-medio','manicure','pedicure']).discount).toBe(6105));
it('selects each service once',()=>expect(totals(['corte','corte']).count).toBe(1));
it('gourmet is not a procedure',()=>expect(totals(['corte','manicure','agua']).discount).toBe(0));
it('short combo costs 310 reais',()=>expect(services.find(s=>s.id==='combo-curto')?.price).toBe(31000));
it('medium combo costs 327 reais',()=>expect(services.find(s=>s.id==='combo-medio')?.price).toBe(32700));
it('shows reserved time without seconds',()=>expect(brDateTime('2026-10-15T13:00:00-03:00')).toBe('15/10/2026 às 13:00'));
it('Pix contains total and correct checksum',()=>{const p=pixPayload(16150);expect(p).toContain('5406161.50');expect(p.slice(-4)).toBe(crc16(p.slice(0,-4)));});
});
