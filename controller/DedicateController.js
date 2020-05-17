const Dedicate = require('../model/Dedicate');
const Notification = require('../model/Notification');

exports.dedicate = async (dedicateData, req) => {
  dedicateData.sender = req.userId;
  const dedicate = await Dedicate.create(dedicateData);
  await Notification.create({
    sender: req.userId,
    receiver: dedicateData.receiver,
    type: 'dedicate',
    dedicateId: dedicate._id
  });
  return {
    ...dedicate._doc,
    _id: dedicate._id.toString(),
    createdAt: dedicate.createdAt.toISOString(),
    updatedAt: dedicate.updatedAt.toISOString(),
  };
}
