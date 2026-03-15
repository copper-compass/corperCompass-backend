import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: "Too many attempts, try again after 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
})

export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: "Too many attempts, try again after 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
})