import { computed } from "vue";

/**
 * Selecciona la clase de la alerta
 * @param {Object} props propiedades para ver el color que se requiere
 * @returns variante de las propiedades
 */
function useClassAlert(props){
    return computed(() => {
        const options = {
            danger: '#ED3B53',
            warning: '#FFFF00',
            info: '#283C8C',
            success: '#3A865E'
        };
        return options[props.variant];
    });
};

const colorProps = {
    variant: {
        required: false,
        default: 'danger',
        validator(value){
            const options = ['danger', 'warning', 'info', 'success'];

            return options.includes(value)
        }
    }
};

export { useClassAlert, colorProps };