import React from 'react';

interface BrandLogoProps {
  variant?: 'horizontal-dark' | 'vertical-dark' | 'vertical-light' | 'icon';
  className?: string;
  alt?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal-dark',
  className = '',
  alt = 'Cell Metrics · Inteligência em Baterias',
}) => {
  const baseUrl = import.meta.env.BASE_URL || './';

  if (variant === 'icon') {
    return (
      <img
        src={`${baseUrl}assets/logo-icon.svg`}
        alt={alt}
        className={`select-none object-contain min-w-[24px] min-h-[24px] ${className}`}
      />
    );
  }

  if (variant === 'vertical-dark') {
    return (
      <img
        src={`${baseUrl}assets/logo-dark.svg`}
        alt={alt}
        className={`select-none object-contain min-w-[160px] ${className}`}
      />
    );
  }

  if (variant === 'vertical-light') {
    return (
      <img
        src={`${baseUrl}assets/logo-light.svg`}
        alt={alt}
        className={`select-none object-contain min-w-[160px] ${className}`}
      />
    );
  }

  return (
    <img
      src={`${baseUrl}assets/logo-h.svg`}
      alt={alt}
      className={`select-none object-contain min-w-[150px] sm:min-w-[165px] ${className}`}
    />
  );
};

interface HexChargeIndicatorProps {
  soh: number;
  size?: 'sm' | 'md' | 'lg';
}

export const HexChargeIndicator: React.FC<HexChargeIndicatorProps> = ({
  soh,
  size = 'md',
}) => {
  const activeCount =
    soh >= 92 ? 5 : soh >= 82 ? 4 : soh >= 72 ? 3 : soh >= 60 ? 2 : 1;

  const isLow = activeCount <= 2;
  const activeFill = isLow ? '#15623F' : '#90BE3D';
  const inactiveFill = '#DDE1DC';

  const dimensions =
    size === 'sm'
      ? { w: 115, h: 24 }
      : size === 'lg'
      ? { w: 180, h: 36 }
      : { w: 150, h: 30 };

  return (
    <svg
      width={dimensions.w}
      height={dimensions.h}
      viewBox="0 0 185 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Indicador de saúde da bateria: ${activeCount} de 5 células ativas (${soh}%)`}
      className="shrink-0 max-w-full h-auto"
    >
      {[0, 1, 2, 3, 4].map((idx) => {
        const xOffset = idx * 36;
        const isActive = idx < activeCount;
        return (
          <polygon
            key={idx}
            points={`${xOffset + 18},2 ${xOffset + 34},11 ${xOffset + 34},27 ${
              xOffset + 18
            },36 ${xOffset + 2},27 ${xOffset + 2},11`}
            fill={isActive ? activeFill : inactiveFill}
            className="transition-colors duration-300"
          />
        );
      })}
    </svg>
  );
};
