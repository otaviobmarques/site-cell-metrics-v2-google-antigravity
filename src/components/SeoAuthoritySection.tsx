import React from 'react';
import { MapPin, CheckCircle2, Search, ShieldCheck, Cpu } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/cellmetricsData';

const CITIES_SERVED = [
  'Campinas (Centro, Cambuí, Taquaral, Barão Geraldo, Alphaville, Swiss Park)',
  'Valinhos',
  'Vinhedo',
  'Indaiatuba',
  'Paulínia',
  'Sumaré',
  'Hortolândia',
  'Americana',
  'Jaguariúna',
  'Itatiba',
  'Jundiaí',
  'Piracicaba & Região (sob consulta)',
];

const KEYWORD_PILLARS = [
  {
    title: 'Laudo Pré-Compra para Carros Elétricos e Híbridos Seminovos',
    keywords: 'Vistoria de bateria EV · Avaliação antes da compra · SoH real',
    content:
      'Ao buscar um carro elétrico ou híbrido usado, a vistoria cautelar tradicional avalia apenas chassi, pintura e documentação, deixando de fora o item mais caro do veículo: a bateria de alta tensão. O laudo pré-compra da Cell Metrics mede a capacidade energética real (State of Health - SoH) e identifica células degradadas por recargas rápidas (eletropostos DC) antes de você fechar negócio.',
  },
  {
    title: 'Diagnóstico Especializado BYD, GWM, Volvo, Porsche e BMW',
    keywords: 'Bateria LFP Blade · Química NMC · Híbridos Plug-in PHEV',
    content:
      'Realizamos leitura profunda via barramento CAN/OBD nos veículos eletrificados mais vendidos do Brasil: BYD Dolphin, Dolphin Mini, Seal, Yuan Plus e Song Plus DM-i; GWM Ora 03 e Haval H6 PHEV; Volvo EX30, XC40 e C40 Recharge; além de Porsche Taycan, BMW iX/i4, Renault Kwid/Megane E-Tech, CAOA Chery Tiggo 8 Pro Plug-in e Audi e-tron.',
  },
  {
    title: 'Certificação Independente AVILOO para Venda e Concessionárias',
    keywords: 'Selo de qualidade · Valorização na revenda · Giro de estoque',
    content:
      'Proprietários particulares e lojas de seminovos em Campinas utilizam o Certificado Oficial Cell Metrics (homologado pela austríaca AVILOO) para comprovar a integridade da bateria de tração. É a garantia documental que elimina a insegurança do comprador, evita deságios injustos na tabela FIPE e acelera a venda.',
  },
];

export const SeoAuthoritySection: React.FC = () => {
  return (
    <section
      id="cobertura-seo"
      aria-label="Cobertura Regional em Campinas e Especialidades em Diagnóstico de Baterias"
      className="py-16 lg:py-20 bg-[#090D11] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Keyword Pillars (Semantic Articles for Search Engines & Informed Buyers) */}
        <div>
          <div className="flex items-center gap-2 text-[#90BE3D] text-xs font-extrabold uppercase tracking-widest mb-2">
            <Search className="w-4 h-4" />
            <span>Especialistas em Inteligência de Baterias de Alta Tensão</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Por que o Laudo de Bateria Cell Metrics é indispensável no mercado de elétricos e híbridos?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {KEYWORD_PILLARS.map((pillar) => (
              <article
                key={pillar.title}
                className="bg-[#111820] border border-white/10 rounded-2xl p-6 space-y-3"
              >
                <span className="inline-block text-[11px] font-mono text-[#90BE3D] bg-[#90BE3D]/10 px-2.5 py-1 rounded-md border border-[#90BE3D]/25">
                  {pillar.keywords}
                </span>
                <h3 className="text-base font-extrabold text-white leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pillar.content}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Local SEO Coverage Box (Campinas & RMC) */}
        <div className="bg-[#121920] border border-white/10 rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15623F]/40 border border-[#90BE3D]/35 text-[#BEF264] text-xs font-extrabold uppercase">
                <MapPin className="w-3.5 h-3.5 text-[#90BE3D]" />
                <span>Atendimento Móvel In-Loco</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Onde realizamos o teste de bateria em Campinas e Região?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Nossa unidade móvel vai até a residência do vendedor, concessionária, loja de seminovos ou pátio corporativo em toda a{' '}
                <strong className="text-white">Região Metropolitana de Campinas (RMC)</strong> e interior de São Paulo:
              </p>
              <div className="pt-2">
                <a
                  href={buildWhatsAppUrl(
                    'Olá! Gostaria de consultar a disponibilidade de atendimento no local na minha cidade.'
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-[#90BE3D] hover:underline"
                >
                  <span>Consultar agendamento para a sua cidade →</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                {CITIES_SERVED.map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B0F13] border border-white/10 text-xs font-semibold text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#90BE3D] shrink-0" />
                    <span>{city}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
