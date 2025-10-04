const Firm = require('../Models/Firm')
const Product = require('../Models/Product')


const addProduct = async (req,res)=>{

console.log('hello add product');

const {productName,bestSeller,category,description,price} = req.body

try {
  console.log('hello');
  

const firmId = req.params.firmId
const firm = await Firm.findById(firmId);
if(!firm){
    return res.status(404).json({message:"firm not found"})
}       
const newProduct = new Product({
    productName,bestSeller,category,description,price,firm:firm._id
    })  
const savedProduct = await newProduct.save()

firm.products.push(savedProduct)    
await firm.save()

 

res.status(200).json({message:"product added successfully",product:savedProduct}    )

} catch (error) {
res.json({message:error})
    
}


}

const getProductByFirmId = async (req,res)=>{

    const firmId = req.params.firmId    
    try {
      const firm = await Firm.findById(firmId)
      if(!firm){
        return res.status(404).json({message:"firm not found"})
      }
      const restaurantName = firm.firmName
        const products = await Product.find({firm:firmId})
        res.status(200).json({restaurantName,products})
    } catch (error) {
        res.status(500).json({message:error})
    }   
    }

    const deleteProductById = async (req,res)=>{
        const productId = req.params.productId
        try {
            const deletedProduct = await Product.findByIdAndDelete(productId)     
            if(!deletedProduct){
                return res.status(404).json({message:"product not found"})
            }       
            res.status(200).json({message:"product deleted successfully",product:deletedProduct})
        } catch (error) {
            res.status(500).json({message:error})
        }
    }


module.exports = {addProduct,getProductByFirmId,deleteProductById}