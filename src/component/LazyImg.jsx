import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { colorOuter, colorTxtBlur } from "../constants";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import { Box } from "@mui/material";

export const LazyLoad = ({ src, lazy, alt = "img", className, style = {} }) => {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  useEffect(() => {
    if (ref.current) {
      ref.current.onload = function () {
        setLoading(true);
      };
      ref.current.onerror = function () {
        setImgError(true);
      };
    }

    try {
      if ("IntersectionObserver" in window) {
        const obServer = new IntersectionObserver((entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            entry.target.setAttribute("lazy-load", src);
            entry.target.src = lazy;
            obServer.unobserve(entry.target);
          }
        });
        obServer.observe(ref.current);
      }
    } catch (error) {}
  }, []);
  return (
    <div style={{ marginTop: "8px" }}>
      {imgError ? (
        <Box
          sx={{
            width: "17rem",
            height: "13rem",
            backgroundColor: `${colorOuter}`,
            display: "flex",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              color: `${colorTxtBlur}`,
              flexWrap: "wrap",
            }}
          >
            <SentimentDissatisfiedOutlinedIcon
              sx={{ width: "3rem", height: "3rem" }}
            />
            <h5 style={{ margin: "0 0.5rem" }}>IMAGE NOT FOUND</h5>
          </Box>
        </Box>
      ) : (
        <img
          style={{
            width: "100%",
            height: loading ? "auto" : "13rem",
          }}
          className={className}
          ref={ref}
          src={loading ? src : "/placeholder-image.jpg"}
          lazy-load={lazy}
          alt={alt}
        />
      )}
    </div>
  );
};
LazyLoad.propTypes = {
  src: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};
