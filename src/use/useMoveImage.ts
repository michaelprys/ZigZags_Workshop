export const useMoveImage = (image: HTMLImageElement | null) => {
    const moveImage = (e: MouseEvent) => {
        if (!image) return;

        const { left, top, width, height } = image.getBoundingClientRect();

        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        image.style.transformOrigin = `${x}% ${y}%`;
    };

    const resetImage = () => {
        if (!image) return;

        image.style.transformOrigin = 'center center';
    };

    return {
        moveImage,
        resetImage
    };
};
