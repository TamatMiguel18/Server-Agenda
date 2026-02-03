const corsOptions = {
    origin: true,
    Credentials: true,

    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],

};
export {corsOptions};