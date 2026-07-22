const validator = (req, res, next) => {

    // destruct the values from req body
    const { productName, description, price, stockQuantity } = req.body;

    // basic validation check for the values 
    if (!productName || !description || !price || !stockQuantity) {
        return res.status(401).json({
            success: false,
            message: "All fields are required"
        });
    }

    next();
}

export default validator;