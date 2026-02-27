import pool from "../lib/db";

export async function joinWaitlist(firstName: string, lastName: string, email: string) {
    // Validate required fields
    if (!firstName || !lastName || !email) {
        throw new Error("First name, last name, and email are required.");
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Please provide a valid email address.");
    }

    try {
        // Insert into database
        await pool.query(
            "INSERT INTO waitlist (first_name, last_name, email) VALUES ($1, $2, $3)",
            [firstName.trim(), lastName.trim(), email.trim().toLowerCase()]
        );
        return { message: "Successfully joined the waitlist!" };
    } catch (error: unknown) {
        // Handle duplicate email (PostgreSQL unique violation code)
        if (
            error instanceof Error &&
            "code" in error &&
            (error as { code: string }).code === "23505"
        ) {
            throw new Error("duplicate");
        }
        console.error("Waitlist service error:", error);
        throw new Error("An unexpected error occurred. Please try again.");
    }
}
