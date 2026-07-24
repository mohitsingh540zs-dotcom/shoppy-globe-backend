export const productValidator = (req, res, next) => {

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

export const authvalidator = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    next();
}