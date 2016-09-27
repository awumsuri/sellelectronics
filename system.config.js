/**
 * Created by Mtui on 9/26/16.
 */
var map = {
    'app':                                'app',
    'rxjs':                               'vendor/rxjs',
    'zonejs':                             'vendor/zone.js',
    'reflect-metadata':                   'vendor/reflect-metadata',
    '@angular':                           'vendor/@angular',
    "ng2-responsive":                     'vendor/ng2-responsive',
    'angular2-resizable':                 'vendor/angular2-resizable'
};

var packages = {
    'app':                                { main: 'main', defaultExtension: 'js' },
    'rxjs':                               { defaultExtension: 'js' },
    'zonejs':                             { main: 'zone', defaultExtension: 'js' },
    'reflect-metadata':                   { main: 'Reflect', defaultExtension: 'js' },
    'ng2-responsive':                     { main: 'angular2-responsive', defaultExtension: 'js'},
    'angular2-resizable':                  {main:  'angular2-resizable', defaultExtension: 'js'}
};

var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade',
    "angular2-resizable",
    "ng2-responsive"
];

packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
});

System.config({
    map: map,
    packages: packages
});
