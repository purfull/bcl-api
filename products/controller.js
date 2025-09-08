const { Op, fn, col, where, literal} = require('sequelize');
const ProductModel = require('./model')
const fs = require('fs');
const path = require('path');


// const getAllProduct = async (req, res) => {
//     try {
//         const { name, category, status } = req.query;

//         const whereClause = {};

//         if (name) {
//                  whereClause[Op.and] = literal(`LOWER(JSON_UNQUOTE(name->'$.en')) LIKE '%${name.toLowerCase()}%'`);
//         }

//         if (category) {
//             whereClause.category = category;
//         }

//         if (status) {
//             whereClause.status = status;
//         }

//         const products = await ProductModel.findAll({ where: whereClause });

//         res.status(200).json({ success: true, data: products });
//     } catch (error) {
//         console.log("Error:", error);
//         res.status(500).json({ success: false, message: "Failed to retrieve products" });
//     }
// };


// const getProductById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const product = await ProductModel.findOne({ where: { id: id } });
//         res.status(200).json({success: true, data: product });
//     } catch (error) {
//         console.log("error", error);
//         res.status(500).json({success: false, message: "Failed to retrieve product" });
//     }
// }

// const createNewProduct = async (req, res) => {
//     const { name, description, price, offer_price, category, quantity_available, status } = req.body;

//     try {


//         const newproduct = await ProductModel.create({ name, description, price, offer_price, category, quantity_available, status })
//         res.json({success: true, message:  "product created successfully", data: newproduct})

//     } catch (error) {
//         console.log("error", error)
//         res.status(500).json({success: false, message: "failed to create product" });
//     }
// }

// const updateProduct = async (req, res) => {
//     const { name, description, price, offer_price, category, quantity_available, status } = req.body;
//     const { id } = req.params;

//     try {

//         const newproduct = await ProductModel.update(
//             { name, description, price, offer_price, category, quantity_available, status },
//             { where: { id : id } })
//         res.json({success: true, message:  "product updated successfully", data: newproduct})

//     } catch (error) {
//         console.log("error", error)
//         res.status(500).json({success: false, message: "failed to update product" });
//     }
// }
const getAllProduct = async (req, res) => {
  try {
    const { name, category, status } = req.query;
    const whereClause = {};

    if (name) {
      whereClause[Op.and] = literal(`LOWER(JSON_UNQUOTE(name->'$.en')) LIKE '%${name.toLowerCase()}%'`);
    }

    if (category) {
      whereClause.category = category;
    }

    if (status) {
      whereClause.status = status;
    }

    const products = await ProductModel.findAll({ where: whereClause });

    // Add URL prefix to image paths
    const baseUrl = 'https://api.purfull.com/uploads/';
    const updatedProducts = products.map(product => {
      const plain = product.get({ plain: true });

      return {
        ...plain,
        thumbnailImage: plain.thumbnailImage
          ? baseUrl + plain.thumbnailImage
          : null,
        galleryImage: Array.isArray(plain.galleryImage)
          ? plain.galleryImage.map(img => baseUrl + img)
          : []
      };
    });

    res.status(200).json({ success: true, data: updatedProducts });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ success: false, message: "Failed to retrieve products" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const plain = product.get({ plain: true });
    const baseUrl = 'https://api.purfull.com/uploads/';

    const updatedProduct = {
      ...plain,
      thumbnailImage: plain.thumbnailImage
        ? baseUrl + plain.thumbnailImage
        : null,
      galleryImage: Array.isArray(plain.galleryImage)
        ? plain.galleryImage.map(img => baseUrl + img)
        : []
    };

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Failed to retrieve product" });
  }
};


const createNewProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    offer_price,
    category,
    quantity_available,
    status
  } = req.body;

  try {
    const thumbnail = req.files?.thumbnailImage?.[0]?.filename || null;
    const gallery = req.files?.galleryImage?.map(file => file.filename) || [];

    const newProduct = await ProductModel.create({
      name,
      description,
      price,
      offer_price,
      category,
      quantity_available,
      status,
      thumbnailImage: thumbnail,
      galleryImage: gallery
    });

    res.json({
      success: true,
      message: "Product created successfully",
      data: newProduct
    });
  } catch (error) {
    console.error("create product error:", error);
    res.status(500).json({ success: false, message: "Failed to create product" });
  }
};


const updateProduct = async (req, res) => {
  const { name, description, price, offer_price, category, quantity_available, status } = req.body;
  const { id } = req.params;

  try {
    const product = await ProductModel.findByPk(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // 🧹 Delete old thumbnail image if new one is uploaded
    if (req.files?.thumbnailImage?.[0]) {
      if (product.thumbnailImage) {
        const oldPath = path.join(__dirname, '../uploads', product.thumbnailImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    // 🧹 Delete old gallery images if new ones are uploaded
    if (req.files?.galleryImage) {
      if (Array.isArray(product.galleryImage)) {
        product.galleryImage.forEach(img => {
          const imgPath = path.join(__dirname, '../uploads', img);
          if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        });
      }
    }

    // 📦 Build update object
    const updateData = {
      name,
      description,
      price,
      offer_price,
      category,
      quantity_available,
      status,
    };

    if (req.files?.thumbnailImage?.[0]) {
      updateData.thumbnailImage = req.files.thumbnailImage[0].filename;
    }

    if (req.files?.galleryImage) {
      updateData.galleryImage = req.files.galleryImage.map(file => file.filename);
    }

    await ProductModel.update(updateData, { where: { id } });

    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ success: false, message: "Failed to update product" });
  }
};




module.exports = {
    getAllProduct,
    getProductById,
    createNewProduct,
    updateProduct
};

