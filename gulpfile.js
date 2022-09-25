const {src, dest, watch, parallel} = require('gulp');

//src -> sirve para identificar un archivo
//dest -> para guardarlo en el disco duro
// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');//funcione en el navegador que se maneje
const cssnano = require('cssnano');//comprime el codigo css
const postcss = require('gulp-postcss');//hace transformacciones por medio de los de arriba
const sourcemaps = require('gulp-sourcemaps');//encontrar linea de codigo despues de ejecturar nano

// Imagenes
const cache = require("gulp-cache");
const imagemin = require('gulp-imagemin');//para que la imagenes sean mas livianas
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Javascript
const terser = require('gulp-terser-js');

//gulpfile tambien se le conoce como wordflow

function css(done) {
      
    //esta parte lo mantien src('src/scss/app.scss') en memoria
    // pipe(sass()); -> lo compila y finaliza
    //pipe(dest("build/css")) -> los guarda en el disco duro
    // src('src/scss/app.scss') // Identificar el archivo SASS - con esta linea de código 
    //siempre habia que guardar en el archivo app.scss
    src('src/scss/**/*.scss') //-> los guarda en el disco duro agregando esto se actualiza 
    //automaticamente
        .pipe(sourcemaps.init())
        .pipe( plumber()) //para que no se detenga nuestro codigo cuando hay un error
        .pipe(sass()) // Compilarlo
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css')); // Almacenarla en el disco duro
    
    done(); //Callback que avisa a gulp cuando llegamos al final
}

//Función para aligerar o que sea muy livianas la imagenes
function imagenes(done) {

    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )

    done();
}

function versionWebp( done ) {

    const opciones = {
        quiality: 50
    };
    
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )

    done();
}

function versionAvif( done ) {

    const opciones = {
        quiality: 50
    };
    
    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )

    done();
}

function javascript(done) {
    src('src/js/**/*.js') 
        .pipe(sourcemaps.init()) 
        .pipe( terser() )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
        
}

//con esta funcion se actualiza la pagina
function dev(done) {
    watch('src/scss/**/*.scss', css);    
    watch('src/js/**/*.js', javascript);    
    
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel ( imagenes, versionWebp, versionAvif, 
    javascript, dev );
