export const useMoveImage = (image: HTMLImageElement | null) => {
    const moveImage = (e: MouseEvent) => {
        if (!image.value) return;

        const { left, top, width, height } = image.value.getBoundingClientRect();

        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        image.value.style.transformOrigin = `${x}% ${y}%`;
    };

    const resetImage = () => {
        if (!image.value) return;

        image.value.style.transformOrigin = 'center center';
    };

    return {
        moveImage,
        resetImage
    };
};
