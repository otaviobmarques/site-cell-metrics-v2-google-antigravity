import React, { useState } from 'react';
import {
  FileCheck2,
  Sliders,
  BatteryCharging,
  Thermometer,
  Activity,
  ArrowUpRight,
} from 'lucide-react';
import { buildWhatsAppUrl } from '../data/cellmetricsData';
import { BrandLogo, HexChargeIndicator } from './BrandElements';

interface SimVehicle {
  name: string;
  vinPrefix: string;
  originalRangeKm: number;
  fipeValue: number;
  packCost: number;
  voltage: number;
}

const SIM_VEHICLES: SimVehicle[] = [
  {
    name: 'BYD Dolphin GS 100% Elétrico (2024)',
    vinPrefix: 'LGXC14AA8R0******',
    originalRangeKm: 405,
    fipeValue: 142000,
    packCost: 68000,
    voltage: 398.4,
  },
  {
    name: 'GWM Haval H6 PHEV34 AWD (2024)',
    vinPrefix: 'LGWFF6A59R2******',
    originalRangeKm: 170,
    fipeValue: 248000,
    packCost: 64000,
    voltage: 368.0,
  },
  {
    name: 'Volvo XC40 Recharge Plus (2023)',
    vinPrefix: 'YV1XZEDV4P2******',
    originalRangeKm: 420,
    fipeValue: 265000,
    packCost: 112000,
    voltage: 404.2,
  },
  {
    name: 'BYD Song Plus DM-i Híbrido (2023)',
    vinPrefix: 'LGXCE4CB1P0******',
    originalRangeKm: 110,
    fipeValue: 198000,
    packCost: 46000,
    voltage: 352.0,
  },
];

export const InteractiveReportSimulator: React.FC = () => {
  const [selectedCarIdx, setSelectedCarIdx] = useState(0);
  const [soh, setSoh] = useState(88);
  const [simulateWeakCell, setSimulateWeakCell] = useState(false);

  const car = SIM_VEHICLES[selectedCarIdx];
  const effectiveSoh = simulateWeakCell ? Math.min(soh, 74) : soh;
  const currentRangeKm = Math.round((car.originalRangeKm * effectiveSoh) / 100);
  const lostRangeKm = car.originalRangeKm - currentRangeKm;

  // WCAG 2.1 Compliant Colors (Page 16: on light background, use #15623F or #1F262C, never #90BE3D for text)
  const getStatusInfo = (val: number, weakCell: boolean) => {
    if (weakCell || val < 76) {
      return {
        grade: 'ALERTA CRÍTICO · CÉLULA DESBALANCEADA',
        darkTextHex: '#EF4444',
        lightTextHex: '#B91C1C',
        reportBadge: 'bg-red-700 text-white',
        negotiationText: `Desconto técnico recomendado na compra: -R$ ${Math.round(
          car.packCost * 0.45
        ).toLocaleString('pt-BR')}`,
        advice:
          'Célula em desequilíbrio severo ou degradação acentuada. Não feche negócio sem abater o custo de reparo dos módulos.',
      };
    }
    if (val < 86) {
      return {
        grade: 'ATENÇÃO · DESGASTE ACIMA DA MÉDIA',
        darkTextHex: '#F59E0B',
        lightTextHex: '#B45309',
        reportBadge: 'bg-amber-700 text-white',
        negotiationText: `Argumento real para negociar de -R$ ${Math.round(
          car.packCost * 0.18
        ).toLocaleString('pt-BR')} a -R$ ${Math.round(
          car.packCost * 0.28
        ).toLocaleString('pt-BR')}`,
        advice:
          'Bateria funcional, mas com perda perceptível por ciclos de recarga rápida (DC). Excelente munição para reduzir o valor pedido.',
      };
    }
    return {
      grade: 'LAUDO APROVADO · SAÚDE EXCELENTE',
      darkTextHex: '#90BE3D',
      lightTextHex: '#15623F', // AAA contrast 7.37:1 on white (Page 16)
      reportBadge: 'bg-[#15623F] text-white',
      negotiationText: `Valorização comprovada: preserva até +R$ ${Math.round(
        car.fipeValue * 0.065
      ).toLocaleString('pt-BR')} na tabela`,
      advice:
        'Bateria íntegra com células perfeitamente equalizadas. Ideal para comprar com tranquilidade total ou vender rápido sem dar desconto.',
    };
  };

  const status = getStatusInfo(effectiveSoh, simulateWeakCell);
  const deltaMv = simulateWeakCell
    ? 78
    : Math.max(8, Math.round((100 - effectiveSoh) * 1.4));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Controls & 4 Readings Breakdown */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#1F262C] border border-white/15 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-2 text-[#90BE3D] text-xs font-medium uppercase tracking-[0.2em] mb-3">
            <Sliders className="w-4 h-4" />
            <span>Simulador Interativo do Laudo</span>
          </div>
          <h3 className="text-xl font-extrabold text-white mb-2">
            Simule na prática o Relatório Oficial Cell Metrics
          </h3>
          <p className="text-sm text-slate-200 mb-5 font-normal">
            Escolha um veículo e arraste o controle de Estado de Saúde (SoH) para visualizar o documento oficial (padrão Design System 1.0) e o impacto financeiro na negociação.
          </p>

          {/* Vehicle Selector */}
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              1. Escolha um veículo de exemplo:
            </label>
            <div className="grid grid-cols-1 gap-2">
              {SIM_VEHICLES.map((v, i) => (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => setSelectedCarIdx(i)}
                  className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                    selectedCarIdx === i
                      ? 'bg-[#15623F] border-[#90BE3D] text-white'
                      : 'bg-[#151B20] border-white/10 text-slate-200 hover:border-white/30'
                  }`}
                >
                  <span>{v.name}</span>
                  <span className="text-[11px] font-bold text-[#90BE3D]">
                    Pack ~R$ {(v.packCost / 1000).toFixed(0)}k
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* SoH Slider */}
          <div className="mb-5 bg-[#151B20] p-4 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                2. Simule o Estado de Saúde (SoH):
              </span>
              <span
                className="text-2xl font-extrabold"
                style={{ color: status.darkTextHex }}
              >
                {effectiveSoh}%
              </span>
            </div>
            <input
              type="range"
              min={62}
              max={100}
              value={soh}
              onChange={(e) => {
                setSoh(Number(e.target.value));
                if (Number(e.target.value) > 80 && simulateWeakCell) {
                  setSimulateWeakCell(false);
                }
              }}
              className="cm-slider"
            />
            <div className="flex justify-between text-[11px] font-medium text-slate-300 mt-2">
              <span>62% (Degradada)</span>
              <span>85% (Atenção)</span>
              <span>100% (Nova)</span>
            </div>
          </div>

          {/* Toggle Weak Cell Anomaly */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#151B20] border border-white/10">
            <div>
              <div className="text-xs font-bold text-white">
                Simular Célula Defeituosa Oculta
              </div>
              <div className="text-[11px] text-slate-300">
                Quando apenas 1 célula puxa todo o pack para baixo
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSimulateWeakCell(!simulateWeakCell)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                simulateWeakCell
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {simulateWeakCell ? 'ATIVO (Célula #08 Fraca)' : 'Simular Falha'}
            </button>
          </div>
        </div>

        {/* 4 Readings Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="bg-[#1F262C] border border-white/10 rounded-2xl p-4">
            <div className="w-8 h-8 rounded-lg bg-[#90BE3D]/15 border border-[#90BE3D]/30 flex items-center justify-center text-[#90BE3D] mb-2.5">
              <BatteryCharging className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-extrabold text-white">
              1. Estado de saúde (SoH)
            </h4>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed font-normal">
              Quanto da capacidade original a bateria ainda tem. É o número que mais pesa no valor do carro.
            </p>
          </div>

          <div className="bg-[#1F262C] border border-white/10 rounded-2xl p-4">
            <div className="w-8 h-8 rounded-lg bg-[#90BE3D]/15 border border-[#90BE3D]/30 flex items-center justify-center text-[#90BE3D] mb-2.5">
              <Activity className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-extrabold text-white">
              2. Células, uma a uma
            </h4>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed font-normal">
              Mostra se alguma célula está mais fraca que as outras e puxando o conjunto para baixo.
            </p>
          </div>

          <div className="bg-[#1F262C] border border-white/10 rounded-2xl p-4">
            <div className="w-8 h-8 rounded-lg bg-[#90BE3D]/15 border border-[#90BE3D]/30 flex items-center justify-center text-[#90BE3D] mb-2.5">
              <Thermometer className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-extrabold text-white">
              3. Condição do pack
            </h4>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed font-normal">
              Tensão, temperatura e integridade do sistema da bateria no momento do teste.
            </p>
          </div>

          <div className="bg-[#1F262C] border border-white/10 rounded-2xl p-4">
            <div className="w-8 h-8 rounded-lg bg-[#90BE3D]/15 border border-[#90BE3D]/30 flex items-center justify-center text-[#90BE3D] mb-2.5">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-extrabold text-white">4. Laudo em PDF</h4>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed font-normal">
              Identifica o carro pelo chassi e a data do teste. Fácil de enviar ao comprador ou à loja.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Official A4 Report Template (Page 21 of Brand Manual DS 1.0) */}
      <div className="lg:col-span-7">
        <div className="bg-[#FFFFFF] text-[#1F262C] rounded-3xl shadow-2xl border border-[#E3DED6] overflow-hidden">
          {/* Official Dark Report Header (#1F262C with Vertical Logo + Colmeia Escuro - Page 21) */}
          <div className="bg-[#1F262C] bg-hex-pattern px-6 sm:px-8 py-6 flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#90BE3D]">
            <BrandLogo
              variant="vertical-dark"
              className="h-20 w-auto"
              alt="Cell Metrics · Inteligência em Baterias"
            />
            <div className="flex flex-col items-end">
              <span
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${status.reportBadge}`}
              >
                {status.grade}
              </span>
              <span className="text-[11px] font-medium text-slate-300 mt-1.5">
                DOCUMENTO INTERATIVO · CAMPOS ILUSTRATIVOS
              </span>
            </div>
          </div>

          {/* Report Body (White #FFFFFF / Paper #F8F5F1 with WCAG AAA Contrast) */}
          <div className="p-6 sm:p-8">
            <div className="inline-block px-3 py-1 rounded-full border border-dashed border-[#333D46] text-[11px] font-bold uppercase tracking-widest text-[#333D46] mb-3">
              SIMULAÇÃO DE RESULTADO · VALOR ILUSTRATIVO
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#15623F] uppercase tracking-tight">
              LAUDO DE SAÚDE DA BATERIA
            </h3>
            <p className="text-xs font-medium text-[#333D46] mt-0.5 mb-5">
              Modelo de documento · simulação de leitura técnica no veículo
            </p>

            {/* Striped Metadata Table (Responsive on mobile & desktop - Page 21 of Manual) */}
            <div className="rounded-xl overflow-hidden border border-[#E3DED6] text-xs mb-6 divide-y divide-[#E3DED6]">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-0.5 sm:gap-2 px-4 py-2.5 bg-[#EFF4EA]">
                <span className="sm:col-span-4 font-bold text-[#1F262C]">Veículo</span>
                <span className="sm:col-span-8 font-medium text-[#333D46] break-words">
                  {car.name}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-0.5 sm:gap-2 px-4 py-2.5 bg-[#FFFFFF]">
                <span className="sm:col-span-4 font-bold text-[#1F262C]">
                  VIN / chassi
                </span>
                <span className="sm:col-span-8 font-medium text-[#333D46] break-all">
                  {car.vinPrefix}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-0.5 sm:gap-2 px-4 py-2.5 bg-[#EFF4EA]">
                <span className="sm:col-span-4 font-bold text-[#1F262C]">
                  Tensão / Temp.
                </span>
                <span className="sm:col-span-8 font-bold text-[#15623F] break-words">
                  {car.voltage} V · 24.2 °C · Delta entre células: {deltaMv} mV
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-0.5 sm:gap-2 px-4 py-2.5 bg-[#FFFFFF]">
                <span className="sm:col-span-4 font-bold text-[#1F262C]">
                  Tecnologia
                </span>
                <span className="sm:col-span-8 font-medium text-[#333D46] break-words">
                  Diagnóstico de alta precisão via barramento da bateria (AVILOO)
                </span>
              </div>
            </div>

            {/* ESTADO DE SAÚDE (SoH) with Official 5-Hexagon Indicator (Page 21) */}
            <div className="bg-[#F8F5F1] rounded-2xl p-5 border border-[#E3DED6] mb-6">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#15623F] mb-3">
                ESTADO DE SAÚDE (SoH)
              </div>

              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-5">
                  <HexChargeIndicator soh={effectiveSoh} size="lg" />
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-4xl sm:text-5xl font-extrabold"
                      style={{ color: status.lightTextHex }}
                    >
                      {effectiveSoh}%
                    </span>
                    <span className="text-xs font-medium text-[#333D46]">
                      capacidade real
                    </span>
                  </div>
                </div>

                {/* Autonomy Box */}
                <div className="bg-[#FFFFFF] rounded-xl px-4 py-3 border border-[#E3DED6]">
                  <div className="text-[11px] font-bold uppercase text-[#333D46]">
                    Autonomia Estimada
                  </div>
                  <div className="text-sm font-extrabold text-[#1F262C] mt-0.5">
                    {currentRangeKm} km{' '}
                    <span className="text-xs font-semibold text-[#333D46]">
                      (Original: {car.originalRangeKm} km · -{lostRangeKm} km)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs font-medium text-[#333D46] mt-3">
                A bateria guarda <strong>{effectiveSoh}%</strong> da energia que guardava quando nova.
              </p>
            </div>

            {/* Individual Cell Balance Grid inside Report */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-bold text-[#1F262C] mb-2">
                <span>Leitura Individual de Células (Amostra de 12 Módulos)</span>
                <span className="text-[11px] font-medium text-[#333D46]">
                  Delta: {deltaMv} mV {simulateWeakCell ? '(Alerta)' : '(Equilibrado)'}
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {Array.from({ length: 12 }, (_, i) => {
                  const isFaulty = simulateWeakCell && i === 7;
                  const v = isFaulty
                    ? '3.541 V'
                    : `${(3.682 + ((i % 3) - 1) * 0.003).toFixed(3)} V`;
                  return (
                    <div
                      key={i}
                      className={`p-2 rounded-lg border text-center ${
                        isFaulty
                          ? 'bg-red-50 border-red-500 text-red-800 animate-pulse'
                          : 'bg-[#F8F5F1] border-[#E3DED6] text-[#1F262C]'
                      }`}
                    >
                      <div className="text-[10px] font-medium text-[#333D46]">
                        Célula #{i + 1}
                      </div>
                      <div className="text-xs font-extrabold mt-0.5">{v}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Negotiation Impact Callout (#1F262C Dark Box) */}
            <div className="rounded-2xl p-4 bg-[#1F262C] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#90BE3D]">
                  Impacto na Negociação (Compra / Venda)
                </div>
                <div className="text-sm sm:text-base font-extrabold mt-0.5 text-white">
                  {status.negotiationText}
                </div>
                <p className="text-xs text-slate-200 mt-1 font-normal">
                  {status.advice}
                </p>
              </div>
              <a
                href={buildWhatsAppUrl(
                  `Olá! Simulei no site o laudo para um ${car.name} (SoH ${effectiveSoh}%) e quero pedir um orçamento de diagnóstico.`
                )}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#90BE3D] hover:bg-[#a3d448] text-[#1F262C] font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                <span>Testar Meu Carro</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Official A4 Report Footer Line (Page 21 of Manual) */}
            <div className="mt-6 pt-3 border-t-2 border-[#90BE3D] flex items-center justify-between text-[11px] font-semibold text-[#333D46]">
              <span>Cell Metrics · Inteligência em Baterias</span>
              <span>página 1/1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
