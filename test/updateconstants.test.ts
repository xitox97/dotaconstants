import assert from "node:assert/strict";
import test from "node:test";

import { resolveSpecialBonusPlaceholders } from "../tasks/util.ts";

test("resolves a talent placeholder after its linked ability is processed", () => {
  const abilities = {
    special_bonus_unique_axe_culling_blade_speed_duration: {
      dname: "+{s:bonus_speed_duration}s Culling Blade Kill Buff Bonus Duration",
    },
  };
  const lookup = {
    special_bonus_unique_axe_culling_blade_speed_duration: {
      bonus_speed_duration: "3",
      value: "3",
    },
  };

  resolveSpecialBonusPlaceholders(abilities, lookup);

  assert.equal(
    abilities.special_bonus_unique_axe_culling_blade_speed_duration.dname,
    "+3s Culling Blade Kill Buff Bonus Duration",
  );
});

test("keeps a placeholder when the current source data has no value for it", () => {
  const abilities = {
    special_bonus_unique_juggernaut_2: {
      dname: "+{s:bonus_healing_ward_bonus_health} Healing Ward Hits to Kill",
    },
  };

  resolveSpecialBonusPlaceholders(abilities, {});

  assert.equal(
    abilities.special_bonus_unique_juggernaut_2.dname,
    "+{s:bonus_healing_ward_bonus_health} Healing Ward Hits to Kill",
  );
});
