import app from './expressApp';

export const startServer = async () => {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });

    process.on("uncaughtException", (e) => {
        console.log(e);
        process.exit(1);
    });
}

startServer().then(() => {
    console.log('Server started');
}) ;