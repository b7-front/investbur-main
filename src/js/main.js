window.onpopstate = function (event) {
    if (event && event.state) {
        location.reload()
    }
}

function Ascroll() {
    if ($(window).width() < 768) {
        $.fn.fullpage.setResponsive(true)

        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 1) {
            let lastP = $(window).scrollTop()

            let clicked = false

            var handlerTouchMove = function (e) {
                setTimeout(() => {
                    if ($(window).scrollTop() == lastP && !clicked) {
                        $('#to-main-2')[0].click()
                        clicked = true
                    }
                }, 100)
            }

            $('body').bind('touchend', function (e) {
                $('body').bind('touchmove', handlerTouchMove)
            })
        } else {
            $('body').unbind('touchmove', handlerTouchMove)
        }
    } else {
        $.fn.fullpage.setResponsive(false)
    }
}

$(document).ready(function () {
    $('#fullpage').fullpage({
        sectionSelector: '.fullsection',
        loopBottom: true,
        onLeave: function (origin, destination) {
            if (destination == 1) {
                document.getElementsByTagName('video')[0].play()
            }

            if (origin == 3 && destination == 1) {
                // клик по ссылке
                $('#to-main-2')[0].click()
            }
        },
    })
    Ascroll()
})

$(window).scroll(function () {
    Ascroll()
})

$(window).resize(function () {
    Ascroll()
})

class Slider {
    constructor(node) {
        this.node = node
        this.list = null
        this._counter = 0
        this.sides = 0
        this.step = 0
        this.shift = 0

        this.findParts()
        this.prepare()
        this.listen()
    }

    findParts() {
        this.list = this.node.querySelector('[data-slider-list]')
        this.items = [...this.list.children]
    }

    prepare() {
        this.sides = this.items.length
        this.step = (2 * Math.PI) / this.sides
        this.shift = Math.PI / 2
        this.counter = 0
    }

    listen() {
        setInterval(() => {
            this.counter = this.counter + 1
        }, 3000)
    }

    notify() {
        this.items.forEach((item, i) => {
            const pos = (i + this.counter) * this.step + this.shift
            const cos = Math.cos(pos)
            const sin = Math.sin(pos)
            const scale = Math.max(0.3, (sin + 1) / 2)

            if (sin == 1 && !item.classList.contains('done')) {
                console.log()
                item.classList.add('done')

                switch (item.dataset.name) {
                    case 'vrp':
                        $('.timer-vrp').countTo({
                            from: 0,
                            to: 5.2,
                            speed: 2000,
                            refreshInterval: 50,
                            formatter: function (value, options) {
                                return value.toFixed(1)
                            },
                        })
                        break
                    case 'obm':
                        $('.timer-obm').countTo({
                            from: 0,
                            to: 71.2,
                            speed: 2000,
                            refreshInterval: 50,
                            formatter: function (value, options) {
                                return value.toFixed(1)
                            },
                        })

                        break
                    case 'vrpnow':
                        $('.timer-vrpnow').countTo({
                            from: 0,
                            to: 294.1,
                            speed: 2000,
                            refreshInterval: 50,
                            formatter: function (value, options) {
                                return value.toFixed(1)
                            },
                        })
                        break
                    case 'subject':
                        $('.timer-subject').countTo({
                            from: 0,
                            to: 28600,
                            speed: 2000,
                            refreshInterval: 50,
                        })
                        break
                    case 'precish':
                        $('.timer-precish').countTo({
                            from: 0,
                            to: 50,
                            speed: 2000,
                            refreshInterval: 50,
                        })
                        break
                    case 'burtoday6':
                        $('.timer-burtoday6').countTo({
                            from: 0,
                            to: 50,
                            speed: 2000,
                            refreshInterval: 50,
                        })
                        break
                    case 'burtoday7':
                        $('.timer-burtoday7').countTo({
                            from: 0,
                            to: 50,
                            speed: 2000,
                            refreshInterval: 50,
                        })
                        break
                    case 'burtoday8':
                        $('.timer-burtoday8').countTo({
                            from: 0,
                            to: 50,
                            speed: 2000,
                            refreshInterval: 50,
                        })
                        break
                    default:
                }
            }

            item.style.setProperty('--cos', cos)
            item.style.setProperty('--sin', sin)
            item.style.setProperty('--scale', scale)
        })
    }

    get counter() {
        return this._counter
    }

    set counter(new_value) {
        this._counter = new_value < 0 ? this.sides + new_value : new_value % this.sides
        this.notify()
    }
}

const slider = new Slider(document.querySelector('.slider3d'))

$(function () {
    $('#progress-loading').width(50 + Math.random() * 30 + '%')
    $(window).on('load', function () {
        $('#progress-loading').width('101%').delay(300).fadeOut(400)
    })
})
