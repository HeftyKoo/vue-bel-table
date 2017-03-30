import BelTable from './src/bel-table'

const install = function (Vue) {
    if (install.installed) return;
    Vue.component(BelTable.name, BelTable)
}


if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};


export default {
    install,
}
