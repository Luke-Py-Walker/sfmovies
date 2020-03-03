'use strict';
const TABLE = 'movies';
const NEW_COLUMN = 'name';
const OLD_COLUMN = 'title';

exports.up = async (Knex) => {
  await Knex.schema.table(TABLE, (table) => {
    table.text(NEW_COLUMN);
  });
  await Knex.raw(`ALTER TABLE ${TABLE} ALTER COLUMN ${OLD_COLUMN} DROP NOT NULL`);
};

exports.down = async (Knex) => {
  await Knex.schema.table(TABLE, (table) => {
    table.dropColumn(NEW_COLUMN);
  });
  await Knex.raw(`ALTER TABLE ${TABLE} ALTER COLUMN ${OLD_COLUMN} SET NOT NULL`);
};
