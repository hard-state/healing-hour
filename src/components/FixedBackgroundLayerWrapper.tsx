'use client';

import { useBackgroundVisibility } from '@/contexts/BackgroundVisibilityContext';
import FixedBackgroundLayer from '@/components/FixedBackgroundLayer';

export default function FixedBackgroundLayerWrapper() {
  const { isBackgroundVisible } = useBackgroundVisibility();
  return (
    <FixedBackgroundLayer isVisible={isBackgroundVisible} />
  );
}
