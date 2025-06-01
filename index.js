const app = Vue.createApp({
    data() {
        return {
            products: products_data,
            translate: 0,
        }
    },
    methods: {
        toggle_nav() {
            document.querySelectorAll(".line").forEach(item => {
                item.classList.toggle("active")
            });
            document.querySelector(".link_box").classList.toggle("active")
        },
        open_product(index, i, e) {
            e.target.style.minWidth = `100%`
        },
        move(i, index) {
            const box = this.$refs.box[index];
            // currentX = parseInt(box.dataset.move)
            // currentX = Math.max(0, currentX + i)
            // if (currentX < this.products[index].products.length / 3) {
            //     box.style.transform = `translateX(${-100 * currentX}%)`;
            // } else {
            //     box.style.transform = `translateX(0)`;
            //     currentX = 0
            // }
            // box.dataset.move = currentX

            // console.log(box.style.transform);
            const itemWidth = this.getWidth(box.querySelectorAll("div")[0]);
            const style = window.getComputedStyle(box);
            const matrix = new WebKitCSSMatrix(style.transform);
            const currentX = matrix.m41;
            // console.log(newX);
            box.style.transform = `translateX(${currentX + itemWidth * -1 * i}px)`;

        },
        getWidth(item) {
            const style = window.getComputedStyle(item);
            const marginLeft = parseFloat(style.marginLeft);
            const marginRight = parseFloat(style.marginRight);
            return item.getBoundingClientRect().width + marginLeft + marginRight;
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
