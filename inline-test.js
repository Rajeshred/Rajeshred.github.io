// This is because of https://github.com/vuejs/vue/issues/5677
const els = document.querySelectorAll('.gallery-item');
for (i = 0; i < els.length; ++i) {
  els[i].classList.remove('current');  
}

Vue.component('gallery', {
  data() {
    return {
      items: [],
      displayImage:
        {
          image: '',
          caption: '',
          isCurrent: true,
          grayscale: false,
        }
    }
  },
  methods: {
    toggleGrayscale() {
      this.displayImage.grayscale = !this.displayImage.grayscale;
    },
    loadDisplayImage(item, removeClasses = true){
      this.displayImage = {
        image: item.src,
        caption: item.caption,
        grayscale: false,
      };
      this.$refs.img.src = item.image;

      if (!removeClasses) {
        return;
      }

      this.items.forEach((imItem) => {
        imItem.isCurrent = false;
      });
      item.isCurrent = true;
    },
    addItem(item) {
      this.items.push(item);
    },
    countItems() {
      return this.items.length;
    }
  },

});

Vue.component('gallery-item', {
  props: ['loadDisplayImage'],
  data() {
    return {
      item: {
        image: '',
        caption: '',
        isCurrent: true
      }
    };
  },
    methods: {
      showFullSize(item) {
        this.$parent.loadDisplayImage(item);
      },
  },
  mounted() {
        
      this.item.image = this.$refs.img.src;
      this.item.caption = this.$refs.caption.innerText;
      this.item.isCurrent = this.$parent.countItems() === 0;
      this.$parent.addItem(this.item);

      if (this.item.isCurrent) {
        this.showFullSize(this.item);
      }
  }
});

var vm = new Vue({
  el: '#app'
});
