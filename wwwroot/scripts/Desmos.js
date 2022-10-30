function GraphingCalculator() {
    var elt1 = document.getElementById('calculator1');
    var calculator1 = Desmos.GraphingCalculator(elt1);
    const graphUrl1 = 'https://www.desmos.com/calculator/8i4zweupke';
    $.getJSON(graphUrl1)
        .done(data => calculator1.setState(data.state));

    var elt2 = document.getElementById('calculator2');
    var calculator2 = Desmos.GraphingCalculator(elt2);
    const graphUrl2 = 'https://www.desmos.com/calculator/nqxnft0atp';
    $.getJSON(graphUrl2)
        .done(data => calculator2.setState(data.state));

    //P =3.536
}
