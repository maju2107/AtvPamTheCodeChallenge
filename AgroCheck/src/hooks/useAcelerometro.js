import { useCallback, useEffect, useRef, useState } from "react";
import { Accelerometer } from "expo-sensors";

/**
 * Expo Accelerometer entrega x/y/z em g.
 * A resultante é sqrt(x² + y² + z²).
 */
export default function useAcelerometro() {
  const [accelerationG, setAccelerationG] = useState(1);
  const [peakG, setPeakG] = useState(0);
  const latestRef = useRef(1);

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      latestRef.current = magnitude;
      setAccelerationG(magnitude);
      setPeakG((old) => Math.max(old, magnitude));
    });

    return () => subscription.remove();
  }, []);

  const resetPeak = useCallback(() => setPeakG(0), []);

  return {
    accelerationG,
    peakG,
    resetPeak
  };
}