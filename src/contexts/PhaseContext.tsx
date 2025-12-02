import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export type Phase = 'all' | 'spark' | 'momentum' | 'mastery';

interface PhaseContextValue {
  activePhase: Phase;
  setPhase: (phase: Phase) => void;
}

const PhaseContext = createContext<PhaseContextValue | undefined>(undefined);

const STORAGE_KEY = 'smb_phase';
const VALID_PHASES: Phase[] = ['all', 'spark', 'momentum', 'mastery'];

const isValidPhase = (value: string | null): value is Phase => {
  return value !== null && VALID_PHASES.includes(value as Phase);
};

export const PhaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activePhase, setPhaseState] = useState<Phase>(() => {
    // Priority 1: URL query param
    const urlPhase = searchParams.get('phase');
    if (isValidPhase(urlPhase)) {
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, urlPhase);
      }
      return urlPhase;
    }

    // Priority 2: localStorage
    if (typeof window !== 'undefined') {
      const storedPhase = localStorage.getItem(STORAGE_KEY);
      if (isValidPhase(storedPhase)) {
        return storedPhase;
      }
    }

    // Priority 3: Default to all
    return 'all';
  });

  // Sync URL param changes
  useEffect(() => {
    const urlPhase = searchParams.get('phase');
    if (isValidPhase(urlPhase) && urlPhase !== activePhase) {
      setPhaseState(urlPhase);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, urlPhase);
      }
    }
  }, [searchParams, activePhase]);

  const setPhase = (newPhase: Phase) => {
    setPhaseState(newPhase);

    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newPhase);
    }

    // Update URL without full page reload
    const currentPath = window.location.pathname;
    const currentSearch = new URLSearchParams(window.location.search);
    currentSearch.set('phase', newPhase);
    navigate(`${currentPath}?${currentSearch.toString()}`, { replace: true });
  };

  return (
    <PhaseContext.Provider value={{ activePhase, setPhase }}>
      {children}
    </PhaseContext.Provider>
  );
};

export const usePhase = (): PhaseContextValue => {
  const context = useContext(PhaseContext);
  if (!context) {
    throw new Error('usePhase must be used within a PhaseProvider');
  }
  return context;
};
