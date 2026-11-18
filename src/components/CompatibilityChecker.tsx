import React, { useState } from 'react';
import { COMPATIBLE_VEHICLES, buildWhatsAppUrl } from '../data/cellmetricsData';
import { Search, CheckCircle2, Battery, ShieldAlert, ArrowRight } from 'lucide-react';

export const CompatibilityChecker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('Todos');

  const brands = ['Todos', 'BYD', 'GWM', 'Volvo', 'Porsche', 'BMW', 'Renault', 'CAOA Chery'];

  const filtered = COMPATIBLE_VEHICLES.filter((v) => {
    const matchesBrand = selectedBrand === 'Todos' || v.brand === selectedBrand;
    const matchesSearch =
      v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  return (
    <div className="bg-[#121920] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#90BE3D]/15 border border-[#90BE3D]/30 text-[#90BE3D] text-xs font-extrabold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Compatibilidade Homologada AVILOO (+300 Modelos)</span>
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Consulte seu veículo e o custo de reposição da bateria
          </h3>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl">
            Veja abaixo os modelos elétricos e híbridos mais testados pela Cell Metrics em Campinas e região, a capacidade do pack e o risco financeiro caso a bateria apresente degradação oculta.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar modelo (ex: Dolphin, Haval, XC40)..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B0F13] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#90BE3D]"
          />
        </div>
      </div>

      {/* Brand Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {brands.map((brand) => (
          <button
            key={brand}
            type="button"
            onClick={() => setSelectedBrand(brand)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              selectedBrand === brand
                ? 'bg-[#90BE3D] text-[#0B0F13] shadow-glow-lime'
                : 'bg-[#0B0F13] text-slate-300 border border-white/10 hover:border-white/30'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Vehicle Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((car) => (
          <div
            key={car.id}
            className="bg-[#0B0F13] border border-white/10 hover:border-[#90BE3D]/50 rounded-2xl p-5 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#15623F]/40 text-[#90BE3D] border border-[#90BE3D]/30">
                  {car.brand}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {car.type}
                </span>
              </div>
              <h4 className="text-lg font-extrabold text-white group-hover:text-[#90BE3D] transition-colors">
                {car.model}
              </h4>

              <div className="mt-4 space-y-2 text-xs border-t border-white/10 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Capacidade / Química:</span>
                  <span className="font-semibold text-slate-200">
                    {car.batteryCapacity} ({car.chemistry})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tensão / Células:</span>
                  <span className="font-mono text-slate-200">
                    {car.nominalVoltage}V · {car.cellsCount} cél.
                  </span>
                </div>
                <div className="flex justify-between items-center bg-red-500/10 border border-red-500/20 rounded-lg px-2.5 py-1.5 mt-2">
                  <span className="text-red-300 font-semibold flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Custo de Troca:
                  </span>
                  <span className="font-mono font-extrabold text-red-300">
                    {car.replacementCostRange}
                  </span>
                </div>
              </div>
            </div>

            <a
              href={buildWhatsAppUrl(
                `Olá! Quero agendar ou cotar o laudo de bateria AVILOO para o veículo ${car.brand} ${car.model}.`
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#90BE3D] text-white hover:text-[#0B0F13] font-bold text-xs flex items-center justify-center gap-2 transition-all border border-white/10 hover:border-transparent"
            >
              <span>Cotar Laudo para {car.brand}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>

      {/* Bottom Notice for Other Models */}
      <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        <p>
          <strong>Não encontrou seu veículo na lista rápida?</strong> O sistema AVILOO cobre mais de{' '}
          <span className="text-[#90BE3D] font-bold">300 modelos</span> (incluindo Audi e-tron, Mercedes EQ, JAC, Mini, Peugeot, Tesla e Toyota).
        </p>
        <a
          href={buildWhatsAppUrl(
            'Olá! Gostaria de confirmar a compatibilidade do diagnóstico de bateria para o meu veículo.'
          )}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-[#90BE3D] hover:underline font-extrabold flex items-center gap-1"
        >
          <span>Consultar outro modelo pelo WhatsApp</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
