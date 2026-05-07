import connectDB from "@/db/ConnectDB";
import Project from "@/models/Project";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();

        // Récupérer les paramètres de requête
        const { searchParams } = new URL(request.url);
        
        const projectId = searchParams.get("id");
        const instructor = searchParams.get("instructor");
        const isPublished = searchParams.get("isPublished");
        const status = searchParams.get("status"); // upcoming, active, past
        const search = searchParams.get("search");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const sortBy = searchParams.get("sortBy") || "createdAt";
        const sortOrder = searchParams.get("sortOrder") || "desc";

        // Construire le filtre
        let filter = {};

        // Si un ID spécifique est demandé
        if (projectId) {
            if (!mongoose.Types.ObjectId.isValid(projectId)) {
                return NextResponse.json(
                    { success: false, error: "ID de projet invalide" },
                    { status: 400 }
                );
            }

            const project = await Project.findById(projectId)
                .populate('instructor', 'firstName lastName email')
                .lean();

            if (!project) {
                return NextResponse.json(
                    { success: false, error: "Projet non trouvé" },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                success: true,
                project
            });
        }

        // Recherche par titre ou description
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        // Calculer le skip pour la pagination
        const skip = (page - 1) * limit;

        // Déterminer l'ordre de tri
        const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

        // Récupérer les projets
        const projects = await Project.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean();

        // Compter le nombre total de projets correspondants
        const totalProjects = await Project.countDocuments(filter);

        // Calculer les métadonnées de pagination
        const totalPages = Math.ceil(totalProjects / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        return NextResponse.json({
            success: true,
            projects,
            pagination: {
                currentPage: page,
                totalPages,
                totalProjects,
                limit,
                hasNextPage,
                hasPrevPage
            }
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
        return NextResponse.json(
            { 
                success: false, 
                error: "Erreur interne du serveur",
                details: error.message 
            },
            { status: 500 }
        );
    }
}