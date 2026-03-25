const Repair = require('../models/Repair');

const repairController = {

    // CRIAR REPARAÇÃO
    createRepair: async (req, res) => {
        try {
            const newRepair = new Repair(req.body);
            await newRepair.save();
            res.status(201).json(newRepair);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // LISTAR TODAS AS REPARAÇÕES (com filtros opcionais: ?ano=YYYY ou ?marca=VRUM)
    getAllRepairs: async (req, res) => {
        try {
            const query = {};
            
            // Filtro por ano
            if (req.query.ano) {
                query['data'] = { $regex: '^' + req.query.ano };
            }
            
            // Filtro por marca
            if (req.query.marca) {
                query['viatura.marca'] = req.query.marca;
            }
            
            const repairs = await Repair.find(query);
            res.status(200).json(repairs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // CONSULTAR REPARAÇÃO POR ID
    getRepairById: async (req, res) => {
        try {
            const repair = await Repair.findById(req.params.id);
            if (!repair) {
                return res.status(404).json({ message: 'Reparação não encontrada' });
            }
            res.status(200).json(repair);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // LISTAR TODAS AS MATRÍCULAS (sem repetição)
    getAllMatriculas: async (req, res) => {
        try {
            const repairs = await Repair.find();
            const matriculas = [...new Set(repairs.map(r => r.viatura.matricula))].sort();
            res.status(200).json(matriculas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // LISTAR TODAS AS INTERVENÇÕES (sem repetição)
    getAllInterv: async (req, res) => {
        try {
            const repairs = await Repair.find();
            const intervencoes = [];
            
            repairs.forEach(r => {
                r.intervencoes.forEach(i => {
                    if (!intervencoes.some(x => x.codigo === i.codigo)) {
                        intervencoes.push({
                            codigo: i.codigo,
                            nome: i.nome,
                            descricao: i.descricao
                        });
                    }
                });
            });
            
            intervencoes.sort((a, b) => a.codigo.localeCompare(b.codigo));
            res.status(200).json(intervencoes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // DELETAR REPARAÇÃO
    deleteRepair: async (req, res) => {
        try {
            const deletedRepair = await Repair.findByIdAndDelete(req.params.id);
            if (!deletedRepair) {
                return res.status(404).json({ message: 'Reparação não encontrada' });
            }
            res.status(200).json({ message: 'Reparação deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

};

module.exports = repairController;