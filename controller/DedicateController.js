const Dedicate = require('../model/Dedicate');

exports.dedicate = async (dedicateData, req) => {
  dedicateData.sender = req.userId;
  const dedicate = await Dedicate.create(dedicateData);
  console.log({
    ...dedicate._doc,
    _id: dedicate._id.toString(),
    createdAt: dedicate.createdAt.toISOString(),
    updatedAt: dedicate.updatedAt.toISOString(),
  });
  return {
    ...dedicate._doc,
    _id: dedicate._id.toString(),
    createdAt: dedicate.createdAt.toISOString(),
    updatedAt: dedicate.updatedAt.toISOString(),
  };
}
