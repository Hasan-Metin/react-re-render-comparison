import { useRef } from 'react';

/**
 * Custom hook to count the number of renders of a component.
 * @returns {number} The current render count.
 */
const useRenderCount = () => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return renderCount.current;
};

export default useRenderCount;