// app/api/project/send/route.js
import { NextResponse } from "next/server";
import Project from "@/models/Project";
import connectDB from "@/db/ConnectDB";

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();
        console.log("Body reçu:", body) // 👈 pour déboguer

        const {
            title,
            description,
            instructor,
            startDate,
            dueDate,
            maxScore,
            attachments,
            resources,
            instructions,
            maxSubmissions,
            isPublished,
            isGroupProject
        } = body;

        // Validation
        if (!title || !description || !dueDate) {
            return NextResponse.json(
                { success: false, error: "title, description et dueDate sont requis" },
                { status: 400 }
            );
        }

        // Vérification des dates
        const start = startDate ? new Date(startDate) : new Date();
        const due = new Date(dueDate);

        if (due <= start) {
            return NextResponse.json(
                { success: false, error: "La date de fin doit être postérieure à la date de début" },
                { status: 400 }
            );
        }

        const newProject = await Project.create({
            title,
            description,
            instructor: instructor || null, // ✅ optionnel
            startDate: start,
            dueDate: due,
            maxScore: maxScore || 100,
            attachments: attachments || [],
            resources: resources || [],
            instructions: instructions || "",
            maxSubmissions: maxSubmissions || 1,
            isPublished: isPublished || false,
            isGroupProject: isGroupProject || false
        });

        return NextResponse.json(
            { success: true, message: "Projet créé avec succès", project: newProject },
            { status: 201 }
        );

    } catch (error) {
        console.error("Erreur création projet:", error);
        return NextResponse.json(
            { success: false, error: "Erreur serveur", details: error.message },
            { status: 500 }
        );
    }
}