const schemaValidationMiddleware = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(422).json({
                message: 'Validation failed',
                error: error.details.map((error) => error.message),
            });
        }
        next();
    };
};

export default schemaValidationMiddleware;
