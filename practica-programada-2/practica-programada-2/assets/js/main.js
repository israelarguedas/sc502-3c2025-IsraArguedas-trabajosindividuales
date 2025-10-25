// Función de formato para colones
const formatoColones = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 2
});

// ***********************************************
// Función de Ejercicio 1: Cálculo de Deducciones 🇨🇷
// ***********************************************

const calcularDeducciones = () => {
    const salarioBruto = parseFloat(document.getElementById('salarioBruto').value);

    if (isNaN(salarioBruto) || salarioBruto < 0) {
        console.error("Salario bruto no válido.");
        return;
    }

    // 1. Cargas Sociales Obligatorias
    const PORCENTAJE_CARGAS_SOCIALES = 0.1067;
    const cargasSociales = salarioBruto * PORCENTAJE_CARGAS_SOCIALES;

    // 2. Impuesto de Renta 
    const baseGravableRenta = salarioBruto;
    let impuestoRenta = 0; 

    const tramos = [
        { limite: 922000, tasa: 0.00, anterior: 0 },
        { limite: 1352000, tasa: 0.10, anterior: 922000 },
        { limite: 2373000, tasa: 0.15, anterior: 1352000 },
        { limite: 4745000, tasa: 0.20, anterior: 2373000 },
        { limite: Infinity, tasa: 0.25, anterior: 4745000 }
    ];

    if (baseGravableRenta > tramos[0].limite) {
        for (let i = 1; i < tramos.length; i++) {
            const tramo = tramos[i];

            if (baseGravableRenta > tramo.anterior) {
                let montoGravableEnTramo;
                if (tramo.limite === Infinity) {
                    montoGravableEnTramo = baseGravableRenta - tramo.anterior;
                } else {
                    montoGravableEnTramo = Math.min(baseGravableRenta, tramo.limite) - tramo.anterior;
                }

                impuestoRenta += montoGravableEnTramo * tramo.tasa;
            }
        }
    }

    // 3. Salario Neto
    const salarioNeto = salarioBruto - cargasSociales - impuestoRenta;

    // 4. Mostrar Resultados
    document.getElementById('montoCargasSociales').textContent = formatoColones.format(cargasSociales);
    document.getElementById('montoImpuestoRenta').textContent = formatoColones.format(impuestoRenta);
    document.getElementById('salarioNeto').textContent = formatoColones.format(salarioNeto);
}

// ***********************************************
// Función de Ejercicio 2: Manipulación del DOM
// ***********************************************

const cambiarContenido = () => {
    const parrafo = document.getElementById('parrafo-dom');
    parrafo.textContent = "¡Contenido actualizado!";
    parrafo.className = "alert alert-success"; 
}

// ***********************************************
// Función de Ejercicio 3: Condicionales
// ***********************************************

const evaluarEdad = () => {
    const edad = parseInt(document.getElementById('edadUsuario').value);
    const resultado = document.getElementById('resultadoEdad');

    if (isNaN(edad) || edad < 1) {
        resultado.textContent = "Ingrese una edad válida.";
        resultado.className = "text-danger mt-3 fs-5";
        return;
    }

    if (edad >= 18) {
        resultado.textContent = `Tienes ${edad} años. El usuario es mayor de edad.`;
        resultado.className = "text-success mt-3 fs-5";
    } else { 
        resultado.textContent = `Tienes ${edad} años. El usuario es menor de edad.`;
        resultado.className = "text-danger mt-3 fs-5";
    }
}

// ***********************************************
// Función de Ejercicio 4: Arreglos y Bucles
// ***********************************************

const estudiantes = [
    { nombre: "Javier", apellido: "Mora", nota: 85.5 },
    { nombre: "Andrea", apellido: "Rojas", nota: 92.0 },
    { nombre: "Carlos", apellido: "López", nota: 78.5 },
    { nombre: "Valeria", apellido: "Picado", nota: 95.0 },
    { nombre: "Ricardo", apellido: "Núñez", nota: 88.0 }
];

const procesarEstudiantes = () => {
    const listaDiv = document.getElementById('estudiantes-lista');
    const promedioP = document.getElementById('promedioNotas');
    let sumaNotas = 0;

    listaDiv.innerHTML = ''; // Limpiar contenido anterior

    estudiantes.forEach(estudiante => {
        const divEstudiante = document.createElement('div');
        divEstudiante.textContent = `${estudiante.nombre} ${estudiante.apellido} - Nota: ${estudiante.nota.toFixed(1)}`;
        listaDiv.appendChild(divEstudiante);
        sumaNotas += estudiante.nota;
    });

    const promedio = sumaNotas / estudiantes.length;
    promedioP.textContent = `Promedio de notas del grupo: ${promedio.toFixed(2)}`;
    promedioP.className = "text-primary fs-5 fw-bold";
}

// ***********************************************
// Inicialización
// ***********************************************

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('btnCalcularDeducciones').addEventListener('click', calcularDeducciones);
    document.getElementById('btnCambiarDOM').addEventListener('click', cambiarContenido);
    document.getElementById('btnEvaluarEdad').addEventListener('click', evaluarEdad);

    calcularDeducciones();
    evaluarEdad();
    procesarEstudiantes();
});