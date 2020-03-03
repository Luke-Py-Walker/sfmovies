'use strict';

const COLUMN  = 'title';
const TABLE   = 'movies';

exports.up = (Knex) => {
  return Knex.schema.table(TABLE, (table) => {
    table.dropColumn(COLUMN);
  })
  .then(() => {
    return Knex.raw(`ALTER TABLE ${TABLE} ADD CONSTRAINT movies_name_not_null CHECK (name IS NOT NULL) NOT VALID`)
    .then(() => {
      return Knex.raw(`ALTER TABLE ${TABLE} VALIDATE CONSTRAINT movies_name_not_null`);
    });
  });
};

exports.down = (Knex) => {
  return Knex.schema.table(TABLE, (table) => {
    table.text(COLUMN);
  })
  .then(() => {
    return Knex.raw(`ALTER TABLE ${TABLE} DROP CONSTRAINT movies_name_not_null`);
  });
};
