const app = Vue.createApp({
    data() {
        return {
            products: products_data,
            lock: false,
            current_modal: "",
            current_index: "",
            current_i: "",
            order: [],
        }
    },
    methods: {
        toggle_nav() {
            document.querySelectorAll(".line").forEach(item => {
                item.classList.toggle("active")
            });
            document.querySelector(".link_box").classList.toggle("active")
        },
        move(i, index) {
            if (this.lock) return
            this.lock = true
            const box = this.$refs.box[index];
            const itemWidth = this.getWidth(box.querySelectorAll("div")[0]);
            const style = window.getComputedStyle(box);
            const matrix = new WebKitCSSMatrix(style.transform);
            const currentX = matrix.m41;
            box.dataset.move++
            const length = this.products[index].products.length
            const window_w = window.innerWidth;
            let count = 3
            if (window_w <= 1280) count = 2
            if (window_w <= 640) count = 1
            if (box.dataset.move > length - count) {
                box.style.transform = `translateX(0px)`;
                box.dataset.move = 0
            } else {
                box.style.transform = `translateX(${Math.min(0, currentX + itemWidth * -1 * i)}px)`;
            }
            setTimeout(() => {
                this.lock = false
            }, 500);
        },
        getWidth(item) {
            const style = window.getComputedStyle(item);
            const marginLeft = parseFloat(style.marginLeft);
            const marginRight = parseFloat(style.marginRight);
            return item.getBoundingClientRect().width + marginLeft + marginRight;
        },
        open_product(index, i, e) {
            this.toggle_modal();
            this.current_index = index
            this.current_i = i
            this.current_modal = JSON.parse(JSON.stringify(this.products[index].products[i]));
        },
        toggle_modal() {
            if (this.lock) return
            this.lock = true
            this.$refs.p_modal.classList.toggle("active");
            setTimeout(() => {
                this.lock = false
            }, 300);
        },
        add_amount(n) {
            this.current_modal.amount = Math.max(0, this.current_modal.amount + n);
        },
        add_order() {
            this.products[this.current_index].products[this.current_i].amount = this.current_modal.amount
            this.toggle_modal();
            this.$refs.ok_box.classList.add('active')
            setTimeout(() => {
                this.$refs.ok_box.classList.remove('active')
            }, 1200);
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
