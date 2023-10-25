const opciones = { year: 'numeric', month: 'short', day: 'numeric' };

function formatDate(date){
    return new Date(date).toLocaleDateString('es-es', opciones);
}

export { formatDate };