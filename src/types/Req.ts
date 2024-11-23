import { User } from "next-auth";
import { NextRequest } from "next/server";

export default interface Req extends NextRequest {
    data: { [key: string]: any },
    user?: User
}