import { computed } from "vue";

function useBackgroundColor (props){
    return computed(() => {
        const options = {
            danger: 'var(--danger-color)',
            info: 'var(--light-color)',
            warning: 'var(--warning-color)',
            success: 'var(--success-color)',
            secondary: 'var(--main-lighter-color)',
            main: 'var(--main-default-color)',
        }
        return options[props.variant];
    })
}

const backgroundColorProps = {
    variant: {
        required: false,
        default: 'main',
        validator(value) {
            const options = ['danger', 'warning', 'info', 'success', 'secondary', 'main']

            return options.includes(value);
        }
    },
}

export { useBackgroundColor, backgroundColorProps }