const ImageMap = (() => {
  const checkMapPosition = (array, clickEvent, userPositionsArray) => {
    const { clickX, clickY } = calculateUserPosition(clickEvent);
    const validPosition = searchPositions(array, clickX, clickY);

    if (positionAlreadyFound(validPosition, userPositionsArray)) return;

    return validPosition;
  };

  const calculateUserPosition = (e) => {
    const { x, y } = e.target.parentNode.getBoundingClientRect();
    const { clientX, clientY, target } = e;

    const clickX = clientX + target.parentNode.scrollLeft - x;
    const clickY = clientY - y;

    return { clickX, clickY };
  };

  const searchPositions = (object, clickX, clickY) => {
    return object.positions.find((position) => {
      const { x, y, w, h } = position;

      const xEnd = x + w;
      const yEnd = y + h;

      if (clickX >= x && clickX <= xEnd && clickY >= y && clickY <= yEnd) {
        return position;
      }
    });
  };

  const positionAlreadyFound = (object, array) => {
    if (!array || !object) return false;

    return array.includes(object);
  };

  return {
    checkMapPosition,
    calculateUserPosition,
  };
})();

export default ImageMap;
