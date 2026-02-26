import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email } = body;

        // Validate required fields
        if (!firstName || !lastName || !email) {
            return NextResponse.json(
                { error: "First name, last name, and email are required." },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        // Insert into database
        await pool.query(
            "INSERT INTO waitlist (first_name, last_name, email) VALUES ($1, $2, $3)",
            [firstName.trim(), lastName.trim(), email.trim().toLowerCase()]
        );

        return NextResponse.json(
            { message: "Successfully joined the waitlist!" },
            { status: 201 }
        );
    } catch (error: unknown) {
        // Handle duplicate email (PostgreSQL unique violation code)
        if (
            error instanceof Error &&
            "code" in error &&
            (error as { code: string }).code === "23505"
        ) {
            return NextResponse.json(
                { error: "duplicate" },
                { status: 409 }
            );
        }

        console.error("Waitlist API error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred. Please try again." },
            { status: 500 }
        );
    }
}
