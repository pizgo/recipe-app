// Initialize carousel using "siema" library
const mySiema = new Siema({
  draggable: false
});
document.querySelector(".prev").addEventListener("click", () => mySiema.prev());
document.querySelector(".next").addEventListener("click", () => mySiema.next());
