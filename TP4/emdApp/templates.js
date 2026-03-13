const pug = require('pug');

// Helper para compilar e renderizar
function renderPug(fileName, data) {
    return pug.renderFile(`./views/${fileName}.pug`, data);
}

exports.examesListPage = (elist, d) => renderPug('index', { list: elist, date: d });
exports.examePage = (e, d) => renderPug('exame', { exame: e, date: d });
exports.exameFormPage = (d) => renderPug('form', { date: d });
exports.exameFormEditPage = (d, e) => renderPug('form', { date: d, exame: e });
exports.examesStatsPage = (stats, d) => renderPug('stats', { stats: stats, date: d });
exports.errorPage = (msg, d) => renderPug('error', { message: msg, date: d });
