const drawBackground = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, image: HTMLImageElement) => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imageAspectRatio = image.width / image.height;
    const canvasAspectRatio = canvasWidth / canvasHeight;

    let renderWidth = canvasWidth;
    let renderHeight = canvasHeight;

    if (imageAspectRatio > canvasAspectRatio) {
      // Image is wider than canvas, so scale to fill
      renderHeight = canvasHeight;
      renderWidth = renderHeight * imageAspectRatio;
    } else {
      // Image is taller than canvas, so scale to fill
      renderWidth = canvasWidth;
      renderHeight = renderWidth / imageAspectRatio;
    }

    context.drawImage(image, 0, 0, renderWidth, renderHeight);
}

export default drawBackground