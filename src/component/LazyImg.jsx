import React, { lazy, useEffect, useRef } from "react";
import PropTypes from "prop-types";

export const LazyLoad = ({ src, lazy, alt = "img", className, style = {} }) => {
  const ref = useRef();
  useEffect(() => {
    const lazyLoad = ref.current.getAttribute("lazy-load");
    try {
      if ("IntersectionObserver" in window) {
        const obServer = new IntersectionObserver((entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            entry.target.src = lazyLoad;
            entry.target.classList.remove("on_blur");
            obServer.unobserve(entry.target);
          }
        });
        obServer.observe(ref.current);
      }
    } catch (error) {
      console.log("lazy load err", error);
    }
  }, []);
  return (
    <img
      style={style}
      className={className}
      ref={ref}
      src={src}
      lazy-load={lazy}
      alt={alt}
    />
  );
};
LazyLoad.propTypes = {
  src: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};
