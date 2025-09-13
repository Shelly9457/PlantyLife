const app = Vue.createApp({
    data() {
        return {
            products: products_data,
            lock: false,
            current_modal: "",
            current_index: "",
            current_i: "",
            order: []
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
            this.toggle_modal('p_modal');
            this.current_index = index
            this.current_i = i
            this.current_modal = JSON.parse(JSON.stringify(this.products[index].products[i]));
        },
        toggle_modal(refName) {
            if (this.lock) return
            this.lock = true
            this.$refs[refName].classList.toggle("active");
            setTimeout(() => {
                this.lock = false
            }, 300);
        },
        add_amount(n) {
            this.current_modal.amount = Math.max(0, this.current_modal.amount + n);
        },
        add_order_amount(n, item) {
            item.amount = Math.max(1, item.amount + n);
        },
        add_order(product) {
            console.log(this.current_modal);
            
            this.products[this.current_index].products[this.current_i].amount = product.amount
            const exist = this.order.find(item => item.id === product.id);
            if (exist) {
                exist.amount = product.amount
                if (exist.amount <= 0) {
                    this.order = this.order.filter(item => item.id !== product.id);
                }
            } else {
                this.order.push(product)
            }
            this.toggle_modal('p_modal');
            this.$refs.ok_box.classList.add('active')
            setTimeout(() => {
                this.$refs.ok_box.classList.remove('active')
            }, 2000);
        },
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
