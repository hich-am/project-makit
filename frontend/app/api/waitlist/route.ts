import { NextRequest, NextResponse } from "next/server";
import { joinWaitlist } from "../../../../backend/services/waitlist";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email } = body;

        const result = await joinWaitlist(firstName, lastName, email);

        return NextResponse.json(
            result,
            { status: 201 }
        );
    } catch (error: any) {
        if (error.message === "duplicate") {
            return NextResponse.json(
                { error: "duplicate" },
                { status: 409 }
            );
        }

        if (error.message === "First name, last name, and email are required." ||
            error.message === "Please provide a valid email address.") {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        console.error("Waitlist API error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred. Please try again." },
            { status: 500 }
        );
    }
}
