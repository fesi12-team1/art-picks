'use client';

import Script from 'next/script';
import React, { createContext, useContext, useState } from 'react';

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
const KAKAO_MAP_SCRIPT_SRC = `${process.env.NEXT_PUBLIC_KAKAO_MAP_URL}?appkey=${KAKAO_JS_KEY}&autoload=false`;

type CreateMapFn = (
  container: HTMLElement,
  options: Omit<kakao.maps.MapOptions, 'center'> & {
    center: { lat: number; lng: number };
  }
) => kakao.maps.Map | undefined;

interface KakaoMapContextValue {
  loaded: boolean;
  createMap: CreateMapFn;
}

const KakaoMapContext = createContext<KakaoMapContextValue | null>(null);

export function KakaoMapProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [, setError] = useState<Error | null>(null);

  const createMap: CreateMapFn = (container, options) => {
    if (!loaded || !window.kakao?.maps) {
      return;
    }

    const mapOptions = {
      center: new window.kakao.maps.LatLng(
        options.center.lat,
        options.center.lng
      ),
      level: options.level,
    };

    return new window.kakao.maps.Map(container, mapOptions);
  };

  const handleLoad = () => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        setLoaded(true);
      });
    } else {
      setError(
        new Error(
          'Kakao Map script loaded, but window.kakao.maps is not available.'
        )
      );
    }
  };

  const handleError = () => {
    setError(new Error('Failed to load Daum Postcode script'));
  };

  /*
    useEffect(() => {
      if (error) {
        throw error;
      }
    }, [error]);
  */

  return (
    <>
      <Script
        src={KAKAO_MAP_SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={() => handleLoad()}
        onError={() => handleError()}
      />
      <KakaoMapContext.Provider value={{ loaded, createMap }}>
        {children}
      </KakaoMapContext.Provider>
    </>
  );
}

export function useKakaoMap() {
  const ctx = useContext(KakaoMapContext);
  if (!ctx) {
    throw new Error('useKakaoMap must be used within KakaoMapProvider');
  }
  return ctx;
}
