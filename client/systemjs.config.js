/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  SystemJS.config({
  packages: {
    "ts": {
      "main": "plugin.js"
    },
    "typescript": {
      "main": "lib/typescript.js",
      "meta": {
        "lib/typescript.js": {
          "exports": "ts"
        }
      }
    }
  },
  map: {
      "ts":          'npm:plugin-typescript/lib',
      'typescript':  'npm:typescript/lib/typescript.js',
  },
  transpiler: 'ts'
  });
  System.config({
    typescriptOptions: {
    module: "system",
    noImplicitAny: true,
    tsconfig: true                  // also accepts a path
    },
    transpiler: "typescript",
    packages: {
      "app": {
        "defaultExtension": "ts",
      },
      "src": {
      "defaultExtension": "ts",
      "meta": {
        "*.ts": {
          "loader": "ts"
        }
      }
    }
    },
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',

      //ng-bootstrap
      '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',

      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      "ts":                        'npm:plugin-typescript/lib',
      'typescript':                'npm:typescript/lib/typescript.js',

      //ng2-maps Google maps
      'ng2-map': 'npm:ng2-map/dist/ng2-map.umd.js',

      'ng2-utils': 'npm:ng2-utils/dist/ng2-utils.umd.js',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.ts',
        defaultExtension: 'ts'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
         main: 'index.js', 
         defaultExtension: 'js' 
      },
      // 'ng2-map': { 
      //   main: 'dist/index.js', 
      //   defaultExtension: 'js' 
      // },
      // 'ng2-utils': { 
      //   main: './index.js', 
      //   defaultExtension: 'js' 
      // }
    },
  });
})(this);
