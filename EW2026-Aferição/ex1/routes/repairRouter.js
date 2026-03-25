var express = require('express');
var router = express.Router();
var repairController = require('../controllers/repairController');

// GET /repairs/matrículas: devolve a lista de matrículas sem repetições e ordenada alfabeticamente
router.get('/matrículas', repairController.getAllMatriculas);

// GET /repairs/interv: devolve a lista de intervenções (código, nome e descrição) sem repetições e ordenada por código
router.get('/interv', repairController.getAllInterv);

// GET /repairs/:id: devolve o registo com identificador id
router.get('/:id', repairController.getRepairById);

// GET /repairs: devolve lista de todos os registos (e trata queries ?ano=YYYY, ?marca=VRUM, ?matricula=XXX, ?interv=YYY)
router.get('/', repairController.getAllRepairs);

// POST /repairs: acrescenta um registo novo à BD
router.post('/', repairController.createRepair);

// DELETE /repairs/:id: elimina o registo com identificador id
router.delete('/:id', repairController.deleteRepair);

module.exports = router;
