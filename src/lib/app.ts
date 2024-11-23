import Req from "@/types/Req";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";

interface Validation {
    name: string,
    reg?: RegExp,
    minLength?: number,
    message?: string,
    isArray?: boolean
}

interface ValidationError {
    name: string,
    message: string
}



type CB = (req: Req, context: any) => Promise<{ [key: string]: any }>


const app = (cb: CB, isAuth = true, validations?: Validation[]) => async (req: Req, context: any) => {
    try {
        if (validations) {
            const data = await req.json();
            const errors: ValidationError[] = [];
            validations.forEach(({ name, reg, minLength, message, isArray }) => {
                const value = data[name];
                if (isArray) {
                    if ((!Array.isArray(value) || (minLength && value.length < minLength))) errors.push({ name, message: message || `${name} must be minimum ${minLength || 1} long` })

                }
                else {
                    const re = reg || new RegExp(`^.{${minLength},}$`);
                    if (!re.test(value)) errors.push({
                        name,
                        message: message || minLength ? `${name} must be minimum ${minLength} long` : `${name} is not valid!`
                    })
                }
            })
            if (errors.length > 0) return new Response(JSON.stringify({ message: 'Validation failed!', errors }), { status: 400 })
            req.data = data;
        }
        const session = await getServerSession(authOptions)
        if (session) req.user = session.user;
        else if (isAuth) {
            return new Response(JSON.stringify({ message: 'You are not authorized!' }), { status: 403 })
        }
        const { status, ...res } = await cb(req, context);
        return new Response(JSON.stringify(res), { status });
    }
    catch (err: any) {
        const status = +err.status || +err.statusCode || +err.code || +err.cause || 500;
        console.log(err)
        return new Response(JSON.stringify({
            ...err,
            message: (err.errors ? err.errors[0].message : err.message) || "internal server error",
        }), { status })
    }
}


export default app;