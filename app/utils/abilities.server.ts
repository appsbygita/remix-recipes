import db from "~/db.server";
import { requireLoggedInUser } from "./auth.server";
import { json } from "@remix-run/node";

export async function canChangeRecipe(request: Request, recipeId: string) {
  const user = await requireLoggedInUser(request);
  const recipe = await db.recipe.findUnique({ where: { id: recipeId } });

  if (recipe === null) {
    throw json({ message: "Recipe ID not found." }, { status: 404 });
  }
  if (recipe.userId !== user.id) {
    throw json(
      { message: "You are not authorized to make changes to this recipe." },
      { status: 401 }
    );
  }
}
