const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mfe1',

  exposes: {
    './Component': './projects/mfe1/src/app/app.component.ts',    
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    // "@angular/core": { singleton: true, strictVersion: true }, 
    // "@angular/common": { singleton: true, strictVersion: true },
    // "@angular/common/http": { singleton: true, strictVersion: true }, 
    // "@angular/router": { singleton: true, strictVersion: true },
    // "@angular/forms": { singleton: true, strictVersion: true },
    // "mfe-library": { singleton: true, strictVersion: true },
  },

});