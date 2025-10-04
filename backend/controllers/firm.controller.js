const Firm = require('../Models/Firm')
const Vendor = require('../Models/Vendor')

const addFirm = async (req, res) => {
  try {
    console.log('hello add firm');

    const { firmName, area, category, region, offer } = req.body;

    
    const vendor = await Vendor.findById(req.vendorId);

    if (!vendor) {
      return res.status(404).json({ message: "vendor not found" });
    }

    const firm = new Firm({ firmName, area, category, region, offer,vendor:vendor._id });
    
    await firm.save();
   

     vendor.firm.push(firm)
     await vendor.save()

    return res.status(200).json({ message: "firm added successfully", firm });
  } catch (err) {
    console.error("Error adding firm:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteFirm = async (req, res) => {
  const firmId = req.params.firmId;
  try {
    const deletedFirm = await Firm.findByIdAndDelete(firmId);
    if (!deletedFirm) {
      return res.status(404).json({ message: "firm not found" });
    }   
    res.status(200).json({ message: "firm deleted successfully", firm: deletedFirm });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


module.exports = {addFirm,deleteFirm}