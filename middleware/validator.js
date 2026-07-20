const validator = (req, res, next) => {

    const { productName, description, price, stockQuantity } = req.body;
    
    if (!productName || !description || !price || !stockQuantity) {
        return res.status(401).json({
            success: false,
            message: "All fields are required"
        });
    }
    next();
}

export default validator;