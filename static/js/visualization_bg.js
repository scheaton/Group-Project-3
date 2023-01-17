let granimInstance = new Granim({
  element: '#canvas-image-blending',
  direction: 'top-bottom',
  isPausedWhenNotInView: true,
  image: {
    source: "/Group-Project-3/static/img/bg-forest-fullscreen.jpg",
    blendingMode: 'multiply',
    stretchMode: ['stretch', 'stretch'],
  },
  states: {
    "default-state": {
      gradients: [
        ['#29323c', '#485563'],
        ['#FF6B6B', '#556270'],
        ['#80d3fe', '#7ea0c4'],
        ['#f0ab51', '#eceba3']
      ],
      transitionSpeed: 9000
    }
  }
});