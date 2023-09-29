import { reactive, ref } from 'vue';

/**
 * Funcion para mostrar modal con sus propiedades
 * @returns opacidad, modal y funcion para mostrar el modal
 */
function useModal(){
    const modal = reactive({
        showModal: false,
        content: [],
        title: '',
    });

    const modalAlert = reactive({
        showModal: false,
        title: '',
        showButtons: false,
        textColor: 'info'
    });

    const opacity = ref('1');

    const showModal = (content, title, options = {variant: 'info'}) => {
        modal.showModal = true;
        modal.content = content;
        modal.title = title;
        opacity.value = '0.2';
    };

    const showModalAlert = (title, buttons, options = {variant: 'info'}) => {
        modalAlert.showModal = true;
        modalAlert.title = title;
        modalAlert.variant = options.variant;
        modalAlert.showButtons = buttons;
        opacity.value = '0.2';
    };


    return {
        opacity,
        modal,
        showModal,
        modalAlert,
        showModalAlert
    };
};

export { useModal }