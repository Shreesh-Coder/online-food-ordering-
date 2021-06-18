var textWrapper = document.querySelector('.chan');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='change'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.chan .change',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70*i
  }).add({
    targets: '.chan',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

var textWrapper1 = document.querySelector('.chan1');
textWrapper1.innerHTML = textWrapper1.textContent.replace(/\S/g, "<span class='change1'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.chan1 .change1',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70*i
  }).add({
    targets: '.chan1',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });