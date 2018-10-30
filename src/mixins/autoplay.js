const autoplay = {
  props: {
    /**
     * Flag to enable autoplay
     */
    autoplay: {
      type: Boolean,
      default: false
    },
    /**
     * Time elapsed before advancing slide
     */
    autoplayTimeout: {
      type: Number,
      default: 2000
    },
    /**
     * Flag to pause autoplay on hover
     */
    autoplayHoverPause: {
      type: Boolean,
      default: true
    },
    /**
     * Flag to begin autoplay on hover. autoplayHoverPause must be set to false.
     */
    autoplayHoverPlay: {
      type: Boolean,
      default: false
    },
    /**
     * Autoplay direction. User can insert backward to make autoplay move from right to left
     */
    autoplayDirection: {
      type: String,
      default: "forward"
    }
  },
  data() {
    return {
      autoplayInterval: null
    };
  },
  destroyed() {
    if (!this.$isServer) {
      this.$el.removeEventListener("mouseenter", this.pauseAutoplay);
      this.$el.removeEventListener("mouseleave", this.startAutoplay);
      this.$el.removeEventListener("mouseenter", this.startAutoplay);
      this.$el.removeEventListener("mouseleave", this.pauseAutoplay);
    }
  },
  methods: {
    pauseAutoplay() {
      console.log("pause");
      if (this.autoplayInterval) {
        this.autoplayInterval = clearInterval(this.autoplayInterval);
      }
    },
    startAutoplay() {
      console.log("start");
      if (this.autoplay) {
        this.autoplayInterval = setInterval(
          this.autoplayAdvancePage,
          this.autoplayTimeout
        );
      }
    },
    restartAutoplay() {
      console.log("restart");
      this.pauseAutoplay();
      this.startAutoplay();
    },
    autoplayAdvancePage() {
      this.advancePage(this.autoplayDirection);
    }
  },
  mounted() {
    if (!this.$isServer && this.autoplayHoverPause) {
      this.$el.addEventListener("mouseenter", this.pauseAutoplay);
      this.$el.addEventListener("mouseleave", this.startAutoplay);
    } else if (!this.$isServer && this.autoplayHoverPlay) {
      this.$el.addEventListener("mouseenter", this.startAutoplay);
      this.$el.addEventListener("mouseleave", this.pauseAutoplay);
    }

    this.startAutoplay();
  }
};

export default autoplay;
