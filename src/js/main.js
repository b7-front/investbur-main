function Ascroll() {
    if ($(window).width() < 768) {
        $.fn.fullpage.setResponsive(true)
    } else {
        $.fn.fullpage.setResponsive(false)
    }
}

$(document).ready(function () {
    $('#fullpage').fullpage({
        sectionSelector: '.fullsection',
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
            const scale = Math.max(0.4, (sin + 1) / 2)

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
                    default:
                        console.log('готово')
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
