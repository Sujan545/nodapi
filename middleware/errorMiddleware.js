

const errorMiddleware = (err, req, res, next) => {
    console.log("this is error")
    res.json({ message: err.message, stack: process.env.NODE_ENV === "development" ? err.stack : null });
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({ message: err.message, stack: process.env.NODE_ENV == "development" ? err.stack : null })
}

export default errorMiddleware;