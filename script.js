// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });
    
    // Desplazamiento suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Carrusel de testimonios
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    // Ocultar todos los testimonios excepto el primero
    for (let i = 1; i < testimonials.length; i++) {
        testimonials[i].style.display = 'none';
    }
    
    // Función para mostrar un testimonio específico
    function showTestimonial(index) {
        // Ocultar todos los testimonios
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        // Quitar la clase active de todos los dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar el testimonio seleccionado
        testimonials[index].style.display = 'block';
        dots[index].classList.add('active');
        
        // Añadir animación de fade in
        testimonials[index].style.opacity = 0;
        let opacity = 0;
        const fadeIn = setInterval(() => {
            opacity += 0.1;
            testimonials[index].style.opacity = opacity;
            if (opacity >= 1) clearInterval(fadeIn);
        }, 50);
        
        currentTestimonial = index;
    }
    
    // Añadir event listeners a los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Cambiar automáticamente los testimonios cada 5 segundos
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Animación de elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-card, .gallery-item, .about-image, .about-text, .contact-form, .contact-info');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inicialmente establecer los elementos como invisibles
    const elementsToAnimate = document.querySelectorAll('.product-card, .gallery-item, .about-image, .about-text, .contact-form, .contact-info');
    elementsToAnimate.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar la animación al cargar la página y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Formulario de contacto
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí normalmente se enviaría el formulario a un servidor
            // Para esta demo, mostraremos un mensaje de éxito
            const formElements = orderForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type !== 'submit') {
                    formElements[i].value = '';
                }
            }
            
            // Crear y mostrar mensaje de éxito
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = '¡Gracias por tu pedido! Te contactaremos pronto.';
            successMessage.style.backgroundColor = '#e75a7c';
            successMessage.style.color = 'white';
            successMessage.style.padding = '15px';
            successMessage.style.borderRadius = '5px';
            successMessage.style.marginTop = '20px';
            successMessage.style.textAlign = 'center';
            
            orderForm.appendChild(successMessage);
            
            // Eliminar el mensaje después de 5 segundos
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Efecto de zoom en las imágenes de la galería al hacer hover
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1)';
        });
    });
    
    // Cambiar el estilo del header al hacer scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});