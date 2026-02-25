const builtins = require('module').builtinModules;
console.log('Is electron in builtins?', builtins.includes('electron'));
console.log('All builtins:', builtins);
