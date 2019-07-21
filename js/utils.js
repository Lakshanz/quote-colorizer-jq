// this function generate inverse color code 
// of a given hex code
function invertHex(hex) {
  hex = hex.substring(1);
  hex = parseInt(hex, 16);
  hex = 0xFFFFFF ^ hex;
  hex = hex.toString(16);
  hex = ("000000" + hex).slice(-6);
  hex = "#" + hex;
  return hex;
}