import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface BatteryScanProps {
  vehicleName: string;
  soh: number;
  packVoltage: number;
  tempC: number;
  cellDeltaMv: number;
  hasWeakCell: boolean;
  savingsLabel: string;
  isMobile?: boolean;
}

export const BatteryScanVideo: React.FC<BatteryScanProps> = ({
  vehicleName = 'BYD Dolphin GS · 2024',
  soh = 94,
  packVoltage = 398.4,
  tempC = 24.2,
  cellDeltaMv = 11,
  hasWeakCell = false,
  savingsLabel = 'Valorização & Negociação Segura',
  isMobile = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 360 frames @ 30fps = 12 seconds loop
  const act1Opacity = interpolate(frame, [0, 12, 102, 118], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const act2Opacity = interpolate(frame, [112, 126, 234, 250], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const act3Opacity = interpolate(frame, [242, 258, 345, 360], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scanProgress = interpolate(frame, [15, 95], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const animatedSoh = Math.round(
    interpolate(frame, [130, 195], [50, soh], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const animatedVoltage = interpolate(
    frame,
    [130, 195],
    [310, packVoltage],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  ).toFixed(1);

  const cardSpring = spring({
    frame: Math.max(0, frame - 248),
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const isHealthy = soh >= 88 && !hasWeakCell;
  const accentColor = isHealthy ? '#90BE3D' : '#F59E0B';
  const alertColor = '#EF4444';

  const cellCount = isMobile ? 12 : 24;
  const cells = Array.from({ length: cellCount }, (_, idx) => {
    const isWeak = hasWeakCell && (idx === 4 || idx === 9);
    const cellRevealFrame = 122 + idx * (isMobile ? 3.5 : 2.2);
    const cellScale = spring({
      frame: Math.max(0, frame - cellRevealFrame),
      fps,
      config: { damping: 12, stiffness: 140 },
    });
    const baseVoltage = 3.68;
    const cellVolt = isWeak
      ? (baseVoltage - 0.078).toFixed(3)
      : (baseVoltage + ((idx % 5) - 2) * 0.002).toFixed(3);
    return { idx, isWeak, cellScale, cellVolt };
  });

  const activeHexCount =
    soh >= 92 ? 5 : soh >= 82 ? 4 : soh >= 72 ? 3 : soh >= 60 ? 2 : 1;

  const padX = isMobile ? 20 : 36;
  const padTop = isMobile ? 86 : 84;
  const padBottom = isMobile ? 22 : 30;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1F262C',
        fontFamily: 'Montserrat, sans-serif',
        fontVariantNumeric: 'tabular-nums',
        color: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      {/* Official Colmeia Escuro Pattern Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(144,190,61,0.16) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: isHealthy
            ? 'radial-gradient(circle, rgba(144,190,61,0.18) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)',
          top: -120,
          right: -100,
        }}
      />

      {/* Top HUD Bar */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: padX,
          right: padX,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: isMobile ? '8px 12px' : '8px 18px',
          background: 'rgba(21, 28, 34, 0.94)',
          border: '1px solid rgba(144, 190, 61, 0.35)',
          borderRadius: 12,
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src={`${import.meta.env.BASE_URL || './'}assets/logo-icon.svg`}
            alt="Cell Metrics"
            style={{ width: 24, height: 24, objectFit: 'contain' }}
          />
          <span
            style={{
              fontSize: isMobile ? 10 : 12,
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#90BE3D',
            }}
          >
            {isMobile ? 'CELL METRICS' : 'CELL METRICS · SCANNER AVILOO'}
          </span>
        </div>

        {!isMobile && (
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#FFFFFF',
            }}
          >
            {vehicleName}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            gap: 5,
            alignItems: 'center',
            fontSize: isMobile ? 10 : 11,
            fontWeight: 700,
            color: '#90BE3D',
          }}
        >
          <span>
            {frame < 115
              ? '01/03 RAIO-X'
              : frame < 245
              ? '02/03 CÉLULAS'
              : '03/03 LAUDO PDF'}
          </span>
        </div>
      </div>

      {/* =========================================================
          ACT 1: O QUE O PAINEL ESCONDE (FRAMES 0 - 115)
         ========================================================= */}
      <AbsoluteFill
        style={{
          opacity: act1Opacity,
          padding: `${padTop}px ${padX}px ${padBottom}px ${padX}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-block',
              padding: '4px 10px',
              borderRadius: 999,
              background: 'rgba(144, 190, 61, 0.16)',
              border: '1px solid rgba(144, 190, 61, 0.4)',
              color: '#90BE3D',
              fontSize: isMobile ? 10 : 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            O QUE O TEST-DRIVE NÃO MOSTRA
          </div>
          <h2
            style={{
              fontSize: isMobile ? 21 : 27,
              fontWeight: 800,
              lineHeight: 1.22,
              margin: 0,
              color: '#FFFFFF',
            }}
          >
            No painel parece <span style={{ color: '#90BE3D' }}>100%</span>. Por
            dentro, recargas rápidas desgastam as células.
          </h2>
        </div>

        {/* X-Ray Battery Chassis Scanner */}
        <div
          style={{
            position: 'relative',
            height: isMobile ? 240 : 215,
            borderRadius: 16,
            background:
              'linear-gradient(135deg, rgba(21,98,63,0.28) 0%, rgba(21,27,32,0.96) 100%)',
            border: '1px solid rgba(144,190,61,0.35)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? 16 : 24,
          }}
        >
          <div
            style={{
              width: isMobile ? '96%' : '88%',
              height: isMobile ? 160 : 130,
              borderRadius: 12,
              border: '2px solid rgba(144,190,61,0.55)',
              background: '#151B20',
              padding: 10,
              display: 'grid',
              gridTemplateColumns: isMobile
                ? 'repeat(4, 1fr)'
                : 'repeat(8, 1fr)',
              gap: 6,
              position: 'relative',
            }}
          >
            {Array.from({ length: isMobile ? 8 : 16 }).map((_, i) => {
              const totalMods = isMobile ? 8 : 16;
              const modulePos = (i / totalMods) * 100;
              const isScanned = scanProgress >= modulePos;
              const isAlertMod =
                hasWeakCell && (i === 2 || i === 5 || i === 11);
              return (
                <div
                  key={i}
                  style={{
                    borderRadius: 6,
                    background: !isScanned
                      ? 'rgba(255,255,255,0.06)'
                      : isAlertMod
                      ? 'rgba(239, 68, 68, 0.35)'
                      : 'rgba(144, 190, 61, 0.28)',
                    border: !isScanned
                      ? '1px solid rgba(255,255,255,0.1)'
                      : isAlertMod
                      ? '1px solid #EF4444'
                      : '1px solid #90BE3D',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 700,
                    color: isAlertMod ? '#FCA5A5' : '#FFFFFF',
                  }}
                >
                  <span style={{ fontSize: 9, opacity: 0.8 }}>M{i + 1}</span>
                  <span style={{ fontWeight: 800, fontSize: 11 }}>
                    {isScanned ? (isAlertMod ? '3.59V!' : '3.68V') : '---'}
                  </span>
                </div>
              );
            })}

            {/* Moving Laser Scan Line */}
            <div
              style={{
                position: 'absolute',
                top: -12,
                bottom: -12,
                left: `${scanProgress}%`,
                width: 4,
                background: '#90BE3D',
                boxShadow:
                  '0 0 22px 6px rgba(144, 190, 61, 0.9), 0 0 45px 12px rgba(144, 190, 61, 0.4)',
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 10,
              left: 16,
              right: 16,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 10,
              fontWeight: 700,
              color: '#DDE1DC',
            }}
          >
            <span>SCAN: {Math.round(scanProgress)}%</span>
            <span style={{ color: '#90BE3D', fontWeight: 800 }}>
              SEM DESMONTAR NADA · NO LOCAL
            </span>
          </div>
        </div>

        {/* Bottom Comparison Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 10,
          }}
        >
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 12,
              background: 'rgba(51, 61, 70, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <div style={{ fontSize: 10, color: '#DDE1DC', fontWeight: 700 }}>
              PAINEL DO CARRO E TEST-DRIVE
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, marginTop: 2 }}>
              Não revelam o desgaste interno das células
            </div>
          </div>
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 12,
              background: 'rgba(21, 98, 63, 0.45)',
              border: '1px solid #90BE3D',
            }}
          >
            <div style={{ fontSize: 10, color: '#90BE3D', fontWeight: 700 }}>
              SCANNER AVILOO (DA ÁUSTRIA)
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, marginTop: 2 }}>
              Mede Estado de Saúde (SoH) e células uma a uma
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* =========================================================
          ACT 2: TELEMETRIA CÉLULA A CÉLULA (FRAMES 115 - 245)
         ========================================================= */}
      <AbsoluteFill
        style={{
          opacity: act2Opacity,
          padding: `${padTop}px ${padX}px ${padBottom}px ${padX}px`,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.35fr 1fr',
          gap: isMobile ? 14 : 22,
        }}
      >
        <div
          style={{
            background: 'rgba(21, 27, 32, 0.95)',
            border: '1px solid rgba(144, 190, 61, 0.35)',
            borderRadius: 16,
            padding: isMobile ? 14 : 18,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#90BE3D',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                CÉLULAS, UMA A UMA
              </div>
              <div style={{ fontSize: isMobile ? 14 : 17, fontWeight: 800 }}>
                Equilíbrio do Pack ({vehicleName})
              </div>
            </div>
            <div
              style={{
                padding: '4px 9px',
                borderRadius: 8,
                background: hasWeakCell
                  ? 'rgba(239, 68, 68, 0.25)'
                  : 'rgba(21, 98, 63, 0.5)',
                color: '#FFFFFF',
                fontSize: 10,
                fontWeight: 800,
                whiteSpace: 'nowrap',
              }}
            >
              DELTA: {cellDeltaMv} mV
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile
                ? 'repeat(4, 1fr)'
                : 'repeat(6, 1fr)',
              gap: 6,
              marginTop: 8,
              marginBottom: 8,
            }}
          >
            {cells.map((cell) => (
              <div
                key={cell.idx}
                style={{
                  transform: `scale(${cell.cellScale})`,
                  padding: isMobile ? '6px 4px' : '8px 6px',
                  borderRadius: 8,
                  background: cell.isWeak
                    ? 'rgba(239, 68, 68, 0.32)'
                    : 'rgba(144, 190, 61, 0.16)',
                  border: cell.isWeak
                    ? `1.5px solid ${alertColor}`
                    : '1px solid rgba(144, 190, 61, 0.42)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    color: cell.isWeak ? '#FCA5A5' : '#DDE1DC',
                  }}
                >
                  C#{String(cell.idx + 1).padStart(2, '0')}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginTop: 1,
                  }}
                >
                  {cell.cellVolt}V
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: '#DDE1DC',
            }}
          >
            {hasWeakCell
              ? '⚠️ Células mais fracas puxando o conjunto para baixo'
              : '✓ Todas as células equilibradas no momento do teste'}
          </div>
        </div>

        {/* Right / Bottom: Telemetry Metrics */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <div
            style={{
              background:
                'linear-gradient(145deg, rgba(21,98,63,0.48) 0%, rgba(21,27,32,0.96) 100%)',
              border: `2px solid ${accentColor}`,
              borderRadius: 16,
              padding: isMobile ? 14 : 18,
              flex: 1,
              display: 'flex',
              flexDirection: isMobile ? 'row' : 'column',
              alignItems: isMobile ? 'center' : 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: accentColor,
                }}
              >
                Estado de Saúde (SoH)
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: '#DDE1DC',
                  marginTop: 4,
                  maxWidth: isMobile ? 190 : 'none',
                }}
              >
                Capacidade original retida pela bateria
              </div>
            </div>
            <div
              style={{
                fontSize: isMobile ? 42 : 52,
                fontWeight: 800,
                lineHeight: 1,
                color: '#FFFFFF',
              }}
            >
              {animatedSoh}%
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
            }}
          >
            <div
              style={{
                background: 'rgba(21, 27, 32, 0.95)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12,
                padding: 12,
              }}
            >
              <div style={{ fontSize: 10, color: '#DDE1DC', fontWeight: 700 }}>
                TENSÃO DO PACK
              </div>
              <div
                style={{
                  fontSize: isMobile ? 18 : 22,
                  fontWeight: 800,
                  color: '#90BE3D',
                  marginTop: 2,
                }}
              >
                {animatedVoltage} V
              </div>
            </div>

            <div
              style={{
                background: 'rgba(21, 27, 32, 0.95)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12,
                padding: 12,
              }}
            >
              <div style={{ fontSize: 10, color: '#DDE1DC', fontWeight: 700 }}>
                TEMPERATURA
              </div>
              <div
                style={{
                  fontSize: isMobile ? 18 : 22,
                  fontWeight: 800,
                  color: '#90BE3D',
                  marginTop: 2,
                }}
              >
                {tempC.toFixed(0)} °C
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* =========================================================
          ACT 3: LAUDO OFICIAL EM PDF (FRAMES 245 - 360)
         ========================================================= */}
      <AbsoluteFill
        style={{
          opacity: act3Opacity,
          padding: `${padTop}px ${padX}px ${padBottom}px ${padX}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `scale(${interpolate(cardSpring, [0, 1], [0.9, 1])})`,
            width: '100%',
            background:
              'linear-gradient(135deg, rgba(21,98,63,0.42) 0%, rgba(21,27,32,0.98) 100%)',
            border: `2px solid ${accentColor}`,
            borderRadius: 20,
            padding: isMobile ? 18 : 26,
            boxShadow: '0 25px 60px rgba(0,0,0,0.65)',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.25fr 1fr',
            gap: isMobile ? 16 : 24,
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                borderRadius: 999,
                background: 'rgba(144, 190, 61, 0.2)',
                color: '#90BE3D',
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              ✓ LAUDO EM PDF EM ATÉ 48 HORAS
            </div>
            <h3
              style={{
                fontSize: isMobile ? 19 : 25,
                fontWeight: 800,
                margin: 0,
                lineHeight: 1.2,
                color: '#FFFFFF',
              }}
            >
              Documento independente vinculado ao chassi (VIN)
            </h3>
            <p
              style={{
                fontSize: isMobile ? 12 : 13.5,
                color: '#DDE1DC',
                lineHeight: 1.5,
                marginTop: 8,
                marginBottom: 12,
              }}
            >
              A Cell Metrics não compra nem vende veículos. Relatório em linguagem simples, pronto para mostrar na negociação.
            </p>
            <div
              style={{
                display: 'inline-block',
                padding: '8px 14px',
                borderRadius: 10,
                background: 'rgba(21, 98, 63, 0.55)',
                border: '1px solid #90BE3D',
                fontSize: 12,
                fontWeight: 800,
                color: '#FFFFFF',
              }}
            >
              {savingsLabel}
            </div>
          </div>

          {/* Official Certificate Summary Card */}
          <div
            style={{
              background: '#F8F5F1',
              color: '#1F262C',
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
              border: '1px solid #E3DED6',
            }}
          >
            <div
              style={{
                background: '#1F262C',
                padding: '10px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '3px solid #90BE3D',
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL || './'}assets/logo-h.svg`}
                alt="Cell Metrics"
                style={{ height: 28, width: 'auto' }}
              />
              <span
                style={{
                  background: isHealthy ? '#15623F' : '#B45309',
                  color: '#FFFFFF',
                  padding: '3px 8px',
                  borderRadius: 6,
                  fontSize: 9,
                  fontWeight: 800,
                }}
              >
                LAUDO A4
              </span>
            </div>

            <div style={{ padding: 14 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: '#15623F',
                  letterSpacing: '0.06em',
                  marginBottom: 2,
                }}
              >
                LAUDO DE SAÚDE DA BATERIA
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#333D46',
                  marginBottom: 10,
                }}
              >
                {vehicleName}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <svg
                  width="115"
                  height="24"
                  viewBox="0 0 185 38"
                  fill="none"
                >
                  {[0, 1, 2, 3, 4].map((idx) => {
                    const xOffset = idx * 36;
                    const active = idx < activeHexCount;
                    return (
                      <polygon
                        key={idx}
                        points={`${xOffset + 18},2 ${xOffset + 34},11 ${
                          xOffset + 34
                        },27 ${xOffset + 18},36 ${xOffset + 2},27 ${
                          xOffset + 2
                        },11`}
                        fill={active ? '#90BE3D' : '#DDE1DC'}
                      />
                    );
                  })}
                </svg>

                <span
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: '#15623F',
                  }}
                >
                  {soh}%
                </span>
              </div>

              <div
                style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  color: '#333D46',
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '2px solid #90BE3D',
                  paddingTop: 6,
                }}
              >
                <span>Cell Metrics · Inteligência em Baterias</span>
                <span>pág. 1/1</span>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
