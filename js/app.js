document.addEventListener("DOMContentLoaded", () => {
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const mensaje = document.querySelector('#mensaje');
    const objeto = {
        email: '',
        asunto:'',
        mensaje:''
    }

    const BtnEnviar = document.querySelector('button[type="submit"]');

    inputEmail.addEventListener('blur', validar);

    inputAsunto.addEventListener('blur', validar);

    mensaje.addEventListener('blur', validar);

    function formCompleto() {
        if (objeto.email && objeto.asunto && objeto.mensaje) {
        BtnEnviar.disabled = false;
        BtnEnviar.classList.remove('opacity-50')
        } else {
            BtnEnviar.disabled = true;
        }
    }

    function validar(event) {
        if(event.target.value.trim() === '') {
            mostrarAlerta(`el campo ${event.target.id} es obligatorio`, event.target.parentElement);
            return;
        }

        if(event.target.id === 'email' && !validarEmail(event.target.value)) {
            mostrarAlerta('email invalido', event.target.parentElement);
            return;
        }

        objeto[event.target.id] = event.target.value.trim();

        formCompleto();
        limpiarAlerta(event.target.parentElement);
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-center', 'p-2', 'alerta');
        
        referencia.appendChild(error);
    }
    
})

function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector('.alerta');

    if(alerta) {
        alerta.remove();
    }
}

function validarEmail (email) {
    //Usamos una expresion regular para validar que este bien estructurado el mail
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
}
