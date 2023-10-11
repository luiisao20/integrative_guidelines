const infoExplicit = [
    {
        type: 'h',
        subContent: 'Se relaciona con el motivo de consulta proveniente del paciente o de otros demandantes'
    },
    {
        type: 'h',
        subContent: 'Permitir el relato libre para identificar el problema, la sintomatología y la demanda o interrogar sobre estos componentes'
    },
    {
        type: 'p',
        subContent: '¿Qué le indujo a buscar ayuda?'
    },
    {
        type: 'p',
        subContent: '¿Qué molestias tiene?'
    },
    {
        type: 'p',
        subContent: 'Cuénteme lo que le ocurre'
    },
    {
        type: 'h',
        subContent: 'Indagar la demanda consciente del paciente'
    },
    {
        type: 'p',
        subContent: '¿En qué podemos ayudarle?'
    },
    {
        type: 'p',
        subContent: '¿Qué esperaría como resultado de este proceso?'
    },
    {
        type: 'h',
        subContent: 'De las respuestas formuladas se obtiene el tipo de demanda: problemática, sintomática y en menor escala orientada a la personalidad'
    },
    
];

const infoImplicit = [
    {
        type: 'li',
        subContent: 'Puede ocultarse conscientemente por el demandante, no estar lo suficientemente estructurado por el mismo o ubicarse en un plano inconsciente',
    },
    {
        type: 'li',
        subContent: 'A veces es el verdadero motivo de consulta',
    },
    {
        type: 'li',
        subContent: 'Mantener una actitud de respeto y abstenerse de efectuar interpretaciones y señalamientos al inicio del proceso'
    },
];

const infoAnteced = [
    {
        type: 'li',
        subContent: 'Relacionar el problema y/o la sintomatología con los factores desencadenantes y la evolución del problema o trastorno'
    },
    {
        type: 'li',
        subContent: 'Recabar información sobre la evolución de los mismos, la ayuda o tratamientos recibidos, sus resultados, recaídas, dificultades terapéuticas vinculadas con las técnicas y procesos'
    },
    {
        type: 'h',
        subContent: 'La relación entre la demanda y los antecedentes disfuncionales debe proporcionar una aproximación diagnóstica del tipo de conflicto o trastorno'
    },
];


const infoHistoriaPsic = [
    {
        type: 'li',
        subContent: 'El propósito del estudio biográfico es llegar al diagnóstico de la personalidad'
    },
    {
        type: 'li',
        subContent: 'Se inicia con los datos de sus padres y las características de personalidad'
    },
    {
        type: 'p',
        subContent: '¿Sus padres viven, qué edad tienen, en qué trabajaban, cómo era o es el carácter de su padre, y el de su madre?'
    },
    {
        type: 'p',
        subContent: '¿Cómo se comportaban con usted y con sus hermanos?'
    },
    {
        type: 'li',
        subContent: 'Si han existido figuras sustitutivas indagar las causas para que se haya presentado esta condición e indagar su comportamiento'
    },
    {
        type: 'li',
        subContent: 'Investigar las experiencias más significativas de la niñez'
    },
    {
        type: 'p',
        subContent: '¿Qué recuerdos tiene de su niñez?'
    },
    {
        type: 'li',
        subContent: 'De acuerdo a la presunción diagnóstica investigar las experiencias tempranas influyentes en la estructura de personalidad relacionando la representación cognitiva de las mismas con el contenido emocional y conductual pasado y presente'
    },
    {
        type: 'p',
        subContent: '¿Cómo se sintió cuando ocurrió aquello y qué hizo en ese momento?'
    },
    {
        type: 'p',
        subContent: '¿Qué sentimientos tiene hoy y cree que afecta su relación actual?'
    },
    {
        type: 'h',
        subContent: 'Indagar su vida académica y las experiencias más importantes'
    },
    {
        type: 'p',
        subContent: '¿Cómo fue su rendimiento académico en la escuela, colegio y universidad?'
    },
    {
        type: 'li',
        subContent: 'Interrogar acerca de su desarrollo afectivo, sexual y matrimonial'
    },
    {
        type: 'p',
        subContent: 'Edad en la que produce sus contactos afectivos, sexuales y matrimonio'
    },
    {
        type: 'li',
        subContent: 'Preguntar sobre su vida laboral'
    },
    {
        type: 'p',
        subContent: 'Trabajos que ha realizado, motivos de cambios, relaciones laborales'
    },
    {
        type: 'h',
        subContent: 'Indagar sobre rasgos o dimensiones de personalidad que han sido permanentes a través de su desarrollo personal y posibles cambios producidos por acontecimientos importantes o traumáticos'
    },
    {
        type: 'p',
        subContent: '¿Cómo ha sido su carácter o temperamento?'
    },
    {
        type: 'p',
        subContent: '¿Ha tenido cambios en su carácter?'
    },
    
];

const infoResult = [
    {
        type: 'li',
        subContent: 'Cognitivas'
    },
    {
        type: 'li',
        subContent: 'Neuropsicológicas'
    },
    {
        type: 'li',
        subContent: 'De personalidad'
    },
    {
        type: 'li',
        subContent: 'Otras'
    },
];

const infoDiagnProblem = [
    {
        type: 'li',
        subContent: 'Describir el diagnóstico del problema considerando si se trata de un problema de frustración, conflicto intrapersonal (señalando el tipo) o conflicto interpersonal'
    },
    {
        type: 'li',
        subContent: 'Cuando se trate de una intervención de desarrollo personal señalar el área en la que se pretende actuar'
    },
    {
        type: 'li',
        subContent: 'Es una descripción transversal en la que se relaciona el diagnóstico con los factores que desencadenan la problemática'
    },
];

const infoDiagnTrast = [
    {
        type: 'li',
        subContent: 'Diagnosticar el trastorno (CIE o DSM) y describir la sindromología que justifique el mismo'
    },
    {
        type: 'li',
        subContent: 'Relacionar el diagnóstico con los factores precipitantes, predisponentes describiendo el desarrollo, remisiones, tratamientos, recaídas o cualquier otro dato importante de la dinámica del trastorno'
    },
    {
        type: 'li',
        subContent: 'Es una descripción fundamentalmente transversal, aunque puede incluir componentes históricos del trastorno'
    },
];

const infoDiagnPersonal = [
    {
        type: 'li',
        subContent: 'Diagnosticar la personalidad (MIFP) describiendo los rasgos o dimensiones presentes en el caso'
    },
    {
        type: 'li',
        subContent: 'Relacionar el diagnóstico con los componentes temperamentales y caracterológicos de acuerdo al tipo de personalidad'
    },
    {
        type: 'li',
        subContent: 'Es una descripción fundamentalmente longitudinal que considera los aspectos históricos del desarrollo'
    },
    {
        type: 'li',
        subContent: 'Describir cualitativamente las características presentes en el paciente en los siguientes aspectos:'
    },
    {
        type: 'sub-li',
        subContent: 'Motivación a recibir ayuda'
    },
    {
        type: 'sub-li',
        subContent: 'Capacidad cognitiva'
    },
    {
        type: 'sub-li',
        subContent: 'Grado de integración de la personalidad'
    },
    {
        type: 'sub-li',
        subContent: 'Capacidad de respuesta emocional'
    },
    {
        type: 'sub-li',
        subContent: 'Flexibilidad'
    },
    {
        type: 'sub-li',
        subContent: 'Locus de control'
    },
];

const infoCriter = [
    {
        type: 'li',
        subContent: 'Bueno o favorable'
    },
    {
        type: 'li',
        subContent: 'Regular'
    },
    {
        type: 'li',
        subContent: 'Malo'
    },
];

const infoRecomend = [
    {
        type: 'li',
        subContent: 'Personales'
    },
    {
        type: 'li',
        subContent: 'Familiares'
    },
    {
        type: 'li',
        subContent: 'Profesionales'
    },
];

const infoEvlouc = [
    {
        type: 'p',
        subContent: 'Apreciación subjetiva del paciente ASP 1………………………10'
    },
    {
        type: 'li',
        subContent: 'Anotar la fecha de cada sesión'
    },
    {
        type: 'li',
        subContent: 'La evolución considera el estado del paciente, sus avances, decrecimientos sintomáticos, recaídas, periodos estacionarios, cambios extra-terapéuticos, resultados que se obtienen con las técnicas utilizadas o las TIS'
    },
    {
        type: 'li',
        subContent: 'La ASP supone una evaluación subjetiva del paciente sobre su evolución durante el proceso. Se la efectúa en periodos de tiempo variables para incitar reflexiones sobre su estado'
    },
    {
        type: 'li',
        subContent: 'Las actividades consideran procedimientos de microtécnica o macrotécnica que se emplearon durante la sesión respectiva'
    },
];

function getInfoContent(id){
    let infoContent = null;
    switch (id){
        case '2.1':
            infoContent = infoExplicit;
            break;
        case '2.2':
            infoContent = infoImplicit;
            break;
        case '3':
        infoContent = infoAnteced;
            break;
        case '4':
            infoContent = infoHistoriaPsic;
            break;
        case '5':
            infoContent = infoResult;
            break;
        case '6.1':
            infoContent = infoDiagnProblem;
            break;
        case '6.2':
            infoContent = infoDiagnTrast;
            break;
        case '6.3':
            infoContent = infoDiagnPersonal;
            break;
        case '7':
            infoContent = infoCriter;
            break;
        case '8':
            infoContent = infoRecomend;
            break;
        case 'guide-six':
            infoContent = infoEvlouc;
            break;
    };
    return infoContent;
}

export { getInfoContent }