"use strict";

var indicadorSlider;

function corniSequence(elemento, setup) {

    //Ajustar tamaño del contenedor a la imagen
    elemento.css({
        'min-height': elemento.children().height()

    });

    var anchoElemento = elemento.width();
    var altoElemento = elemento.height();

    elemento.siblings('.info-drag, .loading').css({
        width: anchoElemento,
        height: altoElemento,
        top: elemento.offset().top,

    });


    function animacionSecuencia(elemento, setup) {

        this.ele = elemento;
        this.inicio = setup.inicio;
        this.velocidad = setup.velocidad;
        this.delay = setup.delay;
        this.repeat = setup.repeat;
        this.reverse = setup.reverse;
        this.continuous = setup.continuous;
        this.bg = setup.background;
        this.optimization = setup.optimization;
        this.scroll = setup.scroll;
        this.texto = setup.texto;
        this.velocidadScroll = setup.scroll.velocidadScroll;
        this.duracion = function() {
            return (this.ele.children().length * this.velocidad);
        };
        this.textContent = function() {
            if (this.texto) {

                return this.texto;
            }
        }

        this.animar = function() {
            var contador = this.inicio;
            var contador2 = this.ele.children().length;
            var iniAnimation;
            var eleActivo = this.ele.children();

            if (this.bg === true) {

                this.ele.children().eq().css({
                    'display': 'none'
                })
                var ruta = eleActivo.eq(0).attr('src');

                //animaciones.ele.css({
                elemento.css({
                    'background': 'url(' + ruta + ')',
                    'background-size': 'cover',
                    'background-position': 'center center'
                });

            }
            if (this.bg == false) {
                this.ele.children().eq(0).css({
                    'display': 'block'
                })
            }

            function bucle() {

                if (contador === animaciones.ele.children().length) {

                    if (animaciones.repeat >= 1) {

                        contador = animaciones.inicio;
                        animaciones.repeat--;
                        bucle()

                    } else if (animaciones.repeat === 'infinite') {

                        if (contador = contador2) {
                            contador = animaciones.inicio;
                            bucle()
                        }

                    } else {

                        return false;
                    }

                } else if (animaciones.velocidad === 0) {

                    clearTimeout(iniAnimation);

                } else if (animaciones.scroll.status === true) {

                    var idIndicator = 'indicator-' + animaciones.ele.attr('id');

                    $('body').append('<div class="corniIndicator" id="' + idIndicator + '"><span>' + idIndicator + '</span></div>');

                    $('#' + idIndicator).css({
                        'top': animaciones.scroll.indicatorTop
                    });

                    var nF = 0;

                    if (animaciones.scroll.showIndicator === true) {

                        animaciones.ele.addClass('borde');
                        $('#' + idIndicator).css({
                            'visibility': 'visible'
                        });

                    } else {

                        animaciones.ele.removeClass('borde');
                        $('#' + idIndicator).css({
                            'visibility': 'hidden'
                        });
                    }

                    var indicatorTopPosition = $('#' + idIndicator)[0].getBoundingClientRect().top;
                    var alturaElemento = animaciones.ele.outerHeight();
                    var elementoStartPosition = animaciones.ele.offset().top;
                    var elementoFinalPosition = elementoStartPosition + alturaElemento;

                    var scrollFunc = function() {

                        var scrollActual = $(window).scrollTop() * animaciones.velocidadScroll;
                        var corregirScrollActual = 1 - animaciones.velocidadScroll;


                        if ((scrollActual + indicatorTopPosition > elementoStartPosition) && (scrollActual + indicatorTopPosition < elementoFinalPosition)) {

                            nF = (Math.floor((contador2 * ((scrollActual + corregirScrollActual) + indicatorTopPosition - elementoStartPosition)) / animaciones.ele.outerHeight()));

                            if (animaciones.scroll.showIndicator === true) {
                                $(elemento.find('.frames').selector).remove();
                                elemento.append('<div class="frames">Frames: ' + nF + '</div>');

                            } else {
                                $(elemento.find('.frames').selector).remove();
                            }

                            //Textos
                            if (animaciones.texto) {

                                var textos = animaciones.textContent();
                                if (textos.length > 0) {

                                    var eleText = elemento;
                                    var eleTextContainer = eleText.siblings()[0];

                                    for (var i = 0; i < textos.length; i++) {

                                        var eachText = eleText.siblings().children();

                                        if ((animaciones.texto[i].start <= nF) && (animaciones.texto[i].end > nF)) {

                                            eachText.eq(i).css({
                                                visibility: 'visible',
                                                top: ((animaciones.texto[i].position[0][0]) + ((animaciones.texto[i].position[1][0] - animaciones.texto[i].position[0][0]) * ((((nF - animaciones.texto[i].start) * 100) / (animaciones.texto[i].end - animaciones.texto[i].start)) / 100))) + '%',
                                                left: ((animaciones.texto[i].position[0][0]) + ((animaciones.texto[i].position[1][1] - animaciones.texto[i].position[0][1]) * ((((nF - animaciones.texto[i].start) * 100) / (animaciones.texto[i].end - animaciones.texto[i].start)) / 100))) + '%',

                                            })

                                        } else {
                                            eachText.eq(i).not('.frame').css({
                                                visibility: 'hidden'
                                            })

                                        }

                                    }

                                }

                            }

                            var eleActivo = animaciones.ele.children();

                            if (animaciones.bg === true) {

                                animaciones.ele.children().eq(contador).css({
                                    'display': 'none'
                                })
                                var ruta = eleActivo.eq(nF).attr('src');

                                //animaciones.ele.css({

                                elemento.css({
                                    'background': 'url(' + ruta + ')',
                                    'background-size': 'cover',
                                    'background-position': 'center center'
                                });



                            } else {

                                var eleActivo = animaciones.ele.children();

                                if (animaciones.optimization === true && navigator.userAgent.indexOf('Firefox') > -1) {
                                    animaciones.ele.children().not('.frames').css({
                                        'display': 'block',
                                        'position': 'absolute',
                                        'top': 0,
                                        'left': 0,
                                        'z-index': 0,

                                    })

                                    eleActivo.eq(nF).css({
                                        'display': 'block',
                                        'position': 'absolute',
                                        'top': 0,
                                        'left': 0,
                                        'z-index': 1
                                    });

                                } else {
                                    animaciones.ele.children().not('.frames').css({
                                        'display': 'none',
                                    })

                                    eleActivo.eq(nF).css({
                                        'display': 'block'
                                    });
                                }

                            }
                        }
                    }
                    scrollFunc();

                    $(window).scroll(function(event) {
                        scrollFunc();

                    });

                } else if (animaciones.scroll.status === false) {

                    animaciones.ele.removeClass('borde');
                    iniAnimation = setTimeout(function() {

                        if (animaciones.reverse === false) {

                            var eleActivo = animaciones.ele.children();

                            if (animaciones.bg === true) {

                                var ruta = eleActivo.eq(contador).attr('src');

                                animaciones.ele.css({
                                    'background': 'url(' + ruta + ')',
                                    'background-size': 'cover',
                                    'background-position': 'center center'
                                });


                            } else {

                                var ruta = eleActivo.eq(contador).attr('src');
                                animaciones.ele.css({
                                    'background': 'none',
                                });
                                if (animaciones.optimization === true && navigator.userAgent.indexOf('Firefox') > -1) {
                                    animaciones.ele.children().not('.frames').css({
                                        'display': 'block',
                                        'position': 'absolute',
                                        'top': 0,
                                        'left': 0,
                                        'z-index': 0,

                                    })

                                    eleActivo.eq(contador).css({
                                        'display': 'block',
                                        'position': 'absolute',
                                        'top': 0,
                                        'left': 0,
                                        'z-index': 1
                                    });

                                } else {
                                    animaciones.ele.children().css({
                                        'display': 'none',
                                    })

                                    eleActivo.eq(contador).css({
                                        'display': 'block'
                                    });
                                }
                            }
                            contador += 1;


                        } else if (animaciones.reverse === true) {

                            var eleActivo = animaciones.ele.children();

                            if (animaciones.bg === true) {

                                var ruta = eleActivo.eq(contador2).attr('src');

                                animaciones.ele.css({
                                    'background': 'url(' + ruta + ')',
                                    'background-size': 'cover',
                                    'background-position': 'center center'
                                });

                            } else {

                                var ruta = eleActivo.eq(contador).attr('src');
                                animaciones.ele.css({
                                    'background': 'none',

                                });
                                if (animaciones.optimization === false) {

                                    animaciones.ele.children().css({
                                        'display': 'none',
                                    })

                                    eleActivo.eq(contador2).css({
                                        'display': 'block'
                                    });

                                } else {

                                    animaciones.ele.children().not('.frames').css({
                                        'display': 'block',
                                        'position': 'absolute',
                                        'top': 0,
                                        'left': 0,
                                        'z-index': 0,

                                    })

                                    eleActivo.eq(contador2).css({
                                        'display': 'block',
                                        'position': 'absolute',
                                        'top': 0,
                                        'left': 0,
                                        'z-index': 1
                                    });
                                }
                            }
                            contador2 -= 1;
                            if (contador2 + 1 == contador) {
                                return;
                            }

                        }

                        //$('.frames').text(contador || contador2);
                        var eleActivo = animaciones.ele.children();

                        //$(eleActivo.find('.frames').selector).text(contador || contador2);
                        bucle() //actualiza los contadores

                    }, animaciones.velocidad);
                }
            }
            setTimeout(function() {

                bucle();

            }, this.delay);

        }

        this.animar()

    }

    function animacionSecuencia2(elemento, setup) {
        this.ele = elemento;
        this.bg = setup.background;

    }

    if (setup.drag === false) {

        //$(this).siblings('span').text('No Drag');

        elemento.siblings('.info-drag').removeClass('activo');

        var animaciones = new animacionSecuencia(elemento, setup);

    } else if (setup.drag === true) {

        var anchoVentana, indicadorSlider;

        var animaciones2 = new animacionSecuencia2(elemento, setup);
        animaciones2.ele.children('.slider-sequence').remove();

        var mostrarImagenInicio = function() {
            var eleActivo = animaciones2.ele.children();
            if (animaciones2.bg === true) {

                var ruta = eleActivo.eq(0).attr('src');
                animaciones2.ele.css({
                    'background': 'url(' + ruta + ')',
                    'background-size': 'cover',
                    'background-position': 'center center'
                });

            } else {
                var ruta = eleActivo.eq(0).attr('src');
                animaciones2.ele.css({
                    'background': 'none',

                });

                animaciones2.ele.children().css({
                    'display': 'none',
                })

                eleActivo.eq(0).css({
                    'display': 'block'
                });
            }
        }



        //Eventos
        var posCursorActualX, posCursorActualY, posCursorInicioX, posCursorInicioY;

        var mouseDown = function(event) {
            posCursorActualX = event.clientX;
            posCursorActualY = event.clientY;

            animaciones2.ele[0].style.transition = 'none';
            var contador = 0;
            var calc = 0;
            if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
                posCursorInicioX = event.touches[0].clientX;
                posCursorInicioY = event.touches[0].clientY;
                animaciones2.ele[0].addEventListener('touchmove', mouseMove, false);

            } else {
                posCursorInicioX = event.clientX;
                posCursorInicioY = event.clientY;

                document.addEventListener('mousemove', mouseMove, false);

            }

        }

        var mouseMove = function(event) {

            if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
                posCursorActualX = event.touches[0].clientX;
                posCursorActualY = event.touches[0].clientY;

                var anchoImagenes = animaciones2.ele.outerWidth();
                var numeroFrames = animaciones2.ele.children().length;
                var desplazamiento = posCursorActualX - animaciones2.ele.offset().left;
                var calc = Math.floor((desplazamiento * numeroFrames) / (anchoImagenes));
                var ultimoFrame = calc;
                var eleActivo = animaciones2.ele.children();

                //$('.frames').text(ultimoFrame);
                eleActivo.find('.frames').text(ultimoFrame);
                if (animaciones2.bg === true) {

                    var ruta = eleActivo.eq(ultimoFrame).attr('src');
                    animaciones2.ele.css({
                        'background': 'url(' + ruta + ')',
                        'background-size': 'cover',
                        'background-position': 'center center'
                    });

                } else {
                    var ruta = eleActivo.eq(ultimoFrame).attr('src');
                    animaciones2.ele.css({
                        'background': 'none',

                    });

                    animaciones2.ele.children().css({
                        'display': 'none',
                    })

                    eleActivo.eq(ultimoFrame).css({
                        'display': 'block'
                    });
                }


            } else {
                posCursorActualX = event.clientX;
                posCursorActualY = event.clientY;

                var posSlider = animaciones2.ele.offset();
                var anchoSlider = animaciones2.ele.width();

                var anchoIndicadorSlider = animaciones2.ele.find('.slider-indicator').width();


                if ((Number(posCursorActualX) >= posSlider.left + anchoIndicadorSlider / 2) && (Number(posCursorActualX) < (posSlider.left + anchoSlider - anchoIndicadorSlider / 2))) {

                    $(indicadorSlider.selector).css({
                        transform: 'translateX(' + (posCursorActualX - posSlider.left - anchoIndicadorSlider) + 'px)',

                    });
                }

                var anchoImagenes = animaciones2.ele.outerWidth();
                var numeroFrames = animaciones2.ele.children().length;
                var desplazamiento = posCursorActualX - anchoIndicadorSlider - animaciones2.ele.offset().left;
                var calc = Math.round((desplazamiento * numeroFrames) / (anchoImagenes));
                var ultimoFrame = calc;

                var eleActivo = animaciones2.ele.children();

                //$('.frames').text(ultimoFrame);
                eleActivo.find('.frames').text(ultimoFrame);
                if (animaciones2.bg === true) {

                    var ruta = eleActivo.eq(ultimoFrame).attr('src');
                    animaciones2.ele.css({
                        'background': 'url(' + ruta + ')',
                        'background-size': 'cover',
                        'background-position': 'center center'
                    });

                } else {
                    var ruta = eleActivo.eq(ultimoFrame).attr('src');
                    animaciones2.ele.css({
                        'background': 'none',

                    });


                    animaciones2.ele.children().css({
                        'display': 'none',
                    })

                    eleActivo.eq(ultimoFrame).css({
                        'display': 'block'
                    });
                }

            }

        }

        var mouseUp = function() {

            if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
                window.removeEventListener('touchmove', mouseMove, false);
            } else {
                document.removeEventListener('mousemove', mouseMove, false);

                indicadorSlider.context.removeEventListener('mousemove', mouseMove, false);

            }

        }
        animacionSecuencia2.prototype.inicio = function() {
            anchoVentana = $(window).width();

            if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
                //$('.info-drag').addClass('activo');
                mostrarImagenInicio();
                animaciones2.ele.siblings('.info-drag').addClass('activo');
                $(animaciones2.ele.siblings('.info-drag')).click(function() {
                    $(this).removeClass('activo');
                })
                animaciones2.ele[0].addEventListener('touchstart', mouseDown, false);
                animaciones2.ele[0].addEventListener('touchend', mouseUp, false);

            } else {

                mostrarImagenInicio();
                //$('.info-drag').removeClass('activo');
                animaciones2.ele.siblings('.info-drag').removeClass('activo');
                animaciones2.ele.append('<div class="slider-sequence"><div class="slider-sequence-container"><div class="slider-indicator"></div></div></div>');
                animaciones2.ele.children().find('.slider-indicator')[0].addEventListener('mousedown', mouseDown, false);
                indicadorSlider = animaciones2.ele.find('.slider-indicator');
                document.addEventListener('mouseup', mouseUp, false);

            }
        }
        animaciones2.inicio()

    }
}



//Tiempos de carga
$(document).ready(function() {
    console.log("Time until DOMready: ", Date.now() - timerStart);
});
$(window).load(function() {
    console.log("Time until everything loaded: ", Date.now() - timerStart);
    $('.loading').fadeOut();
});
