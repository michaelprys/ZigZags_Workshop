import { ref } from 'vue';

export const useTransition = () => {
    const transitionName = ref('');
    let timer: ReturnType<typeof setTimeout> | null = null;

    const applyTransition = (transition = '', ms = null) => {
        if (timer !== null) {
            clearTimeout(timer);
        }

        transitionName.value = transition;

        if (ms !== null) {
            timer = setTimeout(() => {
                transitionName.value = '';
            }, ms);
        }
    };

    return {
        transitionName,
        applyTransition
    };
};
