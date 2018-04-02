// 'Temp' screen methods, there are better ways to do this ¯\_(ツ)_/¯
function screenSize() {
  const width = window.innerWidth;
  if (width < 576) {
    return "xs";
  } else if (width < 768) {
    return "sm";
  } else if (width < 992) {
    return "md";
  } else if (width < 1200) {
    return "lg";
  } else if (width < 1600) {
    return "xl";
  }
  return "xxl";
}

function screenSizeIs(matches) {
  const currentScreenSize = screenSize();
  return matches.includes(currentScreenSize);
}

export { screenSize, screenSizeIs };
