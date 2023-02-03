import { WarriorRecord } from '../records/warrior.record';

export const fight = (
  warrior1: WarriorRecord,
  warrior2: WarriorRecord
): {
  log: string[];
  winner: WarriorRecord;
} => {
  const log: string[] = [];

  const warrior1Obj = {
    hp: warrior1.stamina * 10,
    dp: warrior1.defence,
    warrior: warrior1,
  };

  const warrior2Obj = {
    hp: warrior1.stamina * 10,
    dp: warrior1.defence,
    warrior: warrior2,
  };

  let attacker = warrior1Obj;
  let defender = warrior2Obj;

  do {
    const attackStrength = attacker.warrior.power;

    log.push(
      `${attacker.warrior.name} attack ${defender.warrior.name} with strength of ${attackStrength}`
    );

    if (defender.dp + defender.warrior.agility > attackStrength) {
      log.push(
        `${defender.warrior.name} defended ${attacker.warrior.name} attack`
      );
      defender.hp -= attackStrength;

      if (defender.dp < 0) {
        log.push(
          `${attacker.warrior.name} destroyed ${
            defender.warrior.name
          } shield (${-defender.dp})`
        );
        defender.hp += defender.dp;
      }
    } else {
      log.push(
        `${attacker.warrior.name} taken ${attackStrength} hp from ${defender.warrior.name}`
      );
      defender.hp -= attackStrength;
    }

    [attacker, defender] = [defender, attacker];
  } while (warrior1Obj.hp > 0 && warrior2Obj.hp > 0);

  const winner = defender.warrior;
  log.push(`${winner.name} has won!`);

  return {
    log,
    winner,
  };
};
