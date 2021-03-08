import React, { useRef, useEffect } from 'react';
import { loading } from '../assets/css/makeStyles';
import animationData from '../assets/2275-loading-book.json';
import lottie from 'lottie-web';

const LoadingSpinner = () => {
  const container = useRef(null);
  const styles = loading();
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
    });
  }, []);
  return (
    <div className={styles.loading}>
      <div className={styles.book} ref={container}></div>
    </div>
  );
};

export default LoadingSpinner;
