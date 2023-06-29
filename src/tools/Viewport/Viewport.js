import { useState, useEffect } from "react";

const useViewport = () => {
  const [ viewport, setViewport ] = useState({});

  useEffect(() => {

    const getDevice = () => {
      const styles = window.getComputedStyle(document.querySelector('body'));
      const regex = /"/g;
      return styles.content.replaceAll(regex, "");
    };

    setViewport({
      width: window.innerWidth,
      height: window.innerHeight,
      device: getDevice()
    });

    window.addEventListener('resize', () => {
      const device = getDevice();
      
      if (viewport.device !== device) {
        setViewport({
          width: window.innerWidth,
          height: window.innerHeight,
          device: device
        });
      }
    })
  }, [])

  return viewport;
};

export default useViewport;