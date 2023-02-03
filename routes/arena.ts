import { Router } from 'express';
import { WarriorRecord } from '../records/warrior.record';
import { ValidationError } from '../utils/error';
import { fight } from '../utils/fight';

export const arenaRouter = Router();

arenaRouter
  .get('/fight-form', async (req, res) => {
    const warriors = await WarriorRecord.listAll();
    res.render('arena/fight-form', { warriors });
  })
  .post('/fight', async (req, res) => {
    const { warrior1: warrior1Id, warrior2: warrior2Id } = req.body;

    if (warrior1Id === warrior2Id) {
      throw new ValidationError('Warriors must be different');
    }

    const warrior1 = await WarriorRecord.getOne(warrior1Id);
    const warrior2 = await WarriorRecord.getOne(warrior2Id);

    if (!warrior1) {
      throw new ValidationError('Could not find warrior 1');
    }

    if (!warrior2) {
      throw new ValidationError('Could not find warrior 2');
    }

    const { log, winner } = fight(warrior1, warrior2);

    winner.wins++;
    await winner.update();

    res.render('arena/fight', { log });
  });
