export interface VehicleModel {
  id: string;
  brand: string;
  model: string;
  type: '100% Elétrico (BEV)' | 'Híbrido Plug-in (PHEV)';
  batteryCapacity: string;
  chemistry: string;
  replacementCostRange: string;
  nominalVoltage: number;
  cellsCount: number;
  popularYear: string;
}

export const COMPATIBLE_VEHICLES: VehicleModel[] = [
  {
    id: 'byd-dolphin',
    brand: 'BYD',
    model: 'Dolphin / Dolphin Mini / Plus',
    type: '100% Elétrico (BEV)',
    batteryCapacity: '44.9 kWh / 60.5 kWh',
    chemistry: 'LFP Blade Battery',
    replacementCostRange: 'R$ 58.000 – R$ 82.000',
    nominalVoltage: 398,
    cellsCount: 108,
    popularYear: '2023–2026',
  },
  {
    id: 'byd-song-plus',
    brand: 'BYD',
    model: 'Song Plus DM-i / Song Pro',
    type: 'Híbrido Plug-in (PHEV)',
    batteryCapacity: '8.3 kWh / 18.3 kWh',
    chemistry: 'LFP Blade PHEV',
    replacementCostRange: 'R$ 38.000 – R$ 54.000',
    nominalVoltage: 352,
    cellsCount: 96,
    popularYear: '2022–2026',
  },
  {
    id: 'byd-seal',
    brand: 'BYD',
    model: 'Seal AWD Performance',
    type: '100% Elétrico (BEV)',
    batteryCapacity: '82.5 kWh',
    chemistry: 'LFP Blade CTB',
    replacementCostRange: 'R$ 95.000 – R$ 125.000',
    nominalVoltage: 550,
    cellsCount: 172,
    popularYear: '2023–2026',
  },
  {
    id: 'gwm-ora-03',
    brand: 'GWM',
    model: 'Ora 03 Skin / GT',
    type: '100% Elétrico (BEV)',
    batteryCapacity: '48 kWh / 63 kWh',
    chemistry: 'LFP / NMC Ternária',
    replacementCostRange: 'R$ 62.000 – R$ 88.000',
    nominalVoltage: 386,
    cellsCount: 104,
    popularYear: '2023–2026',
  },
  {
    id: 'gwm-haval-h6',
    brand: 'GWM',
    model: 'Haval H6 PHEV19 / PHEV34 / GT',
    type: 'Híbrido Plug-in (PHEV)',
    batteryCapacity: '19 kWh / 34 kWh',
    chemistry: 'NMC Alta Densidade',
    replacementCostRange: 'R$ 48.000 – R$ 74.000',
    nominalVoltage: 368,
    cellsCount: 96,
    popularYear: '2023–2026',
  },
  {
    id: 'volvo-xc40-ex30',
    brand: 'Volvo',
    model: 'EX30 / XC40 / C40 Recharge',
    type: '100% Elétrico (BEV)',
    batteryCapacity: '51 kWh – 78 kWh',
    chemistry: 'LFP / NMC Modular',
    replacementCostRange: 'R$ 85.000 – R$ 135.000',
    nominalVoltage: 404,
    cellsCount: 108,
    popularYear: '2021–2026',
  },
  {
    id: 'porsche-taycan',
    brand: 'Porsche',
    model: 'Taycan / Macan Electric',
    type: '100% Elétrico (BEV)',
    batteryCapacity: '79.2 kWh / 93.4 kWh',
    chemistry: 'NMC 800V Performance',
    replacementCostRange: 'R$ 130.000 – R$ 210.000',
    nominalVoltage: 723,
    cellsCount: 198,
    popularYear: '2020–2026',
  },
  {
    id: 'bmw-ix-i4',
    brand: 'BMW',
    model: 'iX1 / iX3 / i4 / iX / 330e',
    type: '100% Elétrico (BEV)',
    batteryCapacity: '66.5 kWh – 111.5 kWh',
    chemistry: 'NMC Gen5 Prismática',
    replacementCostRange: 'R$ 92.000 – R$ 160.000',
    nominalVoltage: 398,
    cellsCount: 108,
    popularYear: '2020–2026',
  },
  {
    id: 'renault-kwid-megane',
    brand: 'Renault',
    model: 'Kwid E-Tech / Megane E-Tech',
    type: '100% Elétrico (BEV)',
    batteryCapacity: '26.8 kWh / 60 kWh',
    chemistry: 'NMC Li-ion',
    replacementCostRange: 'R$ 42.000 – R$ 78.000',
    nominalVoltage: 310,
    cellsCount: 84,
    popularYear: '2022–2026',
  },
  {
    id: 'chery-tiggo8',
    brand: 'CAOA Chery',
    model: 'Tiggo 8 Pro Plug-in Hybrid / iCar',
    type: 'Híbrido Plug-in (PHEV)',
    batteryCapacity: '19.27 kWh / 30.8 kWh',
    chemistry: 'NMC Ternária',
    replacementCostRange: 'R$ 44.000 – R$ 65.000',
    nominalVoltage: 350,
    cellsCount: 96,
    popularYear: '2022–2026',
  },
];

export interface CaseStudy {
  id: string;
  tag: string;
  role: string;
  vehicle: string;
  sohFound: number;
  headline: string;
  story: string;
  financialOutcome: string;
  location: string;
}

export const REAL_CASES: CaseStudy[] = [
  {
    id: 'case-comprador',
    tag: 'Compra Segura',
    role: 'Comprador de Seminovo',
    vehicle: 'SUV Elétrico 2023 · 38.000 km',
    sohFound: 78,
    headline: 'O painel marcava 100% de carga normal, mas o scanner AVILOO revelou 22% de perda oculta por excesso de eletroposto rápido.',
    story: 'O comprador estava prestes a pagar R$ 189.000 à vista. No test-drive o carro parecia impecável. O diagnóstico no local identificou desbalanceamento de 64 mV em dois módulos e SoH real de 78%. Com o laudo PDF em mãos, ele desistiu daquela unidade e comprou outra com 95% de SoH pelo mesmo valor.',
    financialOutcome: 'R$ 68.000 de prejuízo evitado',
    location: 'Cambuí · Campinas, SP',
  },
  {
    id: 'case-vendedor',
    tag: 'Venda Valorizada',
    role: 'Proprietário Particular',
    vehicle: 'BYD Dolphin GS 2024 · 24.000 km',
    sohFound: 97,
    headline: 'Vendeu em 5 dias pelo valor cheio da tabela ao anexar o Laudo Independente Cell Metrics no anúncio.',
    story: 'Três interessados pediram R$ 12.000 de desconto alegando "medo da bateria usada". Após emitir o laudo oficial comprovando 97% de Estado de Saúde (SoH) e células 100% equalizadas (delta de apenas 8 mV), o primeiro visitante fechou negócio sem pedir um real de abatimento.',
    financialOutcome: '+R$ 12.000 preservados na venda',
    location: 'Alphaville · Campinas, SP',
  },
  {
    id: 'case-loja',
    tag: 'Giro de Estoque',
    role: 'Loja Multimarcas Premium',
    vehicle: 'Lote de 6 Híbridos & Elétricos na Troca',
    sohFound: 93,
    headline: 'Avaliação técnica na captação evita receber "bomba" na troca e vira selo de confiança no showroom.',
    story: 'A loja passou a exigir o diagnóstico Cell Metrics antes de fechar a avaliação de qualquer elétrico ou híbrido plug-in recebido como parte de pagamento. Além de barrar veículos com células degradadas, entrega o certificado impresso no porta-luvas de cada carro à venda.',
    financialOutcome: 'Zero garantia acionada + venda 2x mais rápida',
    location: 'Av. Norte-Sul · Campinas, SP',
  },
];

export const FAQ_ITEMS = [
  {
    category: 'Técnico & Garantia',
    question: 'O teste com o scanner AVILOO afeta a garantia de fábrica do veículo?',
    answer: 'De forma alguma. O diagnóstico é 100% não invasivo, homologado na União Europeia e utilizado pelas próprias montadoras. Não desmontamos nenhuma peça, não alteramos softwares e apenas realizamos a leitura passiva de alta precisão via porta de diagnóstico original (OBD). Sua garantia de fábrica permanece 100% intacta.',
  },
  {
    category: 'Diferencial',
    question: 'Por que a autonomia no painel do carro não mostra a saúde real da bateria?',
    answer: 'O computador de bordo do veículo exibe apenas uma estimativa de alcance baseada nos últimos quilômetros rodados e pode mascarar células enfraquecidas através de buffers de software. Dois carros do mesmo ano e quilometragem podem mostrar "100% carregado" no painel, mas um ter 96% da capacidade original e o outro apenas 75% devido a recargas rápidas frequentes (DC) e calor excessivo.',
  },
  {
    category: 'O Laudo',
    question: 'O que exatamente vem detalhado no Laudo em PDF da Cell Metrics?',
    answer: 'Você recebe um documento técnico oficial mas em linguagem clara, vinculado ao número de chassi (VIN) do veículo, contendo: 1) Estado de Saúde real da bateria de tração (SoH em %), 2) Análise individualizada das células (identificando se há alguma célula fraca puxando o conjunto para baixo), 3) Condição térmica e de tensão do pack no momento do teste, e 4) Parecer independente certificado pela tecnologia austríaca AVILOO.',
  },
  {
    category: 'Logística',
    question: 'Preciso levar o carro até uma oficina? Quanto tempo dura o atendimento no local?',
    answer: 'Você não precisa tirar o carro do lugar. Nosso especialista vai até onde o veículo estiver — na sua garagem, no estacionamento do vendedor, na concessionária ou no pátio da sua empresa em Campinas e região. A conexão e coleta de dados levam cerca de 20 a 40 minutos no local, sem sujar ou desmontar nada.',
  },
  {
    category: 'Prazo & Entrega',
    question: 'Em quanto tempo recebo o relatório oficial?',
    answer: 'O laudo completo em PDF é processado na nuvem de telemetria da AVILOO (Áustria) e revisado pela nossa equipe técnica, chegando no seu e-mail e WhatsApp em no máximo 48 horas após a leitura (frequentemente antes disso para negociações urgentes).',
  },
  {
    category: 'Compatibilidade',
    question: 'Meu carro elétrico ou híbrido é compatível?',
    answer: 'Sim! A tecnologia AVILOO é compatível com mais de 300 modelos de veículos 100% elétricos (BEV) e híbridos plug-in (PHEV), incluindo toda a linha BYD, GWM, Volvo, Porsche, BMW, Audi, Renault, Peugeot, CAOA Chery, JAC, Mercedes-Benz, Mini e Tesla. Use nosso verificador nesta página ou envie o modelo pelo WhatsApp para confirmação imediata.',
  },
  {
    category: 'Imparcialidade',
    question: 'Por que o laudo da Cell Metrics é aceito tanto por compradores quanto por vendedores?',
    answer: 'Porque somos 100% independentes (Cell Metrics by Auto Visão). Nós não compramos, não vendemos veículos e não fazemos manutenção ou venda de baterias. Nosso único compromisso é entregar a leitura exata e auditável da bateria, sem conflito de interesses.',
  },
  {
    category: 'Investimento',
    question: 'Quanto custa o diagnóstico frente ao risco da bateria?',
    answer: 'Enquanto a substituição de uma bateria de tração no Brasil custa entre R$ 40.000 e mais de R$ 140.000, o diagnóstico completo custa menos de 1% do valor do veículo. O orçamento pelo site ou WhatsApp é 100% gratuito e informamos o valor exato e horários disponíveis para o seu modelo e localização em minutos.',
  },
];

export const WHATSAPP_NUMBER = '5519992248383';

export function buildWhatsAppUrl(customText?: string): string {
  const defaultMsg =
    'Olá! Vi o site da Cell Metrics e quero solicitar um orçamento para o diagnóstico de bateria (laudo AVILOO).';
  const text = encodeURIComponent(customText || defaultMsg);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
