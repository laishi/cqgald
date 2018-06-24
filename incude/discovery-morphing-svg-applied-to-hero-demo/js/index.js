var svg = document.getElementById("curves");
var s = Snap(svg);
var baseCurve = Snap.select('.curve-base');
var inverseCurve = Snap.select('.curve-inverse');
var baseCurvePoints = baseCurve.node.getAttribute('d');
var inverseCurvePoints = inverseCurve.node.getAttribute('d');

var toInverseCurve = function(){
  baseCurve.animate({ d: baseCurvePoints }, 3000, mina.linear, toBaseCurve);
}
var toBaseCurve = function(){
  baseCurve.animate({ d: inverseCurvePoints }, 3000, mina.linear, toInverseCurve);
}
toBaseCurve();