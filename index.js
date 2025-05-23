const app = Vue.createApp({
    data() {
        return {
            products: products_data
        }
    },
    methods: {
        toggle_nav() {
            document.querySelectorAll(".line").forEach(item => {
                item.classList.toggle("active")
            });
            document.querySelector(".link_box").classList.toggle("active")
        },
        open_product(index, i) {
            console.log(index, i);

        }
    }
}).mount(".app");

window.addEventListener('scroll', (e) => {
    let scroll_h = window.pageYOffset
    let nav = document.querySelector("nav");
    if (scroll_h > 0) {
        nav.style.top = '20px'
        nav.classList.add("active")
    } else {
        nav.style.top = '0px'
        nav.classList.remove("active")
    }

})
