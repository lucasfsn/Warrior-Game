import { Router } from 'express';
import { WarriorRecord } from '../records/warrior.record';
import { ValidationError } from '../utils/error';

export const warriorRouter = Router();

warriorRouter
  .get('/add-form', (req, res) => {
    res.render('warrior/add-form');
  })
  .post('/', async (req, res) => {
    const { name, agility, power, defence, stamina } = req.body;

    if (await WarriorRecord.isNameTaken(req.body.name)) {
      throw new ValidationError(`Name: ${name} is already taken`);
    }

    const warrior = new WarriorRecord({
      ...req.body,
      power: Number(power),
      agility: Number(agility),
      defence: Number(defence),
      stamina: Number(stamina),
    });

    const id = await warrior.insert();

    res.render('warrior/added', {
      id,
      name: warrior.name,
    });
  });
