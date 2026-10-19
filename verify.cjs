const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=__dirname+'/dist/';
const app={innerHTML:'',querySelector:()=>null,querySelectorAll:()=>[],focus:()=>{}};
const context={document:{querySelector:()=>app},location:{hash:'#inicio'},localStorage:{getItem:()=>null},window:{scrollTo:()=>{}},addEventListener:()=>{},fetch:async()=>({ok:true,text:async()=>fs.readFileSync(root+'manual.txt','utf8')})};
vm.createContext(context);vm.runInContext(fs.readFileSync(root+'app.js','utf8'),context);
setImmediate(()=>{assert(app.innerHTML.includes('Construa sua Horta'));for(let i=1;i<=12;i++){context.location.hash='#etapa-'+i;vm.runInContext('render()',context);assert(app.innerHTML.includes(`ETAPA ${String(i).padStart(2,'0')} DE 12`));assert(app.innerHTML.includes(i===12?'Finalizar':'Próxima etapa'));assert(!app.innerHTML.includes('undefined'));}assert.equal(vm.runInContext('sections.length',context),11);assert.equal(vm.runInContext('checkItems.length',context),11);context.location.hash='#concluido';vm.runInContext('render()',context);assert(app.innerHTML.includes('Parabéns!'));console.log('OK: início, 12 etapas, conteúdo do manual, 11 itens de checklist e conclusão.');});
