data.get = ( size, level ) => {
    let labyrinthe = data[size][level];
     labyrinthe.getNeighbor = getNeighbor;
}

let labyrinthe = data.get( 3, "ex-0" );


data.display = (size) => {
    console.log( data[size] );
}



function getNeighbor ( x, y ) {
    return x+y;
}
