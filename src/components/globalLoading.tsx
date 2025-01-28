'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useLoadingStore } from '@/app/store/loadingStore';

const GlobalLoading = () => {
  const { globalLoading } = useLoadingStore();

  if (!globalLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
};

export default GlobalLoading;

export const OffLoading = () => {
  const { setLoading, globalLoading } = useLoadingStore();
  if (!globalLoading) return null;
  setLoading(false);
  return null;
};
