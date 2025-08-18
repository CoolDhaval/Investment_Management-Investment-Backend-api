const db = require('../config/db');

exports.insertOrUpdateScheme = (
  SchemeCode,
  SchemeName,
  Remarks,
  InterestType,
  InterestPercent
) => {
  return db.execute(
    'CALL sp_InsertOrUpdate_SchemeMaster(?, ?, ?, ?, ?)',
    [SchemeCode, SchemeName, Remarks, InterestType, InterestPercent]
  );
};
