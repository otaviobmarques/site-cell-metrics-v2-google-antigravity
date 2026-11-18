import React, { useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import { BatteryScanVideo, BatteryScanProps } from '../remotion/BatteryScanVideo';
import { ShieldCheck, AlertTriangle, Sparkles } from 'lucide-react';

interface PresetScenario {
  id: string;
  label: string;
  badge: string;
  props: BatteryScanProps;
}

const SCENARIOS: PresetScenario[] = [
  {
    id: 'healthy-ev',
    label: 'Cenário 1: Elétrico Seminovo Saudável',
    badge: 'SoH 95% · Compra/Venda Ideal',
    props: {
      vehicleName: 'BYD Dolphin GS · 2024',
      soh: 95,
      packVoltage: 398.4,
      tempC: 24.2,
      cellDeltaMv: 10,
      hasWeakCell: false,
      savingsLabel: 'Venda Valorizada sem Deságio',
    },
  },
  {
    id: 'degraded-ev',
    label: 'Cenário 2: Desgaste Oculto por Recarga Rápida',
    badge: 'SoH 76% · Alerta de Célula',
    props: {
      vehicleName: 'SUV Elétrico Importado · 2022',
      soh: 76,
      packVoltage: 379.2,
      tempC: 31.8,
      cellDeltaMv: 74,
      hasWeakCell: true,
      savingsLabel: 'Prejuízo Evitado na Compra',
    },
  },
  {
    id: 'phev-fleet',
    label: 'Cenário 3: Híbrido Plug-in (Lojas & Frotas)',
    badge: 'SoH 92% · Estoque Certificado',
    props: {
      vehicleName: 'GWM Haval H6 PHEV34 · 2024',
      soh: 92,
      packVoltage: 368.0,
      tempC: 25.0,
      cellDeltaMv: 14,
      hasWeakCell: false,
      savingsLabel: 'Segurança na Captação e Venda',
    },
  },
];

export const RemotionShowcase: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobileViewport(window.innerWidth < 640);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const currentScenario = SCENARIOS[selectedIdx];
  const compWidth = isMobileViewport ? 440 : 860;
  const compHeight = isMobileViewport ? 560 : 480;

  return (
    <div className="w-full">
      {/* Responsive Scenario Switcher Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-4 bg-[#151B20] p-2.5 rounded-2xl border border-white/10">
        {SCENARIOS.map((item, idx) => {
          const isActive = idx === selectedIdx;
          const isWarning = item.props.hasWeakCell;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-[#15623F] to-[#1E7E52] text-white shadow-glow-forest border border-[#90BE3D]/60'
                  : 'hover:bg-white/5 text-slate-300 border border-white/5'
              }`}
            >
              <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#90BE3D] flex items-center gap-1.5">
                  {isWarning ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  ) : (
                    <ShieldCheck className="w-3.5 h-3.5 text-[#90BE3D] shrink-0" />
                  )}
                  <span className="truncate">{item.badge}</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5">
                  {item.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Remotion Player Container with Adaptive Mobile/Desktop Aspect Ratio */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#90BE3D]/45 shadow-glow-lime bg-[#1F262C]">
        <Player
          component={BatteryScanVideo}
          inputProps={{
            ...currentScenario.props,
            isMobile: isMobileViewport,
          }}
          durationInFrames={360}
          fps={30}
          compositionWidth={compWidth}
          compositionHeight={compHeight}
          style={{
            width: '100%',
            aspectRatio: `${compWidth} / ${compHeight}`,
          }}
          controls
          autoPlay
          loop
          acknowledgeRemotionLicense
        />

        {/* Responsive Bottom Caption Bar */}
        <div className="bg-[#151B20] px-4 py-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-200">
          <div className="flex items-start sm:items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#90BE3D] shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong className="text-white">Simulação Interativa (Remotion):</strong>{' '}
              Veja como o scanner AVILOO lê a bateria por dentro sem desmontar nada.
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#90BE3D]">
            Toque nos cenários acima para alternar
          </span>
        </div>
      </div>
    </div>
  );
};
