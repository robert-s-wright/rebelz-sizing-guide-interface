const animation = {
  initial: {
    // scale: 0.9,
    opacity: 0.3,
    borderRadius: "50%",
    // y: 50,
  },
  animate: { scale: 1, opacity: 1, y: 0 },
  exit: {
    // scale: 0.9,
    opacity: 0.3,
    // y: 50,
  },
  transition: {
    duration: 0.2,
    // delay: 0.5,
    ease: [0, 0.71, 0.5, 1.01],
  },
};

export { animation };
