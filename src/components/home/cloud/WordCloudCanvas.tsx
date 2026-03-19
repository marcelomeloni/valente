'use client';

import { useEffect, useRef } from 'react';

const CW = 1400;
const CH = 480;

// All terms from Valente's research profile (Lattes/Unicamp)
const WORDS = [
  { text: 'TECNOLOGIAS DA INFORMAÇÃO E COMUNICAÇÃO', weight: 10 },
  { text: 'INFORMÁTICA NA EDUCAÇÃO', weight: 8 },
  { text: 'TECNOLOGIAS DIGITAIS DE INFORMAÇÃO E COMUNICAÇÃO', weight: 7 },
  { text: 'CONSTRUÇÃO DE CONHECIMENTO', weight: 7 },
  { text: 'FORMAÇÃO DE PROFESSORES', weight: 6 },
  { text: 'ENSINO-APRENDIZAGEM', weight: 5 },
  { text: 'TECNOLOGIAS NA EDUCAÇÃO', weight: 5 },
  { text: 'EDUCAÇÃO A DISTÂNCIA', weight: 5 },
  { text: 'TECNOLOGIA EDUCACIONAL', weight: 5 },
  { text: 'APRENDIZAGEM', weight: 4 },
  { text: 'CONSTRUCIONISMO', weight: 4 },
  { text: 'FORMAÇÃO DE EDUCADORES', weight: 4 },
  { text: 'ESPIRAL DE APRENDIZAGEM', weight: 4 },
  { text: 'EDUCAÇÃO ESPECIAL', weight: 3 },
  { text: 'EDUCAÇÃO À DISTÂNCIA', weight: 3 },
  { text: 'FORMAÇÃO PROFISSIONAL', weight: 3 },
  { text: 'PENSAMENTO COMPUTACIONAL', weight: 3 },
  { text: 'ENSINO FUNDAMENTAL', weight: 3 },
  { text: 'CULTURA DIGITAL', weight: 3 },
  { text: 'APRENDIZAGEM ATIVA', weight: 3 },
  { text: 'REDES SOCIAIS', weight: 3 },
  { text: 'NARRATIVAS DIGITAIS', weight: 3 },
  { text: 'INTEGRAÇÃO DE MÍDIAS', weight: 3 },
  { text: 'FORMAÇÃO DE EDUCADORES', weight: 3 },
  { text: 'CURRÍCULO', weight: 3 },
  { text: 'LOGO', weight: 2 },
  { text: 'INTERNET', weight: 2 },
  { text: 'JOGOS DIGITAIS', weight: 2 },
  { text: 'TECNOLOGIAS MÓVEIS', weight: 2 },
  { text: 'INOVAÇÃO PEDAGÓGICA', weight: 2 },
  { text: 'INTERAÇÃO', weight: 2 },
  { text: 'DESIGN', weight: 2 },
  { text: 'MÍDIA', weight: 2 },
  { text: 'INCLUSÃO DIGITAL', weight: 2 },
  { text: 'REALIDADE AUMENTADA', weight: 2 },
  { text: 'AMBIENTE VIRTUAL', weight: 2 },
  { text: 'ENSINO DE CIÊNCIAS', weight: 2 },
  { text: 'ENSINO SUPERIOR', weight: 2 },
  { text: 'LETRAMENTO DIGITAL', weight: 2 },
  { text: 'ENSINO BÁSICO', weight: 2 },
  { text: 'ESPAÇO MAKER', weight: 2 },
  { text: 'SALA DE AULA INVERTIDA', weight: 2 },
  { text: 'APRENDIZAGEM CONTINUADA', weight: 2 },
  { text: 'COLABORAÇÃO', weight: 2 },
  { text: 'CURADORIA', weight: 2 },
  { text: 'LAPTOPS EDUCACIONAIS', weight: 2 },
  { text: 'ENACTIVISM', weight: 2 },
  { text: 'ARTE, CIÊNCIA E TECNOLOGIA', weight: 2 },
  { text: 'COMUNIDADE DE APRENDIZAGEM', weight: 2 },
  { text: 'ENSINO E APRENDIZAGEM', weight: 2 },
  { text: 'EDUCATIONAL TECHNOLOGY', weight: 1 },
  { text: 'INOVAÇÃO', weight: 1 },
  { text: 'SOCIOENACTIVE SYSTEMS', weight: 1 },
  { text: 'CONTEXTOS DE APRENDIZAGEM', weight: 1 },
  { text: 'PRÁTICAS PEDAGÓGICAS', weight: 1 },
  { text: 'COMUNIDADES VIRTUAIS', weight: 1 },
  { text: 'CRIAÇÃO DE JOGOS', weight: 1 },
  { text: 'METODOLOGIA DA PESQUISA', weight: 1 },
  { text: 'EDUCAÇÃO MATEMÁTICA', weight: 1 },
  { text: 'PROJETO UCA', weight: 1 },
  { text: 'GESTÃO DO CONHECIMENTO', weight: 1 },
  { text: 'PRÁTICA PEDAGÓGICA', weight: 1 },
  { text: 'DESENVOLVIMENTO COGNITIVO', weight: 1 },
  { text: 'TEORIA DO CONHECIMENTO', weight: 1 },
  { text: 'CRIAÇÃO DE CONHECIMENTO', weight: 1 },
  { text: 'CIÊNCIA DA COMPUTAÇÃO', weight: 1 },
  { text: 'LETRAMENTOS', weight: 1 },
  { text: 'E-LEARNING', weight: 1 },
  { text: 'REFLEXÃO', weight: 1 },
  { text: 'METODOLOGIAS ATIVAS', weight: 1 },
  { text: 'MEDIAÇÃO', weight: 1 },
];

// Color: unicamp red for highest weight, zinc gradient for the rest
function getColor(weight: number): string {
  if (weight >= 8) return '#fd0002';
  if (weight >= 5) return '#18181b';
  if (weight >= 3) return '#3f3f46';
  if (weight >= 2) return '#71717a';
  return '#a1a1aa';
}

function getFontSize(weight: number): number {
  const min = 10;
  const max = 46;
  return Math.round(min + ((weight - 1) / 9) * (max - min));
}

interface Placed {
  x: number;
  y: number;
  w: number;
  h: number;
}

function overlaps(a: Placed, b: Placed, pad = 6): boolean {
  return !(
    a.x + a.w + pad < b.x ||
    b.x + b.w + pad < a.x ||
    a.y + a.h + pad < b.y ||
    b.y + b.h + pad < a.y
  );
}

export function WordCloudCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Wait for fonts to load so measureText is accurate
    document.fonts.ready.then(() => {
      ctx.clearRect(0, 0, CW, CH);

      const placed: Placed[] = [];
      const renders: Array<{ text: string; x: number; y: number; fontSize: number; color: string }> = [];

      const sorted = [...WORDS].sort((a, b) => b.weight - a.weight);
      const cx = CW / 2;
      const cy = CH / 2;

      for (const word of sorted) {
        const fontSize = getFontSize(word.weight);
        const fontStr = `600 ${fontSize}px Inter, Arial, sans-serif`;
        ctx.font = fontStr;

        const measured = ctx.measureText(word.text);
        const ww = measured.width;
        const wh = fontSize * 1.25;

        let ok = false;

        // Archimedean spiral — elliptical (wider than tall to match banner shape)
        for (let r = 0; r <= Math.max(CW, CH) * 0.55; r += 1.8) {
          const steps = Math.max(1, Math.floor((2 * Math.PI * (r || 1)) / 8));
          const angleOffset = r * 0.35; // rotate start angle per radius to avoid alignment

          for (let i = 0; i < steps; i++) {
            const angle = angleOffset + (i / steps) * 2 * Math.PI;
            const tx = cx + r * 2.6 * Math.cos(angle) - ww / 2;
            const ty = cy + r * 0.92 * Math.sin(angle) - wh / 2;

            // Keep within canvas bounds with padding
            if (tx < 2 || tx + ww > CW - 2 || ty < 2 || ty + wh > CH - 2) continue;

            const candidate: Placed = { x: tx, y: ty, w: ww, h: wh };
            const collision = placed.some((p) => overlaps(p, candidate));

            if (!collision) {
              placed.push(candidate);
              renders.push({
                text: word.text,
                x: tx,
                y: ty + fontSize,
                fontSize,
                color: getColor(word.weight),
              });
              ok = true;
              break;
            }
          }
          if (ok) break;
        }
      }

      // Draw all words
      for (const r of renders) {
        ctx.font = `600 ${r.fontSize}px Inter, Arial, sans-serif`;
        ctx.fillStyle = r.color;
        ctx.fillText(r.text, r.x, r.y);
      }
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={CW}
      height={CH}
      aria-label="Nuvem de palavras com os temas de pesquisa de José Armando Valente"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    />
  );
}