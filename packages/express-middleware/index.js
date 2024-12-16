const express = require('express')

const contactController = require('./controller/contactcontroller');
const expressJwt = require('express-jwt');

const router = express.Router();
const authenticate = expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.use(authenticate);

router.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  } else {
    next(err);
  }
});
  

router.get('/', async (req, res) => {
  await contactController.getAllContacts(req, res);
    });


router.get(`/:uuid`, async (req, res) => {
    await contactController.getOneContact(res, req.params.uuid);
});


router.post('/', async (req, res) => {
  await contactController.createContact(res,req);
});

router.put(`/:contactuuid`, async (req, res) => {
  await contactController.updateContact(res, req);
});

router.delete(`/:contactuuid`, async (req, res) => {
  await contactController.deleteContact(res, req.params.contactuuid);
});

module.exports = router