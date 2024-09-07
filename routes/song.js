import express from 'express';

const router = express.Router();

router.post('/create', (req, res) => {
    console.log(req.body);
    res.send("Created");
});

export default router;
