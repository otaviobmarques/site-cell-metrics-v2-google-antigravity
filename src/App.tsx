import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Zap,
  MapPin,
  Clock,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  PhoneCall,
  ChevronDown,
  Award,
  Car,
  Building2,
  TrendingUp,
  BadgeDollarSign,
  Sparkles,
  Lock,
  ExternalLink,
  Menu,
  X,
  Check,
  XCircle,
  Cpu,
} from 'lucide-react';
import { RemotionShowcase } from './components/RemotionShowcase';
import { InteractiveReportSimulator } from './components/InteractiveReportSimulator';
import { CompatibilityChecker } from './components/CompatibilityChecker';
import { SeoAuthoritySection } from './components/SeoAuthoritySection';
import { BrandLogo, HexChargeIndicator } from './components/BrandElements';
import {
  REAL_CASES,
  FAQ_ITEMS,
  buildWhatsAppUrl,
} from './data/cellmetricsData';

export function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeAudienceTab, setActiveAudienceTab] = useState<number>(0);

  // Lead Form State
  const [formState, setFormState] = useState({
    nome: '',
    tel: '',
    email: '',
    perfil: 'Vou comprar um elétrico/híbrido',
    modelo: '',
    ano: '',
    cidade: 'Campinas, SP',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    const msg = `Olá! Me chamo ${formState.nome} (${formState.perfil}). Quero solicitar orçamento do Laudo de Bateria Cell Metrics.\n• Veículo: ${
      formState.modelo || 'A informar'
    } (${formState.ano || 'Ano a informar'})\n• Cidade: ${
      formState.cidade || 'Campinas e região'
    }\n• Contato: ${formState.tel} / ${formState.email}`;
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  const AUDIENCE_TABS = [
    {
      title: 'Quem vai comprar',
      icon: ShieldCheck,
      badge: 'Proteção contra prejuízos de R$ 40k a R$ 100k+',
      headline:
        'Não assuma uma dívida invisível de até R$ 100 mil comprando no escuro.',
      description:
        'No test-drive todo carro elétrico parece silencioso, forte e perfeito. Só o diagnóstico célula a célula revela se o antigo dono abusou de eletropostos ultrarrápidos (DC) ou se há células prestes a falhar.',
      bullets: [
        'Descubra a saúde real (SoH %) antes de transferir o dinheiro',
        'Use o laudo em PDF para negociar de R$ 8 mil a R$ 25 mil de desconto caso haja desgaste acima da média',
        'Atendimento direto na loja ou na garagem do vendedor sem precisar deslocar o veículo',
      ],
      ctaText: 'Proteger Minha Compra Agora',
      waMsg:
        'Olá! Estou avaliando a compra de um veículo elétrico/híbrido e quero agendar o laudo da bateria antes de fechar negócio.',
    },
    {
      title: 'Quem vai vender',
      icon: TrendingUp,
      badge: 'Venda até 3x mais rápido e pelo valor cheio',
      headline:
        'Elimine a maior objeção do comprador com um Certificado Austríaco oficial.',
      description:
        'A primeira dúvida de quem procura um elétrico ou híbrido seminovo é: "Como está a bateria?". Quando você apresenta o laudo independente da Cell Metrics, você acaba com os pedidos abusivos de desconto.',
      bullets: [
        'Comprove documentalmente que sua bateria está saudável (ex: 94% SoH)',
        'Destaque seu anúncio em portais (Webmotors, OLX, Mercado Livre) com selo oficial',
        'Laudo 100% imparcial (Cell Metrics by Auto Visão) que gera confiança imediata',
      ],
      ctaText: 'Valorizar Meu Veículo na Venda',
      waMsg:
        'Olá! Quero vender meu veículo elétrico/híbrido e gostaria de emitir o laudo certificado da bateria para valorizar meu carro.',
    },
    {
      title: 'Lojas e Concessionárias',
      icon: Building2,
      badge: 'Segurança na captação e giro rápido no showroom',
      headline:
        'Avalie veículos na troca com precisão cirúrgica e blinde o seu estoque.',
      description:
        'Receber um elétrico ou híbrido com bateria degradada na troca pode destruir a margem de lucro de meses da loja. Com a Cell Metrics, você audita na entrada e entrega o laudo no porta-luvas na saída.',
      bullets: [
        'Evite captar veículos com células desbalanceadas ou SoH crítico',
        'Reduza drasticamente o risco jurídico e acionamentos de garantia de 90 dias',
        'Condições comerciais diferenciadas para avaliação recorrente de pátio em Campinas e região',
      ],
      ctaText: 'Falar com Consultor B2B para Lojas',
      waMsg:
        'Olá! Sou de uma loja/concessionária e quero conhecer as condições da Cell Metrics para avaliação de estoque e captação.',
    },
    {
      title: 'Frotas Corporativas',
      icon: Car,
      badge: 'Gestão preditiva de ativos eletrificados',
      headline:
        'Monitore a degradação da frota, audite garantias de fábrica e planeje a desmobilização.',
      description:
        'Acompanhe o impacto real do perfil de recarga dos motoristas sobre a vida útil das baterias e identifique módulos elegíveis para troca em garantia antes do vencimento contratual.',
      bullets: [
        'Atendimento in-company no pátio da sua empresa sem parar a operação',
        'Relatórios técnicos individuais por chassi (VIN) para auditoria e revenda da frota',
        'Acionamento embasado de garantia junto à montadora caso o SoH caia abaixo do limite',
      ],
      ctaText: 'Solicitar Diagnóstico para Frotas',
      waMsg:
        'Olá! Gostaria de solicitar uma proposta da Cell Metrics para diagnóstico de baterias em nossa frota de elétricos/híbridos.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F13] text-[#F8F5F1] relative selection:bg-[#90BE3D] selection:text-[#0B0F13]">
      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#15623F] via-[#90BE3D] to-[#BEF264] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* =====================================================================
          STICKY NAVIGATION HEADER (Logo Oficial Horizontal DS 1.0)
         ===================================================================== */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#1F262C]/95 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Official Vector Brand Logo (min 160px, 0.5x protection zone) */}
          <a href="#topo" className="flex items-center py-2 shrink-0">
            <BrandLogo
              variant="horizontal-dark"
              className="h-11 sm:h-12 w-auto"
              alt="Cell Metrics · Inteligência em Baterias"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-300">
            <a href="#remotion-demo" className="hover:text-[#90BE3D] transition-colors">
              Raio-X Interativo
            </a>
            <a href="#como-funciona" className="hover:text-[#90BE3D] transition-colors">
              Como Funciona
            </a>
            <a href="#laudo" className="hover:text-[#90BE3D] transition-colors">
              Simulador do Laudo
            </a>
            <a href="#compatibilidade" className="hover:text-[#90BE3D] transition-colors">
              +300 Modelos
            </a>
            <a href="#para-quem" className="hover:text-[#90BE3D] transition-colors">
              Para Quem
            </a>
            <a href="#faq" className="hover:text-[#90BE3D] transition-colors">
              Dúvidas
            </a>
          </nav>

          {/* Header CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-extrabold text-white flex items-center gap-2 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#90BE3D]" />
              <span>(19) 99224-8383</span>
            </a>
            <a
              href="#orcamento"
              className="px-5 py-2.5 rounded-xl bg-[#90BE3D] hover:bg-[#a4d649] text-[#0B0F13] text-xs font-black uppercase tracking-wider shadow-glow-lime transition-all"
            >
              Agendar Análise
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#121920] border-b border-white/10 px-4 pt-3 pb-6 space-y-3"
            >
              {[
                { label: 'Raio-X em Vídeo (Remotion)', href: '#remotion-demo' },
                { label: 'Como Funciona', href: '#como-funciona' },
                { label: 'Simulador do Laudo PDF', href: '#laudo' },
                { label: 'Compatibilidade (+300 Carros)', href: '#compatibilidade' },
                { label: 'Para Quem É & Casos Reais', href: '#para-quem' },
                { label: 'Perguntas Frequentes', href: '#faq' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-bold text-slate-200 hover:text-[#90BE3D] border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="#orcamento"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-[#90BE3D] text-[#0B0F13] font-black text-xs uppercase tracking-wider text-center"
                >
                  Peça seu Orçamento Grátis
                </a>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-[#15623F] text-white font-bold text-xs uppercase tracking-wider text-center"
                >
                  Chamar no WhatsApp (19) 99224-8383
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =====================================================================
          HERO SECTION + HIGH-CONVERSION QUOTE FORM
         ===================================================================== */}
      <section
        id="topo"
        className="relative pt-10 pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-hex-pattern"
      >
        {/* Ambient Background Glows */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#15623F]/30 blur-[130px]" />
        <div className="pointer-events-none absolute top-1/3 right-0 w-[460px] h-[460px] rounded-full bg-[#90BE3D]/15 blur-[140px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Hero Copy & Value Proposition (Left 7 Columns) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Top Authority Pill */}
              <div className="inline-flex flex-wrap items-center gap-2 px-4 py-1.5 rounded-full bg-[#15623F]/35 border border-[#90BE3D]/40 text-xs font-extrabold text-[#BEF264]">
                <span className="w-2 h-2 rounded-full bg-[#90BE3D] animate-ping" />
                <span>DIAGNÓSTICO DE BATERIAS · ELÉTRICOS E HÍBRIDOS · TECNOLOGIA AUSTRÍACA AVILOO</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-white leading-[1.08]">
                Trocar a bateria custa até{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#90BE3D] to-[#BEF264]">
                  R$ 100 mil.
                </span>{' '}
                Descubra a saúde real antes de fechar negócio.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Dois carros do mesmo ano e quilometragem podem ter baterias em estados completamente diferentes — e{' '}
                <strong className="text-white">nada disso aparece no painel ou no test-drive</strong>. A{' '}
                <strong className="text-[#90BE3D]">Cell Metrics</strong> vai até onde o veículo está, audita cada célula com o scanner austríaco{' '}
                <strong className="text-white">AVILOO</strong> e entrega um laudo oficial independente em até 48 horas.
              </p>

              {/* Official 5-Hexagon Example Pill (Grafismo DS 1.0 Pág. 19) */}
              <div className="inline-flex flex-wrap items-center gap-3.5 px-4 py-3 rounded-2xl bg-[#151B20]/95 border border-[#90BE3D]/45 shadow-lg">
                <HexChargeIndicator soh={94} size="sm" />
                <div className="text-xs sm:text-sm font-bold text-white">
                  <span className="text-[#90BE3D] font-extrabold">94%</span> · Estado de saúde (SoH) ·{' '}
                  <span className="text-slate-300 font-medium">resultado de exemplo</span>
                </div>
              </div>

              {/* Live Example Badge + Cost Risk Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="bg-[#151B20]/90 border border-[#90BE3D]/35 rounded-2xl p-4 flex items-center gap-3.5">
                  <BrandLogo
                    variant="icon"
                    className="w-11 h-11 shrink-0"
                    alt="Ícone Cell Metrics"
                  />
                  <div>
                    <div className="text-xs font-extrabold text-white">
                      Leitura Real Célula a Célula
                    </div>
                    <div className="text-[11px] text-slate-200 mt-0.5">
                      Saiba exatamente quanta capacidade original ainda resta e negocie com dados na mão.
                    </div>
                  </div>
                </div>

                <div className="bg-[#151B20]/90 border border-white/15 rounded-2xl p-4 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#15623F]/50 border border-[#90BE3D]/40 flex items-center justify-center shrink-0 text-[#90BE3D]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white">
                      Teste Onde o Carro Estiver
                    </div>
                    <div className="text-[11px] text-slate-200 mt-0.5">
                      Vamos até sua garagem, loja ou pátio em Campinas e região. Sem desmontar nada.
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="#orcamento"
                  className="px-7 py-4 rounded-2xl bg-[#90BE3D] hover:bg-[#a5d64c] text-[#0B0F13] font-black text-sm uppercase tracking-wider shadow-glow-lime-lg flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Solicitar Orçamento Grátis</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={buildWhatsAppUrl(
                    'Quero conhecer o laudo de Baterias da CellMetrics by Auto Visão e consultar disponibilidade.'
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-4 rounded-2xl bg-[#15623F] hover:bg-[#1b7a4f] border border-[#90BE3D]/40 text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-[#90BE3D]" />
                  <span>Falar no WhatsApp Agora</span>
                </a>
              </div>

              {/* 4 Trust Badges Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#90BE3D] shrink-0" />
                  <span>100% Independente</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#90BE3D] shrink-0" />
                  <span>Scanner AVILOO (Áustria)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#90BE3D] shrink-0" />
                  <span>Teste onde o carro estiver</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#90BE3D] shrink-0" />
                  <span>Laudo PDF em até 48h</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column (5 Cols): Conversion Lead Card (#orcamento) */}
            <motion.div
              id="orcamento"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 bg-[#F8F5F1] text-[#1F262C] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#90BE3D] relative"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#15623F] text-white text-[11px] font-extrabold uppercase tracking-wider">
                  Orçamento Grátis & Sem Compromisso
                </span>
                <span className="text-xs font-bold text-[#15623F] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Resposta rápida
                </span>
              </div>

              <h2 className="text-2xl font-black text-[#1F262C]">
                Peça seu orçamento agora
              </h2>
              <p className="text-xs sm:text-sm text-[#55606A] mt-1 mb-5">
                Conte qual é o carro e seu objetivo. Respondemos com valor exato, confirmação de compatibilidade e horários disponíveis.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#333D46] mb-1">
                    Qual é o seu objetivo? *
                  </label>
                  <select
                    value={formState.perfil}
                    onChange={(e) =>
                      setFormState({ ...formState, perfil: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E3DED6] text-sm font-semibold text-[#1F262C] focus:outline-none focus:border-[#15623F]"
                  >
                    <option value="Vou comprar um elétrico/híbrido">
                      Quero COMPRAR um elétrico/híbrido com segurança
                    </option>
                    <option value="Quero vender meu elétrico/híbrido">
                      Quero VENDER meu veículo e comprovar a saúde da bateria
                    </option>
                    <option value="Sou de Loja / Concessionária">
                      Sou LOJA / CONCESSIONÁRIA (avaliação de troca ou estoque)
                    </option>
                    <option value="Sou Gestor de Frota">
                      Sou GESTOR DE FROTA corporativa
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#333D46] mb-1">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Digite seu nome"
                    value={formState.nome}
                    onChange={(e) =>
                      setFormState({ ...formState, nome: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E3DED6] text-sm text-[#1F262C] focus:outline-none focus:border-[#15623F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#333D46] mb-1">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(19) 99999-9999"
                      value={formState.tel}
                      onChange={(e) =>
                        setFormState({ ...formState, tel: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E3DED6] text-sm text-[#1F262C] focus:outline-none focus:border-[#15623F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#333D46] mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seu@email.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E3DED6] text-sm text-[#1F262C] focus:outline-none focus:border-[#15623F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#333D46] mb-1">
                      Marca e Modelo do Veículo
                    </label>
                    <input
                      type="text"
                      placeholder="Ex.: BYD Dolphin, Haval H6, XC40"
                      value={formState.modelo}
                      onChange={(e) =>
                        setFormState({ ...formState, modelo: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E3DED6] text-sm text-[#1F262C] focus:outline-none focus:border-[#15623F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#333D46] mb-1">
                      Ano
                    </label>
                    <input
                      type="text"
                      placeholder="Ex.: 2024"
                      value={formState.ano}
                      onChange={(e) =>
                        setFormState({ ...formState, ano: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E3DED6] text-sm text-[#1F262C] focus:outline-none focus:border-[#15623F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#333D46] mb-1">
                    Cidade onde o carro está
                  </label>
                  <input
                    type="text"
                    placeholder="Campinas, Valinhos, Vinhedo, Indaiatuba, Paulínia..."
                    value={formState.cidade}
                    onChange={(e) =>
                      setFormState({ ...formState, cidade: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E3DED6] text-sm text-[#1F262C] focus:outline-none focus:border-[#15623F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-[#15623F] hover:bg-[#104d31] text-white font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Solicitar Orçamento Agora</span>
                  <ArrowRight className="w-4 h-4 text-[#90BE3D]" />
                </button>

                {formSubmitted && (
                  <div className="p-3 rounded-xl bg-[#15623F]/10 border border-[#15623F]/30 text-xs font-bold text-[#15623F] text-center">
                    ✓ Pedido iniciado! Redirecionamos seus dados para atendimento imediato no WhatsApp, ou aguarde nosso retorno por e-mail/telefone.
                  </div>
                )}

                <p className="text-[11px] text-[#55606A] text-center flex items-center justify-center gap-1.5 pt-1">
                  <Lock className="w-3.5 h-3.5 text-[#15623F] shrink-0" />
                  <span>
                    Seus dados são usados só para responder ao seu pedido. Não compartilhamos suas informações.
                  </span>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          IMPACT STATS STRIP (Dados verificados DS 1.0 - Pág. 03)
         ===================================================================== */}
      <section className="border-y border-white/10 bg-[#151B20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#90BE3D]">
                48 h
              </div>
              <div className="text-xs sm:text-sm text-slate-200 font-semibold mt-1">
                no máximo para o laudo chegar em PDF
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#90BE3D]">
                +300
              </div>
              <div className="text-xs sm:text-sm text-slate-200 font-semibold mt-1">
                modelos elétricos e híbridos compatíveis
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#90BE3D]">
                4
              </div>
              <div className="text-xs sm:text-sm text-slate-200 font-semibold mt-1">
                leituras da bateria em um só laudo oficial
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#90BE3D]">
                1
              </div>
              <div className="text-xs sm:text-sm text-slate-200 font-semibold mt-1">
                visita no local, sem levar o carro à oficina
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          REMOTION INTERACTIVE VIDEO SECTION: RAIO-X EM TEMPO REAL
         ===================================================================== */}
      <section id="remotion-demo" className="py-20 lg:py-24 relative bg-grid-tech">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#90BE3D]/15 border border-[#90BE3D]/35 text-[#90BE3D] text-xs font-extrabold uppercase tracking-widest mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Demonstração Dinâmica · Tecnologia AVILOO em Ação</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Veja em 12 segundos o que o painel do carro esconde — e o que o nosso scanner revela
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3">
              Recargas rápidas frequentes (eletropostos DC), calor e ciclos severos degradam células silenciosamente. Alterne entre os 3 cenários reais no player abaixo:
            </p>
          </div>

          <RemotionShowcase />
        </div>
      </section>

      {/* =====================================================================
          O QUE ESTÁ EM JOGO: PAINEL COMUM VS. DIAGNÓSTICO CELL METRICS
         ===================================================================== */}
      <section className="py-20 lg:py-24 bg-[#0E141A] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#90BE3D]">
                O que está em jogo
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Trocar a bateria custa de R$ 40 mil a mais de R$ 100 mil. O laudo custa uma fração disso.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                A bateria de tração representa até <strong className="text-white">50% do valor total</strong> de um veículo elétrico ou híbrido seminovo. Confiar apenas na autonomia estimada no painel ou em um test-drive de 15 minutos é apostar dezenas de milhares de reais no escuro.
              </p>
              <p className="text-xs font-medium text-slate-400">
                * Faixa de referência para troca de bateria, conforme o modelo · Outubro de 2026.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  {
                    title: 'Descubra o problema antes de pagar',
                    desc: 'Identifique células desbalanceadas ou perda severa de capacidade antes de assinar o contrato.',
                  },
                  {
                    title: 'Use o resultado para negociar o preço',
                    desc: 'Se a bateria tiver 81% de SoH em vez de 95%, você tem um documento técnico irrefutável para pedir desconto.',
                  },
                  {
                    title: 'Venda com um documento oficial na mão',
                    desc: 'Comprove que sua bateria foi bem cuidada e feche negócio mais rápido sem aceitar propostas baixas.',
                  },
                  {
                    title: '100% Imparcial (Sem conflito de interesses)',
                    desc: 'A Cell Metrics não compra, não vende carros e não vende baterias. Nosso único papel é entregar a verdade técnica.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#131C24] border border-white/10"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#90BE3D] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-300 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Direct Comparison Matrix */}
            <div className="lg:col-span-6">
              <div className="bg-[#131C24] border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-6 bg-gradient-to-r from-[#15623F] to-[#0E3F28] border-b border-white/10">
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    Por que a Vistoria Comum e o Painel não protegem você?
                  </h3>
                  <p className="text-xs text-emerald-100 mt-1">
                    Comparativo técnico entre olhar apenas o painel vs. Auditoria AVILOO Cell Metrics
                  </p>
                </div>

                <div className="divide-y divide-white/10 text-xs sm:text-sm">
                  {[
                    {
                      feature: 'Capacidade Real Retida (SoH %)',
                      panel: 'Não mostra (exibe apenas % de carga do dia)',
                      aviloo: 'Medição exata certificada frente à bateria nova',
                    },
                    {
                      feature: 'Leitura Individual Célula a Célula',
                      panel: 'Invisível no computador de bordo',
                      aviloo: 'Detecta qualquer célula fraca (desvio em mV)',
                    },
                    {
                      feature: 'Impacto de Recargas Rápidas (DC)',
                      panel: 'Ocultado pelo buffer de software da montadora',
                      aviloo: 'Revela degradação química real acumulada',
                    },
                    {
                      feature: 'Integridade Térmica e Alta Tensão',
                      panel: 'Só avisa quando a pane já aconteceu',
                      aviloo: 'Audita sensores térmicos e tensão sob carga',
                    },
                    {
                      feature: 'Validade para Negociação de Compra/Venda',
                      panel: 'Apenas palavra do vendedor',
                      aviloo: 'Laudo PDF independente vinculado ao Chassi (VIN)',
                    },
                  ].map((row) => (
                    <div
                      key={row.feature}
                      className="p-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center"
                    >
                      <div className="sm:col-span-4 font-extrabold text-white">
                        {row.feature}
                      </div>
                      <div className="sm:col-span-4 flex items-center gap-2 text-red-300 bg-red-500/10 px-3 py-2 rounded-xl border border-red-500/20">
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span className="text-xs">{row.panel}</span>
                      </div>
                      <div className="sm:col-span-4 flex items-center gap-2 text-[#D9F99D] bg-[#90BE3D]/15 px-3 py-2 rounded-xl border border-[#90BE3D]/30">
                        <Check className="w-4 h-4 text-[#90BE3D] shrink-0" />
                        <span className="text-xs font-semibold">{row.aviloo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          COMO FUNCIONA (4 STEPS)
         ===================================================================== */}
      <section id="como-funciona" className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#90BE3D]">
              Como funciona · Zero burocracia
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Do pedido ao laudo em PDF, sem tirar o carro do lugar.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3">
              O teste acontece onde o veículo está: na sua garagem, no estacionamento do vendedor, na concessionária ou no pátio da empresa em Campinas e região.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                tag: 'Contato Rápido',
                title: 'Peça o orçamento grátis',
                desc: 'Envie marca, modelo, ano e cidade pelo formulário ou WhatsApp. Confirmamos compatibilidade e valor na hora.',
              },
              {
                step: '02',
                tag: 'Agenda Flexível',
                title: 'Marque dia, hora e local',
                desc: 'Combinamos o melhor horário com você, com o vendedor particular ou diretamente com o gerente da loja.',
              },
              {
                step: '03',
                tag: 'Diagnóstico In-Loco',
                title: 'Conexão do Scanner AVILOO',
                desc: 'Nosso técnico conecta o hardware austríaco AVILOO via porta OBD e realiza a leitura profunda sem desmontar nada.',
              },
              {
                step: '04',
                tag: 'Em até 48 horas',
                title: 'Laudo Oficial no seu E-mail',
                desc: 'Você recebe o certificado em PDF vinculado ao Chassi (VIN), em linguagem clara, pronto para decidir ou negociar.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-[#121920] border border-white/10 hover:border-[#90BE3D]/60 rounded-3xl p-6 transition-all group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 clip-hex bg-gradient-to-br from-[#90BE3D] to-[#15623F] flex items-center justify-center text-[#0B0F13] font-black font-mono text-base">
                    {item.step}
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 text-[#90BE3D] border border-white/10">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-white group-hover:text-[#90BE3D] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE REPORT SIMULATOR (#laudo)
         ===================================================================== */}
      <section
        id="laudo"
        className="py-20 lg:py-24 bg-[#0E141A] border-y border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#90BE3D]">
              O que você recebe · Simulador Interativo
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Quatro leituras vitais da bateria, traduzidas em poder de negociação.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3">
              O laudo mostra o que foi medido célula a célula e o que isso representa para a autonomia real e para o valor de mercado do veículo. Experimente simular abaixo:
            </p>
          </div>

          <InteractiveReportSimulator />
        </div>
      </section>

      {/* =====================================================================
          COMPATIBILITY CHECKER (+300 MODELS) (#compatibilidade)
         ===================================================================== */}
      <section id="compatibilidade" className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompatibilityChecker />
        </div>
      </section>

      {/* =====================================================================
          AUSTRIAN AVILOO TECHNOLOGY SECTION (#tecnologia)
         ===================================================================== */}
      <section
        id="tecnologia"
        className="py-20 lg:py-24 bg-gradient-to-b from-[#0E141A] to-[#0B0F13] border-y border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#15623F]/40 border border-[#90BE3D]/40 text-[#BEF264] text-xs font-extrabold uppercase tracking-wider">
                <Award className="w-4 h-4 text-[#90BE3D]" />
                <span>Padrão Ouro Europeu · Homologado TÜV & Montadoras</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                O scanner austríaco AVILOO lê a bateria por dentro, sem desmontar um único parafuso.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Desenvolvido na Áustria e líder global em diagnóstico independente de baterias de alta tensão, o sistema{' '}
                <strong className="text-white">AVILOO</strong> processa milhões de pontos de dados diretamente do BMS (Battery Management System) e os compara com algoritmos proprietários de big data de milhares de veículos reais.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  'Leitura direta conectada ao barramento da bateria',
                  'Mesmo método adotado por montadoras e seguradoras na Europa',
                  'Compatível com +300 modelos (LFP Blade, NMC, 400V e 800V)',
                  'Zero interferência na garantia original do fabricante',
                ].map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm font-semibold text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#90BE3D] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <a
                  href="#orcamento"
                  className="px-6 py-3.5 rounded-xl bg-[#90BE3D] hover:bg-[#a6d84d] text-[#0B0F13] font-black text-xs uppercase tracking-wider transition-all"
                >
                  Agendar Diagnóstico AVILOO
                </a>
                <a
                  href="https://aviloo.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-slate-200 flex items-center gap-2 transition-all"
                >
                  <span>Conhecer a AVILOO Internacional</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#90BE3D]" />
                </a>
              </div>
            </div>

            {/* Right: Telemetry Architecture Visual Card */}
            <div className="lg:col-span-6">
              <div className="bg-[#121920] border-2 border-[#90BE3D]/35 rounded-3xl p-6 sm:p-8 shadow-glow-forest relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-[#90BE3D]">
                      ARQUITETURA DE AUDITORIA AVILOO BOX
                    </div>
                    <div className="text-lg font-extrabold text-white">
                      Telemetria em Nuvem + Inteligência Cell Metrics
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-[#90BE3D]/20 text-[#BEF264] font-mono text-xs font-bold">
                    ISO / TÜV Certified
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#0B0F13] border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#90BE3D]">
                        01. Captura OBD-II de Alta Frequência
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        Leitura de tensão de cada célula, corrente, resistência interna (mΩ) e sensores térmicos.
                      </div>
                    </div>
                    <span className="font-mono text-sm font-black text-white shrink-0 ml-4">
                      398.4 V
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0B0F13] border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#90BE3D]">
                        02. Processamento no AVILOO Battery Cloud (Áustria)
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        Cruzamento com curvas de degradação reais do exato modelo e química da bateria.
                      </div>
                    </div>
                    <span className="font-mono text-sm font-black text-[#90BE3D] shrink-0 ml-4">
                      Delta 9 mV
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0B0F13] border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#90BE3D]">
                        03. Emissão de Laudo Auditável Cell Metrics
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        Relatório assinado pela divisão especializada do grupo Auto Visão (desde 2006).
                      </div>
                    </div>
                    <span className="font-mono text-sm font-black text-sky-400 shrink-0 ml-4">
                      24.0 °C
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          PARA QUEM É (4 PERSONAS INTERACTIVE TABS) + CASOS REAIS (#para-quem)
         ===================================================================== */}
      <section id="para-quem" className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#90BE3D]">
              Para quem é o diagnóstico
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Cada lado do negócio usa o laudo para proteger ou multiplicar dinheiro.
            </h2>
          </div>

          {/* Interactive Persona Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {AUDIENCE_TABS.map((tab, idx) => {
              const Icon = tab.icon;
              const active = activeAudienceTab === idx;
              return (
                <button
                  key={tab.title}
                  type="button"
                  onClick={() => setActiveAudienceTab(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    active
                      ? 'bg-gradient-to-br from-[#15623F] to-[#0E3F28] border-[#90BE3D] text-white shadow-glow-forest'
                      : 'bg-[#121920] border-white/10 text-slate-300 hover:border-white/25'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 mb-3 ${
                      active ? 'text-[#90BE3D]' : 'text-slate-400'
                    }`}
                  />
                  <div>
                    <div className="text-sm sm:text-base font-extrabold text-white">
                      {tab.title}
                    </div>
                    <div className="text-[11px] text-[#BEF264] mt-1 line-clamp-1">
                      {tab.badge}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Persona Detail Panel */}
          <div className="bg-[#121920] border border-[#90BE3D]/35 rounded-3xl p-6 sm:p-10 mb-20 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-[#90BE3D]/15 text-[#90BE3D] text-xs font-extrabold uppercase tracking-wider">
                  {AUDIENCE_TABS[activeAudienceTab].badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {AUDIENCE_TABS[activeAudienceTab].headline}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {AUDIENCE_TABS[activeAudienceTab].description}
                </p>
                <div className="space-y-2.5 pt-2">
                  {AUDIENCE_TABS[activeAudienceTab].bullets.map((b) => (
                    <div key={b} className="flex items-start gap-2.5 text-xs sm:text-sm text-white font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#90BE3D] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#0B0F13] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Atendimento Especializado
                  </div>
                  <div className="text-xl font-black text-white mt-1">
                    {AUDIENCE_TABS[activeAudienceTab].title}
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    Agende o teste presencial em Campinas e região e receba seu relatório oficial em até 48h.
                  </p>
                </div>
                <a
                  href={buildWhatsAppUrl(AUDIENCE_TABS[activeAudienceTab].waMsg)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-5 rounded-xl bg-[#90BE3D] hover:bg-[#a6d84d] text-[#0B0F13] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-lime transition-all"
                >
                  <span>{AUDIENCE_TABS[activeAudienceTab].ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* REAL CASES / SOCIAL PROOF SECTION */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#90BE3D]">
                Resultados na prática · Casos reais
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                Como o laudo Cell Metrics já salvou dezenas de milhares de reais
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REAL_CASES.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#121920] border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:border-[#90BE3D]/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#15623F]/50 text-[#BEF264] text-xs font-extrabold uppercase">
                        {c.tag}
                      </span>
                      <span
                        className={`font-mono text-xs font-black px-2.5 py-1 rounded-lg ${
                          c.sohFound >= 90
                            ? 'bg-[#90BE3D]/20 text-[#BEF264]'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        SoH Medido: {c.sohFound}%
                      </span>
                    </div>

                    <div className="text-xs font-mono text-slate-400 mb-1">
                      {c.role} · {c.vehicle}
                    </div>
                    <h4 className="text-base font-extrabold text-white leading-snug mb-3">
                      “{c.headline}”
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {c.story}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#90BE3D]">
                      {c.financialOutcome}
                    </span>
                    <span className="text-[11px] text-slate-400">{c.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FAQ SECTION (#faq)
         ===================================================================== */}
      <section
        id="faq"
        className="py-20 lg:py-24 bg-[#0E141A] border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#90BE3D]">
                Dúvidas Frequentes
              </span>
              <h2 className="text-3xl font-black text-white leading-tight">
                Tudo o que você precisa saber antes de agendar.
              </h2>
              <p className="text-sm text-slate-300">
                Respondemos às principais dúvidas de compradores, proprietários e lojistas sobre garantia de fábrica, tempo de teste e cobertura.
              </p>
              <div className="p-5 rounded-2xl bg-[#131C24] border border-white/10 space-y-3">
                <div className="text-sm font-extrabold text-white">
                  Prefere tirar sua dúvida direto com um especialista?
                </div>
                <p className="text-xs text-slate-300">
                  Nossa equipe técnica em Campinas responde rapidamente pelo WhatsApp.
                </p>
                <a
                  href={buildWhatsAppUrl(
                    'Olá! Tenho uma dúvida sobre o diagnóstico de baterias da Cell Metrics.'
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#90BE3D] text-[#0B0F13] font-extrabold text-xs uppercase tracking-wider"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Chamar no WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-3">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={faq.question}
                    className={`rounded-2xl border transition-all ${
                      isOpen
                        ? 'bg-[#141E27] border-[#90BE3D]/50'
                        : 'bg-[#111820] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#90BE3D] block mb-1">
                          {faq.category}
                        </span>
                        <span className="text-sm sm:text-base font-extrabold text-white">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-[#90BE3D] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SEO LOCAL & KEYWORD AUTHORITY SECTION (#cobertura-seo)
         ===================================================================== */}
      <SeoAuthoritySection />

      {/* =====================================================================
          BOTTOM CTA BANNER (#contato)
         ===================================================================== */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-[#15623F] via-[#115133] to-[#0B3521] border-t border-[#90BE3D]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="inline-block px-3.5 py-1 rounded-full bg-black/25 text-[#BEF264] text-xs font-extrabold uppercase tracking-widest mb-3">
            Agende sua análise sem sair de casa
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Antes de fechar negócio, peça o laudo oficial da bateria.
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 mt-3 mb-8">
            Conte qual é o veículo e onde ele está. Nós vamos até o local em Campinas e região e entregamos o diagnóstico completo em até 48 horas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#90BE3D] hover:bg-[#a5d64c] text-[#0B0F13] font-black text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Falar no WhatsApp (19) 99224-8383</span>
            </a>
            <a
              href="#orcamento"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-black/30 hover:bg-black/45 border border-white/25 text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <span>Preencher Formulário Online</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-2 text-xs text-emerald-100">
            <MapPin className="w-4 h-4 text-[#90BE3D]" />
            <span>
              Base operacional: Av. Andrade Neves, 1160, Centro · Campinas, SP · CEP 13013-161 ·
            </span>
            <a
              href="https://maps.google.com/?q=Av.+Andrade+Neves,+1160,+Centro,+Campinas,+SP"
              target="_blank"
              rel="noreferrer"
              className="underline font-bold text-[#BEF264] hover:text-white"
            >
              Ver no Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOOTER (Com Assinatura Vertical Oficial Fundo Escuro DS 1.0 - Pág. 08)
         ===================================================================== */}
      <footer className="bg-[#1F262C] border-t border-white/10 pt-14 pb-28 sm:pb-16 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
            <div className="md:col-span-2 space-y-4">
              <div className="py-1">
                <BrandLogo
                  variant="vertical-dark"
                  className="h-24 w-auto"
                  alt="Cell Metrics · Inteligência em Baterias"
                />
              </div>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                Diagnóstico de baterias de veículos elétricos e híbridos com tecnologia AVILOO. Campinas e região.
              </p>
              <p className="text-[11px] text-slate-400">
                Cell Metrics by <strong className="text-white">Auto Visão</strong> · CNPJ 08.322.855/0001-40.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-extrabold uppercase tracking-wider text-white mb-2">
                Navegação Rápida
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#remotion-demo" className="hover:text-[#90BE3D]">
                    Raio-X em Vídeo (Remotion)
                  </a>
                </li>
                <li>
                  <a href="#como-funciona" className="hover:text-[#90BE3D]">
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a href="#laudo" className="hover:text-[#90BE3D]">
                    Simulador do Laudo PDF
                  </a>
                </li>
                <li>
                  <a href="#compatibilidade" className="hover:text-[#90BE3D]">
                    +300 Modelos Compatíveis
                  </a>
                </li>
                <li>
                  <a href="#para-quem" className="hover:text-[#90BE3D]">
                    Para Quem É & Casos Reais
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#90BE3D]">
                    Perguntas Frequentes
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-extrabold uppercase tracking-wider text-white mb-2">
                Contato & Atendimento
              </div>
              <p>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#90BE3D] font-bold hover:underline"
                >
                  WhatsApp: (19) 99224-8383
                </a>
              </p>
              <p>Av. Andrade Neves, 1160, Centro</p>
              <p>Campinas, SP · CEP 13013-161</p>
              <p className="pt-1">
                <a
                  href="https://maps.google.com/?q=Av.+Andrade+Neves,+1160,+Centro,+Campinas,+SP"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 underline hover:text-[#90BE3D]"
                >
                  Abrir localização no mapa
                </a>
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <span>
              © 2026 Cell Metrics by Auto Visão · CNPJ 08.322.855/0001-40 · Todos os direitos reservados.
            </span>
            <span>
              Tecnologia de diagnóstico homologada AVILOO GmbH (Áustria).
            </span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Quick-Action Button */}
      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-[#070A0D] font-black text-xs uppercase tracking-wider px-4 py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 ${
          scrollProgress > 5
            ? 'opacity-100 translate-y-0'
            : 'opacity-90 sm:opacity-0 sm:pointer-events-none sm:translate-y-4'
        }`}
      >
        <PhoneCall className="w-5 h-5 fill-[#070A0D]" />
        <span className="hidden sm:inline">Orçamento WhatsApp</span>
      </a>
    </div>
  );
}

export default App;
