function areaRectangulo() {
        base = Number(prompt("Ingrese base del rectangulo"));
        altura = Number(prompt("IIngrese altura del rectangulo"));
        area = base*altura;
        perimetro = (base + altura)*2;

        alert("Area del rectangulo\n" + "Area :" + area +" m2\n" + "Perimetro: "+ perimetro +" m");
}
function resta(x,y) {
    rest = x-y;
    document.write("<h2>Resta de " + x +" - "+y+ " = " +rest+"</h2>");
}
function suma(a,b) {
    suma = a + b;
    document.getElementById("sumar").innerHTML = "suma de " +a + "+" + b + "= "+ suma;

}
function escribir() {
    valor = document.getElementById("entrada").value;
    document.getElementById("contenido").innerHTML = "> " + valor;
}