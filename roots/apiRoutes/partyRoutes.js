const express =require('express');
const router = express.Router();
const db = require('../../db/database');

//Get all parties
router.get('/api/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
    const params = [];
    db.all(sql, params, (err, rows) => {
        if(err) {
            res.status(500).json({error: err.message});
            return;
        }

        res.json({
            message: 'success',
            data: rows
        });
    });
});

//get a single party
router.get('/api/party/:id', (req,res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({error: err.message});
            return;
        }

        res.json({
            message: 'success',
            data: row
        });
    });
});

//delete a party 
router.delete('/api/party/:id', (req,res) => {
    const sql = `DELTE FROM parties WHERE id=?`;
    const params = [req.params.id];
    db.run(sql, params, function(err,results) {
        if(err) {
            res.status(400).json({error:err.message});
            return;
        }
        res.json({
            message:'successfuly deleted',
            changes: this.changes
        });
    });
});

module.exports = router;